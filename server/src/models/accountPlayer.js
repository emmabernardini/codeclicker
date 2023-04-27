const client = require("../service/database");
const errorHandler = require("../service/error/errorHandler");
const debug = require("debug")("model-player");
const bcrypt = require("bcrypt");

const model = {
  async isEmailAndUsernameOk(email, username) {
    try {
      // Insert the player into the database
      const result = await client.query(
        "SELECT * FROM player WHERE email = $1 OR username = $2",
        [email, username]
      );

      // Return the player's ID
      return !result.rowCount;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  async create(player) {
    try {
      // Insert the player into the database
      const result = await client.query(
        "INSERT INTO player (username, email, password, exp, click_counter) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, exp, click_value, passive_value, click_counter, last_challenge_id, updated_at",
        [
          player.username,
          player.email,
          player.password,
          player.exp,
          player.click_counter,
        ]
      );

      // Return the player's ID
      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async updateUsername(newUsername, id) {
    try {
      // Update the player with a new username
      await client.query(
        "UPDATE player SET username = $1, updated_at = now() WHERE id = $2",
        [newUsername, id]
      );
      return;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async updateMail(newMail, id) {
    try {
      // Update the player with a new mail
      await client.query(
        "UPDATE player SET email = $1, updated_at = now() WHERE id = $2",
        [newMail, id]
      );
      return;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async updatePassword(newPassword, id) {
    try {
      // Update the player with a new password
      await client.query(
        "UPDATE player SET password = $1, updated_at = now() WHERE id = $2",
        [newPassword, id]
      );
      return;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async getById(id) {
    try {
      const result = await client.query(
        `SELECT id, username, email, exp, click_value, passive_value, click_counter, last_challenge_id, updated_at FROM "player" WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async getUpgradesByPlayerId(id) {
    try {
      const result = await client.query(
        `SELECT player_has_upgrade.player_id, player_has_upgrade.upgrade_id, player_has_upgrade.level, base_cost, flat_bonus, is_active FROM "player_has_upgrade" JOIN upgrade ON upgrade.id = player_has_upgrade.upgrade_id WHERE player_id = $1`,
        [id]
      );
      return result.rows;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async getByIdentity(identity) {
    try {
      const result = await client.query(
        'SELECT id, username, password, email, exp, click_value, passive_value, click_counter, last_challenge_id, updated_at FROM "player" WHERE email = $1 OR username = $1',
        [identity]
      );

      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async comparePassword(identity, password) {
    try {
      const player = await model.getByIdentity(identity);

      // Check if player exists
      if (!player) {
        return null;
      }
      // Compare password
      const isMatch = await bcrypt.compare(password, player.password);

      // Return player if password match
      return isMatch ? player : null;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async comparePasswordByID(id, password) {
    try {
      const player = await model.getPasswordById(id);
      // Check if player exists
      if (!player) {
        return null;
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, player.password);

      // Return player if password match
      return isMatch ? player : null;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async getPasswordById(id) {
    try {
      const result = await client.query(
        `SELECT password FROM "player" WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  //-------------------------------------------------------------------

  async deleteById(playerId) {
    try {
      const result = await client.query('DELETE FROM "player" WHERE id = $1', [
        playerId,
      ]);
      return !!result.rowCount;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  async saveNewExP(exp, id) {
    try {
      // Update the save with new XP if generate while away
      await client.query(
        "UPDATE player SET exp = $1, updated_at = now() WHERE id = $2",
        [exp, id]
      );
      return;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
};

module.exports = model;
