const client = require("../service/database");
const errorHandler = require("../service/error/errorHandler");
const debug = require("debug")("model-save");

const model = {
  async simpleUpdate(id, obj) {
    try {
      // Insert the save into the database
      const result = await client.query(
        "UPDATE player SET exp = $1, click_counter = $2, updated_at = now() WHERE id = $3",
        [obj.exp, obj.click_counter, id]
      );
      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async completeUpdate(id, obj) {
    try {
      // Insert the save into the database
      const result = await client.query(
        "UPDATE player SET exp = $1, click_value = $2, passive_value = $3, click_counter = $4, updated_at = now() WHERE id = $5",
        [obj.exp, obj.click_value, obj.passive_value, obj.click_counter, id]
      );
      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async reset(id) {
    try {
      // Insert the save into the database
      const result = await client.query(
        "UPDATE player SET exp = 0, click_value = 1, passive_value = 0, click_counter = 0, last_challenge_id = NULL WHERE id = $1 RETURNING id, username, email, exp, click_value, passive_value, click_counter, last_challenge_id, updated_at",
        [id]
      );

      await client.query(
        "DELETE FROM player_has_upgrade WHERE player_id = $1",
        [id]
      );

      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async createUpgradeInSave(playerId, upgradeId) {
    try {
      await client.query(
        "INSERT INTO player_has_upgrade (player_id, upgrade_id) VALUES ($1, $2);",
        [playerId, upgradeId]
      );

      const result = await client.query(
        "SELECT upgrade_id AS id, level, base_cost, flat_bonus, is_active FROM player_has_upgrade JOIN upgrade ON upgrade.id = player_has_upgrade.upgrade_id WHERE player_id = $1 AND upgrade_id = $2;",
        [playerId, upgradeId]
      );

      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async updateUpgradeInSave(level, playerId, upgradeId) {
    try {
      await client.query(
        "UPDATE player_has_upgrade SET level = $1, updated_at = now() WHERE player_id = $2 AND upgrade_id = $3;",
        [level, playerId, upgradeId]
      );

      return;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
};

module.exports = model;
