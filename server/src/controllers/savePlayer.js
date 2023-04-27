const saveModel = require("../models/savePlayer");
const helper = require("../service/helper");

const savePlayerController = {
  //-------------------------------------------------------------------

  async simpleUpdate(req, res) {
    // Update the save
    await saveModel.simpleUpdate(req.player.id, req.body);
    res.status(200).json({ message: "Save updated" });
  },

  //-------------------------------------------------------------------

  async resetSave(req, res) {
    // Reset the save
    const player = await saveModel.reset(req.player.id);
    player.player_has_upgrade = [];
    delete player.id;
    res.status(200).json(player);
  },

  //-------------------------------------------------------------------

  async createUpgradeInSave(req, res) {
    // Create an record in DB for the new upgrade
    const upgrade = await saveModel.createUpgradeInSave(
      req.player.id,
      req.params.upgradeId
    );
    req.body = helper.addNewUpgrade(req.body, upgrade);

    if (req.body === undefined) {
      // Si le client n'a pas assez d'argent
      res.status(400).json({ isSaved: false, message: "Not enough money" });
      return;
    }
    await saveModel.completeUpdate(req.player.id, req.body);
    res.status(200).json(req.body);
  },

  //-------------------------------------------------------------------

  async updateUpgradeInSave(req, res) {
    // Update the record in DB for the upgrade bought
    const updated = helper.updateUpgrade(req.body, req.params.upgradeId);
    // updated === { updatedInfo, updatedLevel}

    if (updated === undefined) {
      // Si le client n'a pas assez d'argent ou autre souci
      res.status(500).json({ isSaved: false, message: "Issue on update" });
      return;
    }

    await saveModel.updateUpgradeInSave(
      updated.updatedLevel,
      req.player.id,
      req.params.upgradeId
    );

    await saveModel.completeUpdate(req.player.id, updated.updatedInfo);
    res.status(200).json(updated.updatedInfo);
  },
};

module.exports = savePlayerController;
