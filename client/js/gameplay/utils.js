const utils = {
  baseUrl: "http://localhost:3000",
  gif: document.getElementById("clickable_gif-container"),
  animation: document.querySelector("[animation]"),
  grids: document.querySelectorAll("[grid]"),
  grid_names: document.querySelectorAll("[grid-name]"),
  nodes: document.querySelectorAll("[node]"),
  firstLanguage: "",
  firstTeamwork: "",
  colors: [
    "#ffaab0",
    "#ff9da5",
    "#ff8f9a",
    "#ff828f",
    "#ff7584",
    "#ff687a",
    "#ff5b6f",
    "#ff4f64",
    "#ff425a",
    "#ff3650",
    "#ff2a46",
    "#ff1e3c",
    "#ff1232",
    "#ff0628",
    "#ff001e",
    "#f5000c",
    "#e90009",
    "#dd0006",
    "#d10003",
    "#c50000",
    "#b20000",
    "#a90202",
  ],

  updateClickObjectWithSave(playerObject) {
    click.isLogged = true;
    click.email = playerObject.email;
    click.username = playerObject.username;
    click.score = playerObject.exp;
    click.click = playerObject.click_counter;
    click.passive_value = playerObject.passive_value;
    click.click_value = playerObject.click_value;
    if (playerObject.last_challenge_id) {
      click.last_challenge_id = playerObject.last_challenge_id;
    }

    if (playerObject.expSinceLastSave) {
      click.expSinceLastSave = playerObject.expSinceLastSave;
    }

    click.upgrades.forEach((upgrade, index) => {
      if (playerObject.player_has_upgrade) {
        const updatedUpgrade = playerObject.player_has_upgrade.find(
          (upg) => upg.upgrade_id == upgrade.id
        );

        if (updatedUpgrade) {
          upgrade.level = updatedUpgrade.level;
          upgrade.unlock = true;
          if (updatedUpgrade.next_cost) {
            upgrade.next_cost = updatedUpgrade.next_cost;
          }
        }

        if (upgrade.level > 0 && index + 1 < click.upgrades.length) {
          click.upgrades[index + 1].unlock = true;
        }
      }
    });

    utils.handleChallengeGain();
  },

  updateDomWithClickObject() {
    // Store every info in click object and in DOM
    document.getElementById("exp").textContent = `${utils.convertToReadable(
      click.score
    )}`;
    document.getElementById(
      "click_counter"
    ).textContent = `${utils.convertToReadable(click.click)}`;
    document.getElementById(
      "click_value"
    ).textContent = `${utils.convertToReadable(click.click_value)}`;
    document.getElementById(
      "passive_value"
    ).textContent = `${utils.convertToReadable(click.passive_value)}`;

    if (click.last_challenge_id) {
      document.getElementById(
        "challenge_counter"
      ).textContent = `${utils.convertToReadable(click.last_challenge_id)}`;
    } else {
      document.getElementById("challenge_counter").textContent = 0;
    }

    for (let i = 0; i < click.upgrades.length; i++) {
      click.upgrades[i].DOM.querySelector(
        "[level]"
      ).textContent = `${click.upgrades[i].level}`;

      click.upgrades[i].DOM.querySelector(
        "[price]"
      ).textContent = `${utils.convertToReadable(
        click.upgrades[i].next_cost
      )} ExP`;

      if (click.upgrades[i].unlock) {
        click.upgrades[i].DOM.style.filter = "none";
      }
    }
  },

  setSaveTimer() {
    setTimeout(
      setInterval(() => {
        simpleSave.handleSimpleSaveAction();
      }, 60000),
      60000
    );
  },

  removeAddEventListenerNotLogged() {
    utils.firstLanguage.DOM.removeEventListener(
      "click",
      callback.openSignInModal
    );
    utils.firstTeamwork.DOM.removeEventListener(
      "click",
      callback.openSignInModal
    );

    if (mq.mobileQuery.matches) {
      document
        .getElementById("buy-possible")
        .removeEventListener("click", callback.openSignInModal);
    }
  },

  clickAnimation(e) {
    //manage the +1 animation
    const div = document.createElement("div");
    div.dataset.animation = "animation";
    div.classList.add("main__click--animations");
    if (click.active_boost) {
      div.classList.add("boosted");
      div.textContent = `+${utils.convertToReadable(click.click_value)}*2`;
    } else {
      if (div.classList.contains("boosted")) {
        div.classList.remove("boosted");
      }
      div.textContent = `+${utils.convertToReadable(click.click_value)}`;
    }
    const x = e.clientX;
    const y = e.clientY;
    document.querySelector("#clickable_gif-container").appendChild(div);
    div.style.position = "fixed";
    div.style.top = y + "px";
    div.style.left = x + "px";
    div.style.setProperty("--start-clicker-animations", `${y}px`);

    const gifTop = document.querySelector("#clickable_gif-container").offsetTop;
    const delta = y - gifTop;

    div.style.setProperty("--end-clicker-animations", `${y - delta}px`);
    div.style.display = "block";
    div.style.animation = "bounce 1s ease";

    setTimeout(() => {
      div.remove();
    }, 900);
  },

  scoreIteration() {
    if (click.active_boost) {
      click.score = Number(click.score) + Number(click.click_value * 2);
    } else {
      click.score = Number(click.score) + Number(click.click_value);
    }
    click.click++;
    document.getElementById("exp").textContent = `${utils.convertToReadable(
      click.score
    )}`;
    document.getElementById(
      "click_counter"
    ).textContent = `${utils.convertToReadable(click.click)}`;
  },

  modifyResume() {
    utils.modifyResumeLanguage();
    utils.modifyResumeTeamwork();
  },
  modifyResumeLanguage() {
    const languageUpgrades = click.upgrades.filter(
      (upgrade) => upgrade.is_active === true
    );

    for (let i = 0; i < languageUpgrades.length; i++) {
      if (
        click.upgrades[i].unlock === true &&
        click.upgrades[i].is_active === true &&
        click.upgrades[i].level
      ) {
        if (click.upgrades[i].level < utils.colors.length * 3) {
          utils.grids[i].style.backgroundColor =
            utils.colors[Math.floor(click.upgrades[i].level / 3)];
        } else {
          utils.grids[i].style.backgroundColor = "#b20000";
        }

        utils.grids[i].textContent = click.upgrades[i].level;

        utils.grid_names[i].textContent = click.upgrades[i].label;
      }
    }
  },
  modifyResumeTeamwork() {
    const teamworkUpgrades = click.upgrades.filter(
      (upgrade) => upgrade.is_active === false
    );

    for (let i = 0; i < teamworkUpgrades.length; i++) {
      if (
        teamworkUpgrades[i].unlock === true &&
        teamworkUpgrades[i].is_active === false &&
        teamworkUpgrades[i].level
      ) {
        //append avatar is not already here only
        if (!utils.nodes[i].querySelector("img")) {
          let avatar = document.createElement("img");
          avatar.src = `img/${teamworkUpgrades[i].img_name}`;
          avatar.classList.add("main__graph-avatar--img");
          utils.nodes[i].appendChild(avatar);
        }

        //manage the line itensity
        let childLines = utils.nodes[i].querySelectorAll("[line]");
        for (let childLine of childLines) {
          //colour
          if (teamworkUpgrades[i].level < utils.colors.length * 3) {
            childLine.style.backgroundColor =
              utils.colors[Math.floor(teamworkUpgrades[i].level / 3)];
          } else {
            childLine.style.backgroundColor =
              utils.colors[utils.colors.length - 1];
          }
          //width/height
          if (childLine.hasAttribute("horizontal")) {
            if (teamworkUpgrades[i].level < 6) {
              let height = teamworkUpgrades[i].level + 4;
              childLine.style.height = `${height}px`;
              childLine.style.transform = `translateY(-${height / 2}px)`;
            } else {
              childLine.style.height = "10px";
              childLine.style.transform = "translateY(-5px)";
            }
          } else {
            if (teamworkUpgrades[i].level < 6) {
              let width = teamworkUpgrades[i].level + 4;
              childLine.style.width = `${width}px`;
              childLine.style.transform = `translateX(-${width / 2}px)`;
            } else {
              childLine.style.width = "10px";
              childLine.style.transform = "translateX(-5px)";
            }
          }
        }

        //manage the 10001110 speed H
        if (
          teamworkUpgrades[i].level < 10 &&
          utils.nodes[i].querySelector("[bits]")
        ) {
          utils.nodes[i].querySelector(
            "[bits]"
          ).style.animation = `rightToLeft ${
            2.5 - teamworkUpgrades[i].level * 0.2
          }s linear 3`;
        } else if (utils.nodes[i].querySelector("[bits]")) {
          utils.nodes[i].querySelector(
            "[bits]"
          ).style.animation = `rightToLeft 0.5s linear 3`;
        }

        //manage the 10001110 font-size H
        if (
          teamworkUpgrades[i].level < 6 &&
          utils.nodes[i].querySelector("[bits]")
        ) {
          utils.nodes[i].querySelector("[bits]").style.fontSize = ` ${
            2.5 - teamworkUpgrades[i].level + 4
          }px`;
        } else if (utils.nodes[i].querySelector("[bits]")) {
          utils.nodes[i].querySelector("[bits]").style.fontSize = `10px`;
        }

        //manage the 10001110 speed V
        if (
          teamworkUpgrades[i].level < 10 &&
          utils.nodes[i].querySelector("[bits-vertical]")
        ) {
          utils.nodes[i].querySelector(
            "[bits-vertical]"
          ).style.animation = `topToBottom ${
            2.5 - teamworkUpgrades[i].level * 0.2
          }s linear 3`;
        } else if (utils.nodes[i].querySelector("[bits-vertical]")) {
          utils.nodes[i].querySelector(
            "[bits-vertical]"
          ).style.animation = `topToBottom 0.5s linear 3`;
        }

        //manage the 10001110 font-size V
        if (
          teamworkUpgrades[i].level < 6 &&
          utils.nodes[i].querySelector("[bits-vertical]")
        ) {
          utils.nodes[i].querySelector("[bits-vertical]").style.fontSize = ` ${
            2.5 - teamworkUpgrades[i].level + 4
          }px`;
        } else if (utils.nodes[i].querySelector("[bits-vertical]")) {
          utils.nodes[i].querySelector(
            "[bits-vertical]"
          ).style.fontSize = `10px`;
        }
      }
    }
  },

  resetShopStyleAndContent() {
    for (const upgrade of click.upgrades) {
      upgrade.DOM = document.querySelector(`[data-upgrade-id='${upgrade.id}']`);
      upgrade.unlock = false;
      upgrade.level = 0;
      upgrade.next_cost = upgrade.base_cost;

      upgrade.DOM.style.filter = "blur(5px)";
      upgrade.DOM.style.opacity = "0.3";
      upgrade.DOM.querySelector(".main__shop--language-level").textContent =
        "0";
      upgrade.DOM.querySelector(
        "[price]"
      ).textContent = `${utils.convertToReadable(upgrade.next_cost)} ExP`;
    }
    utils.selectFirstsUpgrades();
    if (mq.mobileQuery.matches) {
      fastBuy.resetButton();
    }
  },

  selectFirstsUpgrades() {
    utils.firstLanguage = click.upgrades.find(
      (upgrade) => upgrade.is_active === true
    );
    utils.firstLanguage.unlock = true;
    utils.firstLanguage.DOM.style.filter = "none";

    utils.firstTeamwork = click.upgrades.find(
      (upgrade) => upgrade.is_active === false
    );
    utils.firstTeamwork.unlock = true;
    utils.firstTeamwork.DOM.style.filter = "none";
  },
  handlePassiveValue() {
    setInterval(() => {
      if (click.passive_boost) {
        click.score = Number(click.score) + Number(click.passive_value * 2);
        document.getElementById("exp").textContent = `${utils.convertToReadable(
          click.score
        )}`;
      } else {
        click.score = Number(click.score) + Number(click.passive_value);
      }
      document.getElementById("exp").textContent = `${utils.convertToReadable(
        click.score
      )}`;

      utils.handleChallengeGain();

      for (let i = 0; i < click.upgrades.length; i++) {
        buy.handleIsAffordable(click.upgrades[i], i);
      }

      if (mq.mobileQuery.matches) {
        fastBuy.displayPossibleBuyButton();
      }
    }, 1000);
  },

  handleChallengeGain() {
    if (click.last_challenge_id >= 8) {
      utils.handleLastChallenge();
      return;
    }
    if (!click.last_challenge_id) {
      click.challengeGain = Math.round(1 * (click.score * 0.2));
    } else {
      click.challengeGain = Math.round(
        click.last_challenge_id * (click.score * 0.2)
      );
    }
    document.getElementById(
      "challenge-prompt"
    ).textContent = `Do you want to try the current challenge for ${utils.convertToReadable(
      click.challengeGain
    )} ExP? [enter Yes]`;
  },

  handleLastChallenge() {
    document.getElementById("challenge-prompt").textContent =
      "You have done every challenges! Yaay!";
  },

  displayMessage(elem, message) {
    const infoContainer = document.getElementById(elem);
    infoContainer.textContent = message;
    infoContainer.style.display = "block";
  },

  manageExpSinceSaveInDOM() {
    document.getElementById("exp_while_not_here").textContent =
      utils.convertToReadable(click.expSinceLastSave);
    document.getElementById("exp_modal").style.display = "flex";
  },

  disableSaveBtn() {
    // Disable save btn and set timer, then reable it.
    document
      .getElementById("save_btn")
      .removeEventListener("click", simpleSave.saveAndHandleDom);

    document
      .getElementById("save_btn")
      .classList.add("modal_profile_btn-disabled");
    document.querySelector(".modal_profile_btn-info").style.display = "block";
    let timer = 59;
    setInterval(() => {
      if (timer >= 0) {
        document.getElementById("timer").textContent = timer;
        timer--;
      } else {
        delete timer;
        return;
      }
    }, 1000);

    setTimeout(() => {
      document
        .getElementById("save_btn")
        .addEventListener("click", simpleSave.saveAndHandleDom);
      document
        .getElementById("save_btn")
        .classList.remove("modal_profile_btn-disabled");
      document.querySelector(".modal_profile_btn-info").style.display = "none";
    }, 61000);
  },

  convertToReadable(value) {
    const regex = /^-?\d+(?:\.\d{0,3})?/;
    let modifiedNumber;
    let unit;

    if (value < 1e3) return String(value);

    if (value >= 1e3 && value < 1e6) {
      unit = "k";
      modifiedNumber = (value / 1e3).toString().match(regex);
    } else if (value >= 1e6 && value < 1e9) {
      unit = "M";
      modifiedNumber = (value / 1e6).toString().match(regex);
    } else if (value >= 1e9 && value < 1e12) {
      unit = "G";
      modifiedNumber = (value / 1e9).toString().match(regex);
    } else if (value >= 1e12 && value < 1e15) {
      unit = "T";
      modifiedNumber = (value / 1e12).toString().match(regex);
    } else if (value >= 1e15 && value < 1e18) {
      unit = "P";
      modifiedNumber = (value / 1e15).toString().match(regex);
    } else if (value >= 1e18 && value < 1e21) {
      unit = "E";
      modifiedNumber = (value / 1e18).toString().match(regex);
    } else if (value >= 1e21 && value < 1e24) {
      unit = "Z";
      modifiedNumber = (value / 1e21).toString().match(regex);
    } else if (value >= 1e24 && value < 1e27) {
      unit = "Y";
      modifiedNumber = (value / 1e24).toString().match(regex);
    } else {
      const stringValue = value.toString();
      const numberOfDigits =
        Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;
      unit = ` 1e${numberOfDigits - 1}`;
      modifiedNumber = `${stringValue[0]}${stringValue[1]}${stringValue[2]}${stringValue[3]}${stringValue[4]}`;
    }

    return `${modifiedNumber}${unit}`;
  },

  async successChallengeAnimation() {
    document.getElementById("confetti-holder").style.display = "flex";
    const element = document.getElementById("e0DQ82qcIov1");
    element.svgatorPlayer.ready(function () {
      // this refers to the player object
      const player = element ? element.svgatorPlayer : {};
      if (player.play) {
        player.play();
      }
    });
  },

  displayManualPopUp() {
    if (mq.mobileQuery.matches) {
      document.getElementById("pop-up-m").style.display = "block";
      document.getElementById("pop-up-m").addEventListener("click", () => {
        document.getElementById("pop-up-m").style.display = "none";
      });
    } else {
      document.getElementById("pop-up-1").style.display = "block";
    }
  },

  focusTerminalForm() {
    document.getElementById("prompt-input-data").focus();
    document.getElementById("terminal").addEventListener("click", () => {
      document.getElementById("prompt-input-data").focus();
    });
  },
};
