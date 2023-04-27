const initialSetUp = {
  clickLogo() {
    utils.gif.addEventListener("click", (e) => {
      utils.clickAnimation(e);
      utils.scoreIteration();
      effect.playEffect(effect.audioElement.clickOnGif);

      utils.handleChallengeGain();

      for (let i = 0; i < click.upgrades.length; i++) {
        if (click.upgrades[i].unlock == true) {
          buy.handleIsAffordable(click.upgrades[i], i);
        }
      }
      if (mq.mobileQuery.matches) {
        fastBuy.displayPossibleBuyButton();
      }
    });
  },

  makeUpgradeInDom(upgradeObject) {
    const mainShopLanguageContainer = document.getElementById("languages");

    const mainShopTeamworkContainer = document.getElementById("teamworks");

    const newUpgrade = `
      <div class="main__shop--language-container" upgrade data-upgrade-id="${
        upgradeObject.id
      }" data-is-active="${upgradeObject.is_active}">
        <div class="main__shop--logo-container">
          <img class="main__shop--language-logo" src="img/${
            upgradeObject.img_name
          }" alt="${upgradeObject.label}-logo" draggable="false">
        </div>
        <div class="main__shop--language-title-container">
            <h4 class="main__shop--language-title">${upgradeObject.label}</h4>
            <h5 class="main__shop--language-subtitle">${
              upgradeObject.subtitle
            }</h5>
        </div>
        <div class="main__shop--language-explain">
            <div class="main__shop--language-buy-container">
                <h5 class="main__shop--language-price" id="price" price>${utils.convertToReadable(
                  upgradeObject.base_cost
                )} ExP</h5>
                <h5 class="main__shop--language-gain" id="gain" gain>${utils.convertToReadable(
                  upgradeObject.flat_bonus
                )} ExP/${upgradeObject.is_active ? "Clic" : "Sec"}</h5>
            </div>
                <h4 class="main__shop--language-level" level></h4>
        </div>

      </div>`;

    if (upgradeObject.is_active) {
      mainShopLanguageContainer.insertAdjacentHTML("beforeend", newUpgrade);
    } else {
      mainShopTeamworkContainer.insertAdjacentHTML("beforeend", newUpgrade);
    }

    upgradeObject.DOM = document.querySelector(
      `[data-upgrade-id='${upgradeObject.id}']`
    );
    upgradeObject.unlock = false;
    upgradeObject.level = 0;
    upgradeObject.next_cost = upgradeObject.base_cost;
  },
};
