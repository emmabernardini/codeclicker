const client = require("../service/database");
const errorHandler = require("../service/error/errorHandler");
const debug = require("debug")("model-challenge");

const model = {
  async getLastChallengeId(id) {
    try {
      const result = await client.query(
        `SELECT last_challenge_id FROM player WHERE id = $1`,
        [id]
      );
      return result.rows;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
  async getChallengeByID(id) {
    try {
      const result = await client.query(
        `SELECT challenge.*, ARRAY_AGG(DISTINCT keyword.label) AS keyword,
        ARRAY(SELECT jsonb_build_object('value', output.value, 'type', outputtype.label, 'input',
          ARRAY_AGG(jsonb_build_object('value', input.value, 'type', inputtype.label) ORDER BY input.ordonned ASC)) FROM output
        JOIN type AS outputtype ON outputtype.id = output.type_id
        JOIN input ON input.output_id = output.id
        JOIN type AS inputtype ON inputtype.id = input.type_id
        WHERE challenge_id = $1 GROUP BY output.value, outputtype.label, output.id) AS test
        FROM challenge
        JOIN challenge_has_keyword ON challenge.id = challenge_has_keyword.challenge_id
        JOIN keyword ON keyword.id = challenge_has_keyword.keyword_id
        WHERE challenge.id = $1 GROUP BY challenge.id;`,
        [id]
      );
      // constitution challenge global

      // SELECT challenge.*, ARRAY_AGG(DISTINCT keyword.label) AS keyword FROM challenge
      // JOIN challenge_has_keyword ON challenge.id = challenge_has_keyword.challenge_id
      // JOIN keyword ON keyword.id = challenge_has_keyword.keyword_id
      // WHERE challenge.id = 3 GROUP BY challenge.id;

      // constitution du tableau output : (on group by output id pour ne pas trop grouper et avoir la possibilité d'avoir deux output avec le même contenu mais pas commun sur la requête)

      // SELECT output.value AS output, outputtype.label AS type,
      // 	  ARRAY_AGG(jsonb_build_object('value', input.value, 'type', inputtype.label)) AS input FROM output
      // JOIN type AS outputtype ON outputtype.id = output.type_id
      // JOIN input ON input.output_id = output.id
      // JOIN type AS inputtype ON inputtype.id = input.type_id
      // WHERE challenge_id = 3 GROUP BY output.value, outputtype.label, output.id

      return result.rows[0];
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
  async storeSuccessOfChallenge(id, playerObject) {
    try {
      const result = await client.query(
        `UPDATE player SET exp = $1, last_challenge_id = $2, click_counter = $3, updated_at = now() WHERE id = $4 RETURNING id`,
        [
          playerObject.exp,
          Number(playerObject.last_challenge_id) + 1,
          playerObject.click_counter,
          id,
        ]
      );
      return result.rowCount;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
};

module.exports = model;
