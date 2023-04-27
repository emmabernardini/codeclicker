const { open, writeFile, appendFile } = require("fs/promises");
const path = require("path");
const APIError = require("./APIerror");

const errorHandler = {
  // 4 parameters === Error handler for Express
  // If an error occurs, it end up here
  manage(err, req, res, _) {
    console.log(err);
    errorHandler.logError(err, req.url);
    if (err.code) {
      res.status(err.code).json(err.message);
    } else {
      res.status(500).json(err.message);
    }
  },

  // Error creation with our custom class
  throw(err, code) {
    throw new APIError(err, code);
  },

  _400() {
    throw new APIError("Informations invalides", 400);
  },

  // Depending on error.code, chooses 404 ou 500 as status
  _404() {
    throw new APIError("Page non trouvée", 404);
  },

  _500() {
    throw new APIError("Une erreur est survenue", 500);
  },

  // And log the error in a CSV file.
  async logError(err, url) {
    const separator = ";";
    const filePath = getFilePath();
    let file;
    try {
      file = await open(filePath);
    } catch (errorOpen) {
      const columnsString =
        "Date" +
        separator +
        "Url" +
        separator +
        "Message" +
        separator +
        "Stacktrace\n";
      await writeFile(filePath, columnsString);
    }

    try {
      const stackFormated = err.stack.replaceAll("\n", "");
      const line =
        new Date() +
        separator +
        url +
        separator +
        err.message +
        separator +
        stackFormated +
        "\n";
      await appendFile(filePath, line);
    } catch (errorWrite) {
      console.log(errorWrite);
    }

    if (file) {
      await file.close();
    }
  },
};

module.exports = errorHandler;

// Outside function to have the name and path of the log file to create or find
function getFilePath() {
  const logsPath = path.resolve(__dirname, "../../../logs");
  const today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  const fileName = today.getFullYear() + "-" + month + "-" + day + ".log";

  return logsPath + "/" + fileName;
}
