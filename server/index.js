require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const router = require("../server/src/routes/router");
const errorHandler = require("./src/service/error/errorHandler");
const expressJSDocSwagger = require("express-jsdoc-swagger"); // Mise en place doc api
const cors = require("cors");

const options = {
  info: {
    version: "1.0.0",
    title: "codeClicker documentation",
    description: "Documentation of codeClicker's backend and its routes",
  },
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
  baseDir: __dirname,
  filesPattern: [
    "./src/routes/*.js",
    "./src/service/error/*.js",
    "./src/models/*.js",
  ],
  swaggerUIPath: "/api-docs",
  exposeApiDocs: true,
  apiDocsPath: "/api/docs",
};

const app = express();
app.use(express.json());

const whitelist = ["https://www.codeclicker.dev", "https://codeclicker.dev"];
app.use(
  cors({
    /*
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    */
  })
);

expressJSDocSwagger(app)(options);
app.get("/api/v0", (req, res) =>
  res.json({
    success: true,
  })
);

app.use("/", router);

app.use(errorHandler.manage);

/* 
https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/codeclicker.dev/privkey.pem"),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/codeclicker.dev/fullchain.pem"
      ),
    },
    app
  )
  .listen(process.env.PORT);
*/

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on ${process.env.HOST}:${process.env.PORT}`);
});
