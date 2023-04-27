const client = require("../service/database");
const errorHandler = require("../service/error/errorHandler");
const debug = require("debug")("model-upgrades");

const model = {
  async getAll() {
    try {
      const result = await client.query("SELECT * FROM upgrade");
      return result.rows;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
};

module.exports = model;
