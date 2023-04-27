const helper = {
  cost_factor: 1.1,
  /**
   * If an upgrade is bought, calculate the price for the next buy of this same upgrade
   * @param {object} upgrade
   * @returns {number} next_cost
   */
  calculateNextCost(upgrade) {
    const next_cost = Math.floor(
      upgrade.base_cost * Math.pow(helper.cost_factor, upgrade.level)
    );
    return next_cost;
  },

  /**
   * Add the new upgrade in the playerObject
   * @param {object} obj === req.body
   * @param {object} upgrade === from db after adding the record of the new opgrade
   * @returns {object} obj === req.body
   */
  addNewUpgrade(obj, upgrade) {
    if (!obj.exp >= upgrade.base_cost) {
      return undefined;
    }
    obj.exp = obj.exp - upgrade.base_cost;

    if (upgrade.is_active) {
      obj.click_value = Number(obj.click_value) + Number(upgrade.flat_bonus);
    } else {
      obj.passive_value =
        Number(obj.passive_value) + Number(upgrade.flat_bonus);
    }

    upgrade.next_cost = helper.calculateNextCost(upgrade);

    if (!obj.player_has_upgrade) {
      obj.player_has_upgrade = [];
    }
    obj.player_has_upgrade.push(upgrade);
    return obj;
  },

  /**
   * Finds the updated upgrade, upgrade its level and modify every value
   * @param {object} obj === req.body
   * @param {number} upgradeId
   * @returns {object} - {updatedInfo, updatedLevel,}
   */
  updateUpgrade(obj, upgradeId) {
    const index = obj.player_has_upgrade.findIndex(
      (upg) => Number(upg.id) === Number(upgradeId)
    );
    if (index === -1) {
      return undefined;
    }

    obj.player_has_upgrade[index].next_cost = helper.calculateNextCost(
      obj.player_has_upgrade[index]
    );

    if (!obj.exp >= obj.player_has_upgrade[index].next_cost) {
      return undefined;
    }
    obj.exp = obj.exp - obj.player_has_upgrade[index].next_cost;

    if (obj.player_has_upgrade[index].is_active) {
      obj.click_value =
        Number(obj.click_value) +
        Number(obj.player_has_upgrade[index].flat_bonus);
    } else {
      obj.passive_value =
        Number(obj.passive_value) +
        Number(obj.player_has_upgrade[index].flat_bonus);
    }
    obj.player_has_upgrade[index].level++;
    obj.player_has_upgrade[index].next_cost = helper.calculateNextCost(
      obj.player_has_upgrade[index]
    );

    return {
      updatedInfo: obj,
      updatedLevel: obj.player_has_upgrade[index].level,
    };
  },

  calculatePassiveExpSinceNextSave(playerObject) {
    const timeSinceLastSave = Math.floor(
      new Date() / 1000 - playerObject.updated_at / 1000
    );
    if (timeSinceLastSave > 75) {
      const expSinceLastSave =
        Number(timeSinceLastSave) * Number(playerObject.passive_value);
      return expSinceLastSave;
    }
    return null;
  },

  formatChallenge(challengeObject) {
    challengeObject.test.forEach((test) => {
      test.output = helper.handleTypeOfValue(test);
      delete test.type;
      delete test.value;
      test.input.forEach((ipt, index, arr) => {
        const newInput = helper.handleTypeOfValue(ipt);
        arr[index] = newInput;
      });
    });
    return challengeObject;
  },

  handleTypeOfValue(obj) {
    if (obj.type === "number") {
      return Number(obj.value);
    } else if (obj.type === "array") {
      if (obj.value === "[]") {
        return [];
      } else {
        const newArray = obj.value.slice(1, -1).split(",");
        newArray.forEach((value, index, arr) => {
          if (!isNaN(value)) {
            arr[index] = Number(value);
          }
        });
        return newArray;
      }
    } else if (obj.type === "boolean") {
      if (obj.value == "true") {
        return true;
      } else {
        return false;
      }
    } else if (obj.type === "object") {
      return JSON.parse(obj.value);
    } else {
      return obj.value;
    }
  },
};

module.exports = helper;
