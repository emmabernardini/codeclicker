const buy = {
  async handleIsAffordable(upgrade, index) {
    if (
      Number(click.score) >= Number(upgrade.next_cost) &&
      upgrade.unlock == true
    ) {
      upgrade.DOM.style.opacity = "1";
      if (localStorage.getItem("token") && !upgrade.isListened) {
        // On ajoute à l'upgrade une prop booléenne isListened afin de ne pas reposer d'écouteur s'il est déjà posé
        buy.placeBuyListeners(upgrade, index);
        upgrade.isListened = true;
      }
    } else {
      upgrade.DOM.style.opacity = "0.3";
    }
  },

  placeBuyListeners(upgrade, index) {
    upgrade.DOM.addEventListener("click", () => {
      buy.buyAndSave(upgrade, index);
    });
  },

  disableShopBuy() {
    if (
      document.getElementById("languages_btn").classList.contains("is-active")
    ) {
      document.getElementById("disableLanguage").style.width = "250%";
      document.getElementById("disableTeamwork").style.width = "250%";
    } else {
      document.getElementById("disableLanguage").style.width = "238%";
      document.getElementById("disableTeamwork").style.width = "238%";
    }
    document.getElementById("disableLanguage").style.display = "block";
    document.getElementById("disableTeamwork").style.display = "block";

    setTimeout(() => {
      document.getElementById("disableLanguage").style.display = "none";
      document.getElementById("disableTeamwork").style.display = "none";
    }, 100);
  },

  async buyAndSave(upgrade, index) {
    // Ici, on va remove tous les events listeners et les remettre après 250 ms
    buy.disableShopBuy();

    if (click.score < upgrade.next_cost) return;
    // Gestion du son
    if (upgrade.is_active) {
      effect.playEffect(effect.audioElement.buyActiveUpgradeEffect);
    } else {
      effect.playEffect(effect.audioElement.buyPassiveUpgradeEffect);
    }

    let playerObject = "";
    if (upgrade.level) {
      // Il a déjà acheté au moins 1 fois
      playerObject = await nextBuy.handlenextBuy(upgrade.id);
    } else {
      // C'est le premier achat
      playerObject = await firstBuy.handleFirstBuy(upgrade.id);

      if (index + 1 < click.upgrades.length) {
        buy.unlockNewUpgrade(click.upgrades[index + 1]);
      }
    }
    buy.handleBuy(upgrade, playerObject);
  },

  handleBuy(upgrade, playerObject) {
    const upgradeUpdated = playerObject.player_has_upgrade.find(
      (upg) => upg.id === upgrade.id
    );
    upgrade.level = upgradeUpdated.level;
    upgrade.next_cost = upgradeUpdated.next_cost;

    utils.updateClickObjectWithSave(playerObject);
    utils.updateDomWithClickObject();
    if (mq.mobileQuery.matches) {
      fastBuy.displayPossibleBuyButton();
    }

    utils.modifyResume();

    for (let i = 0; i < click.upgrades.length; i++) {
      buy.handleIsAffordable(click.upgrades[i], i);
    }
  },

  unlockNewUpgrade(upgrade) {
    upgrade.unlock = true;
    buy.handleUnlockInDOM();
  },

  handleUnlockInDOM() {
    for (const upgrade of click.upgrades) {
      if (upgrade.unlock === true) {
        upgrade.DOM.style.filter = "none";
      }
    }
  },
};
