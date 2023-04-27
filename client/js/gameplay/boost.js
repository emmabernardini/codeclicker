// Create a random boost by displaying div and allow click on them to multiply active or passive gain x 2

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const boost = {
  coffeeBoostActive: false,
  catBoostActive: false,
  coffeeBooster() {
    const coffeeBonus = document.getElementById("bonus-coffee");

    coffeeBonus.removeEventListener("click", boost.coffeecallback);
    let coffeeRandomNumber = getRandomInt(5000, 180000);
    // Select the elem "coffee bonus"

    // When the user Log In, the boost appear between 2 random number
    setTimeout(function () {
      boost.coffeeBoostActive = true;
      coffeeBonus.style.display = "block";
      document.getElementById("clickable_gif").style.filter = "brightness(50%)";
    }, coffeeRandomNumber);

    // Add EventListener that display "none" the boost div , multiply x 2 gain , play a coffee sound and then go back to normal after X second
    coffeeBonus.addEventListener("click", boost.coffeecallback);
  },

  coffeecallback() {
    const coffeeBonus = document.getElementById("bonus-coffee");
    const info = document.getElementById("click_value").parentNode;
    const promptMessageActive = document.getElementById("boostActif_message");
    boost.coffeeBoostActive = false;
    coffeeBonus.style.display = "none";
    if (!boost.catBoostActive) {
      document.getElementById("clickable_gif").style.filter =
        "brightness(100%)";
    }
    info.classList.add("boosted-passive");
    promptMessageActive.classList.remove("boost_hidden");
    click.active_boost = click.click_value * 2;
    effect.audioElement.coffeeSound.play();
    setTimeout(() => {
      click.active_boost = 0;
      info.classList.remove("boosted-passive");
      promptMessageActive.classList.add("boost_hidden");
      boost.coffeeBooster();
    }, 5000);
  },

  catBooster() {
    const catBonus = document.getElementById("bonus-cat");
    catBonus.removeEventListener("click", boost.catCallback);
    const catRandomNumber = getRandomInt(5000, 180000);

    setTimeout(function () {
      boost.catBoostActive = true;
      catBonus.style.display = "block";
      document.getElementById("clickable_gif").style.filter = "brightness(50%)";
    }, catRandomNumber);

    catBonus.addEventListener("click", boost.catCallback);
  },

  catCallback() {
    const info = document.getElementById("passive_value").parentNode;
    const promptMessagePassive = document.getElementById("boostPassif_message");
    const catBonus = document.getElementById("bonus-cat");

    boost.catBoostActive = false;
    catBonus.style.display = "none";
    if (!boost.coffeeBoostActive) {
      document.getElementById("clickable_gif").style.filter =
        "brightness(100%)";
    }
    info.classList.add("boosted-passive");
    promptMessagePassive.classList.remove("boost_hidden");
    click.passive_boost = click.passive_value * 2;
    effect.audioElement.catSound.play();

    setTimeout(() => {
      click.passive_boost = 0;
      info.classList.remove("boosted-passive");
      promptMessagePassive.classList.add("boost_hidden");
      boost.catBooster();
    }, 5000);
  },
};
