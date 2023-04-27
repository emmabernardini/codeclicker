// Notice pop-up management : for each pop-up, if closed, open the next one.
const buttons = [
  {
    button: document.getElementById("popup-button-1"),
    popup: document.getElementById("pop-up-1"),
    isVisible: false,
  },
  {
    button: document.getElementById("popup-button-2"),
    popup: document.getElementById("pop-up-2"),
    isVisible: false,
  },
  {
    button: document.getElementById("popup-button-3"),
    popup: document.getElementById("pop-up-3"),
    isVisible: false,
  },
  {
    button: document.getElementById("popup-button-4"),
    popup: document.getElementById("pop-up-4"),
    isVisible: false,
  },
  {
    button: document.getElementById("popup-button-5"),
    popup: document.getElementById("pop-up-5"),
    isVisible: false,
  },
  {
    button: document.getElementById("popup-button-6"),
    popup: document.getElementById("pop-up-6"),
    isVisible: false,
  },
];

buttons.forEach(({ button, popup, isVisible }, i) => {
  button.addEventListener("click", () => {
    popup.style.display = "none";
    buttons[i].isVisible = false;
    if (i < buttons.length - 1) {
      buttons[i + 1].popup.style.display = "block";
      buttons[i + 1].isVisible = true;
      blurEffect();
    }
  });
});

document.getElementById("popup-button-close").addEventListener("click", () => {
  document.getElementById("pop-up-1").style.display = "none";
});

const shopSection = document.getElementById("shop-section");
const terminal = document.getElementById("terminal");
const cvSection = document.getElementById("resume-section");
const mainSection = document.getElementById("main-section");
const cvInfograph = document.getElementsByClassName(
  "main__resume-part-container"
);
const languagePart = document.getElementById("languages");
const infoInCv = document.getElementsByClassName(
  "main__resume-total-stats-container"
);

// When each pop-up isVisible === true, we blur everything we don't need and deblur them if needed
function blurEffect() {
  if (buttons[1].isVisible) {
    shopSection.style.filter = "blur(15px)";
    terminal.style.filter = "blur(15px)";
    cvSection.style.filter = "blur(15px)";
  } else if (buttons[2].isVisible) {
    terminal.style.filter = "none";
    cvSection.style.filter = "none";
    mainSection.style.filter = "blur(15px)";
    cvInfograph[0].style.filter = "blur(15px)";
    cvInfograph[1].style.filter = "blur(15px)";
  } else if (buttons[3].isVisible) {
    cvSection.style.filter = "blur(15px)";
    shopSection.style.filter = "none";
    languagePart.style.filter = "blur(15px)";
  } else if (buttons[4].isVisible) {
    cvSection.style.filter = "none";
    cvInfograph[0].style.filter = "none";
    cvInfograph[1].style.filter = "none";
    languagePart.style.filter = "none";
    shopSection.style.filter = "blur(15px)";
    infoInCv[0].style.filter = "blur(15px)";
  } else if (buttons[5].isVisible) {
    shopSection.style.filter = "none";
    terminal.style.filter = "none";
    cvSection.style.filter = "none";
    mainSection.style.filter = "none";
    infoInCv[0].style.filter = "none";
    cvInfograph[0].style.filter = "none";
    cvInfograph[1].style.filter = "none";
  }
}

blurEffect();
