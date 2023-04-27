const mq = {
  titleClick: document.getElementById("name-app-mobile"),
  mobileQuery: window.matchMedia("(max-width: 800px)"),
  clickable_gif: document.getElementById("clickable_gif-container"),
  terminal: document.getElementById("terminal"),
  gif: document.getElementById("clickable_gif"),
  totalExp: document.querySelector(".main__resume--stat-master"),
  init() {
    if (mq.mobileQuery.matches) {
      mq.setMobileDisplay();
    }
    window.addEventListener("resize", mq.handleResponsiveWindow);
  },
  handleResponsiveWindow() {
    if (mq.mobileQuery.matches && !click.mobileSize) {
      mq.setMobileDisplay();
    } else if (!mq.mobileQuery.matches && click.mobileSize) {
      mq.setDesktopDisplay();
    }
  },

  setMobileDisplay() {
    click.mobileSize = true;
    mq.mobile.displayTitle();
    mq.mobile.hideAllMainDivs();
    mq.mobile.switch();
    mq.mobile.changeGif();
    mq.mobile.putTotalExpInHeader();
    mq.mobile.changeProfilButtonIfLogged();
    mq.mobile.addFastBuyButtonContainer();
    mq.mobile.hidePopUp();
    displayPage.setUpMobileNavigation();
  },

  setDesktopDisplay() {
    click.mobileSize = false;
    mq.desktop.removeFastBuyButtonContainer();
    mq.desktop.displayAllMainDivs();
    mq.desktop.hideTitleFromMainDiv();
    mq.desktop.changeGif();
    mq.desktop.switchGifAndTerminal();
    mq.desktop.removeTotalExpInHeaderAndPutItInCV();
    mq.desktop.hidePopUp();
    displayPage.removeMobileNavigation();
  },
  mobile: {
    displayTitle() {
      mq.titleClick.style.display = "block";
    },
    hideAllMainDivs() {
      document.getElementById("resume-section").style.display = "none";
      document.getElementById("shop-section").style.display = "none";
      document
        .getElementById("main_modal_mobile")
        .querySelector("[mobile_icon]").style.fill = "var(--flash-color)";
      document
        .getElementById("stat_modal_mobile")
        .querySelector("[mobile_icon]").style.fill = "white";
      document
        .getElementById("shop_modal_mobile")
        .querySelector("[mobile_icon]").style.fill = "white";
    },
    switch() {
      let parent = mq.clickable_gif.parentNode;
      // Insert the second div before the first div
      parent.insertBefore(mq.terminal, mq.clickable_gif);
    },
    changeGif() {
      mq.gif.src = "img/clicker_mobile.gif";
    },
    putTotalExpInHeader() {
      document.querySelector(".header__container").appendChild(mq.totalExp);
    },
    changeProfilButtonIfLogged() {
      if (click.isLogged) {
        document.getElementById("signin_modal_mobile").style.display = "none";
        document.getElementById("profile_modal_mobile").style.display = "block";
      }
    },
    addFastBuyButtonContainer() {
      if (!document.querySelector(".fast-buy__container")) {
        document.querySelector(".main__click--container").style.justifyContent =
          "space-around";
        const buttonElem = `
        <div class="fast-buy__container">
        <div class="fastBuy-disable" id="disableFastBuy"></div>
        <h3 class="fast-buy__title">Achat rapide</h3>
  
          <button class="fast-buy__button--impossible fast-buy__on" id="buy-impossible">
          Pas assez d'ExP
          </button>
  
          <button class="fast-buy__button--possible" id="buy-possible">
          <span class="fast-buy__upgrade" id="buy-label"></span> 
          <span class="fast-buy__level" id="buy-level">1</span> -> 
          <span class="fast-buy__next_cost" id="buy-next_cost"></span> ExP
          </button>
        </div>`;
        const beforeSibling = document.getElementById("terminal");
        beforeSibling.insertAdjacentHTML("afterend", buttonElem);
        fastBuy.displayPossibleBuyButton();
      }
    },
    hidePopUp() {
      document.getElementById("pop-up-1").style.display = "none";
      document.getElementById("pop-up-2").style.display = "none";
      document.getElementById("pop-up-3").style.display = "none";
      document.getElementById("pop-up-4").style.display = "none";
      document.getElementById("pop-up-5").style.display = "none";
      document.getElementById("pop-up-6").style.display = "none";
      document.getElementById("shop-section").style.filter = "none";
      document.getElementById("languages").style.filter = "none";
      document.getElementById("terminal").style.filter = "none";
      document.getElementById("resume-section").style.filter = "none";
      document.getElementById("main-section").style.filter = "none";
      document.getElementsByClassName(
        "main__resume-total-stats-container"
      )[0].style.filter = "none";
      document.getElementsByClassName(
        "main__resume-part-container"
      )[0].style.filter = "none";
      document.getElementsByClassName(
        "main__resume-part-container"
      )[1].style.filter = "none";
    },
  },
  desktop: {
    removeFastBuyButtonContainer() {
      document.querySelector(".fast-buy__container").remove();
      document.querySelector(".main__click--container").style.justifyContent =
        "space-around";
    },
    displayAllMainDivs() {
      document.getElementById("resume-section").style.display = "flex";
      document.getElementById("shop-section").style.display = "flex";
      document.getElementById("main-section").style.display = "flex";
    },
    hideTitleFromMainDiv() {
      mq.titleClick.style.display = "none";
    },
    changeGif() {
      mq.gif.src = "img/clicker.gif";
    },
    switchGifAndTerminal() {
      let parent = mq.clickable_gif.parentNode;

      parent.insertBefore(mq.clickable_gif, mq.terminal);
    },
    removeTotalExpInHeaderAndPutItInCV() {
      document
        .querySelector(".main__resume-total-stats-container")
        .insertAdjacentElement("afterbegin", mq.totalExp);
    },
    hidePopUp() {
      document.getElementById("pop-up-m").style.display = "none";
    },
  },
};

mq.init();
