const express = require("express");
const accountPlayerController = require("../controllers/accountPlayer");
const savePlayerController = require("../controllers/savePlayer");
const upgradesController = require("../controllers/upgrades");
const challengeController = require("../controllers/challenge");
const validationModule = require("../service/validation/validationModule");
const auth = require("../service/auth");

const router = express.Router();

/**
 * A playerObject type
 * @typedef {object} playerObject
 * @property {string} username.required - username
 * @property {string} email.required - email adress
 * @property {number} click_counter.required - click_counter
 * @property {number} click_value.required - click_value
 * @property {number} passive_value.required - passive_value
 * @property {string} updated_at.required - updated_at (timestamptz type)
 * @property {number} last_challenge_id.required - last_challenge_id
 * @property {array<upgradeToSaveObject>} player_has_upgrade - player_has_upgrade
 */

/**
 * A upgradeToPopulateObject type
 * @typedef {object} upgradeToPopulateObject
 * @property {number} upgrade_id.required - upgrade_id
 * @property {string} label.required - label
 * @property {number} base_cost.required - base_cost
 * @property {number} flat_bonus.required - flat_bonus
 * @property {boolean} is_active.required - is_active
 */

/**
 * A upgradeToSaveObject type
 * @typedef {object} upgradeToSaveObject
 * @property {number} upgrade_id.required - upgrade_id
 * @property {number} level.required - level
 * @property {number} base_cost.required - base_cost
 * @property {number} flat_bonus.required - flat_bonus
 * @property {boolean} is_active.required - is_active
 * @property {number} next_cost.required - next_cost
 */

/**
 * A challengeObject type
 * @typedef {object} challengeObject
 * @property {number} id.required - id
 * @property {string} title.required - title
 * @property {string} description.required - description
 * @property {string} instruction.required - instruction
 * @property {string} precode.required - precode
 * @property {array<string>} keyword - keyword
 * @property {array<testObject>} test.required - test
 */

/**
 * A testObject type
 * @typedef {object} testObject
 * @property {string} output.required - output
 * @property {array<string>} input.required - input
 */

/**
 * GET /player
 * @summary Returns a player save object to populate the front and have every stats.
 * @tags Account
 * @returns {playerObject} 200 - playerObject - application/json
 */
/**
 * POST /player
 * @summary Register a new user in database, create playerObject, and sends it.
 * @tags Account
 * @param {string} email.required - in a form in front, sent in JSON in back
 * @param {string} password.required - in a form in front, sent in JSON in back
 * @returns {playerObject} 200 - playerObject - application/json
 */
/**
 * DELETE /player
 * @summary Delete a player account from DB and everything from its save. Secured route
 * @tags Account
 * @returns {message} 200 - {isDelete: true} - application/json
 */
/**
 * PATCH /player
 * @summary Updates a player account from DB with new username mail or password. Secured route
 * @tags Account
 * @returns {message} 200 - playerObject - application/json
 */
router
  .route("/player")
  .post(validationModule.validateRegister, accountPlayerController.register) // Création compte
  .delete(auth.verifyToken, accountPlayerController.remove) // Suppression compte
  .get(auth.verifyToken, accountPlayerController.get) // Obtention infos du joueur
  .patch(auth.verifyToken, accountPlayerController.updateCredentials); // Changement du mail/password/pseudo

/**
 * POST /login
 * @summary Log the user (create its token) and sends its playerObject
 * @tags Account
 * @param {string} email.required - in a form in front, sent in JSON in back
 * @param {string} password.required - in a form in front, sent in JSON in back
 * @returns {playerObject} 200 - playerObject - application/json
 */
/**
 * POST /logout
 * @summary Save the current user state, and disconnect it by deleting the token.
 * @tags Account
 * @params {playerId} available in token
 * @returns {boolean} 200 - isDisconnected - application/json
 */
router.post(
  "/login",
  validationModule.validateLogin,
  accountPlayerController.login
); // Connection
router.post(
  "/logout",
  auth.verifyToken,
  validationModule.validateSimpleSave,
  accountPlayerController.logout
); // Déco

/**
 * PATCH /save
 * @summary Save the user with its playerObjets every minute or on demand.
 * @tags Save
 * @param {playerObject} playerObject.required - sent in JSON in back
 * @returns {playerObject} 200 - application/json
 */
router.patch(
  "/save",
  auth.verifyToken,
  validationModule.validateSimpleSave,
  savePlayerController.simpleUpdate
);

/**
 * POST /reset
 * @summary Reset every save info of a player account, and sends back a blank playerObject.
 * @tags Save
 * @params {playerId} available in token
 * @returns {playerObject} 200 - application/json
 */
router.patch("/reset", auth.verifyToken, savePlayerController.resetSave);

/**
 * POST /save/upgrade/:upgradeId
 * @summary Create in DB the record of player_has_upgrades and update every info, then sends it to the front.
 * @tags Save
 * @param {number} upgradeId.required - sent in JSON in back
 * @param {playerObject} playerObject.required - sent in JSON in back
 * @returns {playerObject} 200 - application/json
 */
/**
 * PATCH /save/upgrade/:upgradeId
 * @summary Update in DB the record of player_has_upgrades and update every info, then sends it to the front.
 * @tags Save
 * @param {number} upgradeId.required - sent in JSON in back
 * @param {playerObject} playerObject.required - sent in JSON in back
 * @returns {playerObject} 200 - application/json
 */
router
  .route("/save/upgrade/:upgradeId")
  .post(
    auth.verifyToken,
    validationModule.validateFirstBuy,
    savePlayerController.createUpgradeInSave
  ) // Crée une ligne dans player_has_upgrade
  .patch(
    auth.verifyToken,
    validationModule.validateNextBuy,
    savePlayerController.updateUpgradeInSave
  ); // Update une ligne

/**
 * GET /upgrades
 * @summary Get every upgrades from the database to populate the shop in front.
 * @tags Upgrades
 * @returns {array<upgradeToPopulateObject>} 200 - application/json
 */
router.get("/upgrades", upgradesController.getAll);

/**
 * POST /token
 * @summary Verify the token once.
 * @tags Token
 * @returns {boolean} 200 - boolean
 */
router.post("/token", auth.verifyTokenBoolean);

/**
 * GET /challenge
 * @summary Sends the good challenge to the front (the one next to last_challenge_id)
 * @tags Challenge
 * @returns {challengeObject} 200 - application/json
 */

/**
 * PATCH /challenge
 * @summary Store the success of the last challenge in database
 * @param {playerObject} playerObject.required - sent in JSON in back
 * @tags Challenge
 * @returns {boolean} 200 - boolean
 */
// Needs exp, last_challenge_id, click_counter
router
  .route("/challenge")
  .get(auth.verifyToken, challengeController.getChallenge)
  .patch(auth.verifyToken, challengeController.storeSuccessOfChallenge);

/**
 * PATCH /lostPassword
 * @summary Generates a new password for the account associated with the received email and stores it, also sends an email to the user containing the new password
 * @param {string} email.required - in a form in front, sent in JSON in back
 * @tags Account
 * @returns {message} 200 - application/json
 */

router
  .route("/lostPassword")
  .patch(
    validationModule.validateForgotPassword,
    accountPlayerController.lostPassword
  );

module.exports = router;
