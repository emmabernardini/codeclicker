const notLogged = {
  handleNotLogged() {
    utils.firstLanguage.DOM.addEventListener("click", callback.openSignInModal);
    utils.firstTeamwork.DOM.addEventListener("click", callback.openSignInModal);
    if (mq.mobileQuery.matches) {
      document
        .getElementById("buy-possible")
        .addEventListener("click", callback.openSignInModal);
    }
    utils.resetShopStyleAndContent();

    document.getElementById("signin_modal_btn").style.display = "block";
    // Afficher le pseudo à la place
    document.getElementById("profile_modal_btn").textContent = "";
    document.getElementById("profile_modal_btn").style.display = "none";
  },
};
