const app = {
  async init() {
    // Handling volume and theme settings
    themeInit.handleThemeValue();
    soundInit.handleVolumeValue();
    utils.focusTerminalForm();

    // Listener on gif to listen the click
    initialSetUp.clickLogo();

    // Obtient les infos de la BDD et les stock dans click.upgrades
    const upgrades = await upgradesData.getDataUpgrades();
    if (!upgrades) {
      return;
    }
    click.upgrades = upgrades;
    // Populate the dom and set new property to upgrade object
    for (const upgrade of click.upgrades) {
      initialSetUp.makeUpgradeInDom(upgrade);
    }
    // Configuration of the first teamwork and language in clickObject for special event if not logged
    utils.selectFirstsUpgrades();

    click.isLogged = await verifyToken.handleTokenVerification();

    if (click.isLogged) {
      logged.getPlayerInfo();
    } else {
      notLogged.handleNotLogged();
      utils.handleChallengeGain();
      for (let i = 0; i < click.upgrades.length; i++) {
        buy.handleIsAffordable(click.upgrades[i], i);
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init());
