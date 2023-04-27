const pages = {
  home: {
    element: document.getElementById("main-section"),
    button: document.getElementById("main_modal_mobile"),
    isActive: true,
  },
  shop: {
    element: document.getElementById("shop-section"),
    button: document.getElementById("shop_modal_mobile"),
    isActive: false,
  },
  resume: {
    element: document.getElementById("resume-section"),
    button: document.getElementById("stat_modal_mobile"),
    isActive: false,
  },
  menu: {
    button: document.getElementById("menu_modal_mobile"),
    isActive: false,
  },
  profil: {
    isActive: false,
  },
};

const displayPage = {
  startX: 0,
  endX: 0,
  displayHome() {
    pages.home.isActive = true;
    pages.shop.isActive = false;
    pages.resume.isActive = false;
    pages.menu.isActive = false;
    pages.profil.isActive = false;
    pages.shop.element.style.display = "none";
    pages.home.element.style.display = "flex";
    pages.resume.element.style.display = "none";
    pages.shop.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.home.button.querySelector("[mobile_icon]").style.fill =
      "var(--flash-color)";
    pages.resume.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.menu.button.querySelector("[mobile_icon]").style.fill = "white";
  },

  displayShop() {
    pages.shop.isActive = true;
    pages.resume.isActive = false;
    pages.home.isActive = false;
    pages.menu.isActive = false;
    pages.profil.isActive = false;
    pages.shop.element.style.display = "flex";
    pages.home.element.style.display = "none";
    pages.resume.element.style.display = "none";
    pages.shop.button.querySelector("[mobile_icon]").style.fill =
      "var(--flash-color)";
    pages.home.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.resume.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.menu.button.querySelector("[mobile_icon]").style.fill = "white";
  },

  displayResume() {
    pages.home.isActive = false;
    pages.shop.isActive = false;
    pages.resume.isActive = true;
    pages.menu.isActive = false;
    pages.profil.isActive = false;
    pages.shop.element.style.display = "none";
    pages.home.element.style.display = "none";
    pages.resume.element.style.display = "flex";
    pages.shop.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.home.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.menu.button.querySelector("[mobile_icon]").style.fill = "white";
    pages.resume.button.querySelector("[mobile_icon]").style.fill =
      "var(--flash-color)";
  },

  displayMenuButtonColor() {
    pages.menu.button.querySelector("[mobile_icon]").style.fill =
      "var(--flash-color)";
  },

  resetHomePage() {
    pages.shop.isActive = false;
    pages.resume.isActive = false;
    pages.home.isActive = true;
    pages.menu.isActive = false;
    pages.profil.isActive = false;
  },

  handleGestureHome() {
    if (displayPage.startX - displayPage.endX > 50) {
      displayPage.displayResume();
    } else if (displayPage.endX - displayPage.startX > 50) {
      displayPage.displayShop();
    }
  },

  handleGestureShop() {
    if (displayPage.startX - displayPage.endX > 50) {
      displayPage.displayHome();
    } else if (displayPage.endX - displayPage.startX > 50) {
      displayPage.displayMenuButtonColor();
      callback.openMenuModal();
    }
  },

  handleGestureCv() {
    if (displayPage.startX - displayPage.endX > 50) {
      if (click.isLogged) {
        callback.openProfilModal();
      } else {
        callback.openSignInModal();
      }
      pages.profil.isActive = true;
    } else if (displayPage.endX - displayPage.startX > 50) {
      displayPage.displayHome();
    }
  },

  recordStartPosition(event) {
    displayPage.startX = event.touches[0].pageX;
  },

  recordEndPositionAndSwipe(event) {
    if (
      event.target.classList.contains("main__gif") ||
      event.target.classList.contains("fast-buy__button--possible") ||
      event.target.classList.contains("fast-buy__button--impossible") ||
      event.target.classList.contains("fast-buy__container") ||
      event.target.classList.contains("fastBuy-disable") ||
      event.target.classList.contains("main__gif--container") ||
      event.target.classList.contains("coffee") ||
      event.target.classList.contains("cat") ||
      event.target.classList.contains("main__click--animations")
    ) {
      return;
    }

    displayPage.endX = event.changedTouches[0].pageX;
    if (pages.menu.isActive || pages.profil.isActive) {
      return;
    } else if (pages.home.isActive) {
      displayPage.handleGestureHome();
    } else if (pages.shop.isActive) {
      displayPage.handleGestureShop();
    } else if (pages.resume.isActive) {
      displayPage.handleGestureCv();
    } else {
      return;
    }
  },

  setUpMobileNavigation() {
    pages.shop.button.addEventListener("click", displayPage.displayShop);
    pages.home.button.addEventListener("click", displayPage.displayHome);
    pages.resume.button.addEventListener("click", displayPage.displayResume);
    pages.menu.button.addEventListener(
      "click",
      displayPage.displayMenuButtonColor
    );

    document.addEventListener("touchstart", displayPage.recordStartPosition);

    document.addEventListener(
      "touchend",
      displayPage.recordEndPositionAndSwipe
    );
  },

  removeMobileNavigation() {
    pages.shop.button.removeEventListener("click", displayPage.displayShop);
    pages.home.button.removeEventListener("click", displayPage.displayHome);
    pages.resume.button.removeEventListener("click", displayPage.displayResume);
    pages.menu.button.removeEventListener(
      "click",
      displayPage.displayMenuButtonColor
    );

    document.removeEventListener("touchstart", displayPage.recordStartPosition);

    document.removeEventListener(
      "touchend",
      displayPage.recordEndPositionAndSwipe
    );
    displayPage.resetHomePage();
  },
};
