const playerModel = require("../models/accountPlayer");
const saveModel = require("../models/savePlayer");
const auth = require("../service/auth");
const bcrypt = require("bcrypt");
const helper = require("../service/helper");
const passgen = require("generate-password");
const mailer = require("../service/mail");

const playerController = {
  async register(req, res) {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isEmailValid = regexEmail.test(req.body.email);

    const isUsable = await playerModel.isEmailAndUsernameOk(
      req.body.email,
      req.body.username
    );
    if (
      !isUsable ||
      req.body.password !== req.body.confirmPassword ||
      !isEmailValid
    ) {
      res.status(400).json({
        isCreated: false,
        message: "Erreur lors du remplissage du formulaire",
      });
      return;
    }
    // Hash the player's password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    // If the front doesn't sent the good format
    req.body.exp ? req.body.exp : (req.body.exp = 0);
    req.body.click_counter
      ? req.body.click_counter
      : (req.body.click_counter = 0);

    // Create new player
    const player = await playerModel.create(req.body);
    // Generate JWT token and store in player
    player.token = auth.generateToken(player.id);

    // We don't need the player.id
    delete player.id;
    player.player_has_upgrade = [];
    res.json(player);
  },

  //-------------------------------------------------------------------

  async updateCredentials(req, res) {
    //controller charged with updating the username, mail or password conditionnaly. If a pseudo is received then the pseudo will be updated, same thing for the password or mail
    const newUsername = req.body.newUsername;

    const newMail = req.body.newMail;

    const confirmPassword = req.body.confirmPassword;

    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;
    // If there is a newUsername in req.body we update the username in db
    if (newUsername.length) {
      // Verify if the username is not taken
      const isUsernameTaken = await playerModel.getByIdentity(newUsername);
      if (!!isUsernameTaken) {
        res.status(400).json({ message: "Ce pseudo est déjà utilisé" });
        return;
      } else {
        await playerModel.updateUsername(newUsername, req.player.id);
      }
    }

    // If there is a newMail in req.body we update the mail in db
    if (newMail.length && confirmPassword.length) {
      // This verification may be redundant depending on front
      const regexEmail =
        /^[a-zA-Z1-9]+([.][a-zA-Z1-9]+)?@[a-zA-Z1-9]+([.][a-zA-Z1-9]+)?.[a-z]{2,4}$/;

      const isEmailTaken = await playerModel.getByIdentity(newMail);
      if (!!isEmailTaken) {
        res.status(400).json({ message: "Ce mail est déjà utilisé" });
        return;
      }

      const isPasswordOk = await playerModel.comparePasswordByID(
        req.player.id,
        confirmPassword
      );
      if (!!isPasswordOk) {
        if (regexEmail.test(newMail)) {
          await playerModel.updateMail(newMail, req.player.id);
        } else {
          res.status(400).json({
            message: "Email invalide",
          });
          return;
        }
      } else {
        res.status(400).json({
          message: "Mot de passe invalide",
        });
        return;
      }
    }

    // If there is a newPassword in req.body we update the password in db
    if (
      confirmPassword.length &&
      newPassword.length &&
      confirmNewPassword.length
    ) {
      const isOldPasswordOk = await playerModel.comparePasswordByID(
        req.player.id,
        confirmPassword
      );

      // comparePassword needs an identity which can be the mail or username of a player, here we use the mail obtained in getById above, it returns null if the passwords don't match.
      if (!!isOldPasswordOk) {
        if (confirmNewPassword === newPassword) {
          const encryptedPassword = bcrypt.hashSync(newPassword, 10);
          await playerModel.updatePassword(encryptedPassword, req.player.id);
        }
      } else {
        res.status(400).json({
          message: "Mot de passe invalide",
        });
        return;
      }
    }
    res.json(await playerModel.getById(req.player.id));
  },

  async lostPassword(req, res) {
    //get user mail
    const email = req.body.email;
    const player = await playerModel.getByIdentity(email);
    if (!player) {
      res.status(400).json({ message: "Ce mail n'existe pas" });
      return;
    }
    //make a new password
    const password = passgen.generate({
      length: 12,
      numbers: true,
    });
    const encryptedPassword = bcrypt.hashSync(password, 10);
    //Update Password
    await playerModel.updatePassword(encryptedPassword, player.id);

    res.status(200).json({ valid: "Password changed and email sent" });

    //Manage mail to send
    mailer.sendNewPassword(email, password);
  },

  //-------------------------------------------------------------------

  async remove(req, res) {
    // Delete player by id
    const isDeleted = await playerModel.deleteById(req.player.id);
    if (!isDeleted) {
      res.status(400).json({ message: "No player found" });
    } else {
      res.json({ message: "player deleted" });
    }
  },

  //-------------------------------------------------------------------

  async get(req, res) {
    // Get the player by id
    const player = await playerModel.getById(req.player.id);

    // Check if player exists
    if (!player) {
      return res.status(404).json({ message: "player not found" });
    }

    // Gestion du temps
    const expSinceLastSave = helper.calculatePassiveExpSinceNextSave(player);
    if (expSinceLastSave) {
      player.expSinceLastSave = expSinceLastSave;
      player.exp = Number(player.exp) + Number(player.expSinceLastSave);
      await playerModel.saveNewExP(player.exp, player.id);
    }

    const upgradesPossessed = await playerModel.getUpgradesByPlayerId(
      req.player.id
    );

    player.player_has_upgrade = upgradesPossessed;

    if (player.player_has_upgrade) {
      player.player_has_upgrade.forEach((upg) => {
        upg.next_cost = helper.calculateNextCost(upg);
      });
    }

    // Send player as a response
    res.json(player);
  },

  //-------------------------------------------------------------------

  async login(req, res) {
    // Compare password and return player

    const player = await playerModel.comparePassword(
      req.body.identity,
      req.body.password
    );

    // Check if player exists
    if (!player) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token and store it in player
    player.token = auth.generateToken(player.id);
    delete player.password;

    const expSinceLastSave = helper.calculatePassiveExpSinceNextSave(player);
    if (expSinceLastSave) {
      player.expSinceLastSave = expSinceLastSave;
      player.exp = Number(player.exp) + Number(player.expSinceLastSave);
      await playerModel.saveNewExP(player.exp, player.id);
    }

    const upgradesPossessed = await playerModel.getUpgradesByPlayerId(
      player.id
    );
    player.player_has_upgrade = upgradesPossessed;

    player.player_has_upgrade.forEach((upg) => {
      upg.next_cost = helper.calculateNextCost(upg);
    });

    res.json(player);
  },

  //-------------------------------------------------------------------

  async logout(req, res) {
    await saveModel.simpleUpdate(req.player.id, req.body);
    res.json({ isDisconnected: true });
  },
};

module.exports = playerController;
