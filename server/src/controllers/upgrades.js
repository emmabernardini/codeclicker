const upgradesModel = require("../models/upgrades");

const upgradesController = {
  async getAll(req, res) {
    // Get all the upgrades for the front shop
    const upgrades = await upgradesModel.getAll();
    res.json(upgrades);
  },
};

module.exports = upgradesController;
