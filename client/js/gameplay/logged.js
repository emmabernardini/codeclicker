const logged = {
  async getPlayerInfo() {
    const playerObject = await getPlayerInfo.getPlayerObject();
    logged.handlePlayerInfo(playerObject);
  },

  handlePlayerInfo(playerObject) {
    // 0. S'ils existent, supprimer les listener d'ouverture de modale (cf quand on est pas log) - S'assurer que firstlanguage et teamwork existent
    utils.removeAddEventListenerNotLogged();
    // 1. Remplir les infos d'exp et autre valeur dans le clickObject (de base et d'ugrade)
    utils.updateClickObjectWithSave(playerObject);

    // 2. Faire de même dans le DOM
    utils.updateDomWithClickObject();

    // 3. Et leur CSS (sur les deux moitiés du shop)
    for (let i = 0; i < click.upgrades.length; i++) {
      buy.handleIsAffordable(click.upgrades[i], i);
    }

    // 4. Mettre le timer en place de toutes les minutes de sauvegarde
    utils.setSaveTimer();

    // 5. Modifier le bouton log in pour le pseudo de l'utilisateur
    logged.handleLoginButton(playerObject);

    // 6. manage the passive value
    utils.handlePassiveValue();

    // 7. manage the resume part
    utils.modifyResume();

    // 8. manage boost
    boost.coffeeBooster();
    boost.catBooster();

    // 9. Renvoi en front de l'info du passif généré s'il y a lieu dans une pop-up
    if (click.expSinceLastSave) {
      utils.manageExpSinceSaveInDOM();
    }

    // 9. Gestion du fastBuy
    if (mq.mobileQuery.matches) {
      fastBuy.displayPossibleBuyButton();
    }

    // 10. Afficher les informations de profil
    userInfo.handleUserProfile();
  },

  handleLoginButton(playerObject) {
    // Cacher le bouton log in
    document.getElementById("signin_modal_btn").style.display = "none";
    // Afficher le pseudo à la place
    document.getElementById("profile_modal_btn").textContent =
      playerObject.username;
    document.getElementById("profile_modal_btn").style.display = "block";

    if (mq.mobileQuery.matches) {
      mq.mobile.changeProfilButtonIfLogged();
    }
  },
};
