const challengeModel = require("../models/challenge");
const helper = require("../service/helper");

const challengeController = {
  async getChallenge(req, res) {
    const lastChallengeID = await challengeModel.getLastChallengeId(
      req.player.id
    );

    let nextChallengeId = 1;
    if (lastChallengeID.length) {
      if (lastChallengeID[0].last_challenge_id >= 8) {
        res.status(404).json({ message: "No other challenges!" });
        return;
      }

      nextChallengeId = Number(lastChallengeID[0].last_challenge_id) + 1;
    }
    const challenge = await challengeModel.getChallengeByID(nextChallengeId);
    const formatedChallenge = helper.formatChallenge(challenge);

    res.status(200).json(formatedChallenge);
  },

  async storeSuccessOfChallenge(req, res) {
    if (!req.body.last_challenge_id) {
      req.body.last_challenge_id = 0;
    }

    const isSaved = await challengeModel.storeSuccessOfChallenge(
      req.player.id,
      req.body
    );
    if (!isSaved) {
      res.status(500).json({ isSaved: false });
    } else {
      res.status(200).json({ isSaved: true });
    }
  },
};

module.exports = challengeController;
