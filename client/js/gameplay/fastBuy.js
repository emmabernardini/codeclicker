const fastBuy = {
  higherUpgradeBuyable: 0,
  indexOfHigherUpgradeBuyable: null,
  displayButtonInDOM() {
    document.getElementById("buy-impossible").style.width = "80vw";
    document.getElementById("buy-impossible").style.opacity = "1";

    setTimeout(() => {
      if (mq.mobileQuery.matches) {
        document.getElementById("buy-impossible").style.display = "none";
        document
          .getElementById("buy-impossible")
          .classList.remove("fast-buy__on");
        document.getElementById("buy-possible").style.display = "flex";
        document.getElementById("buy-possible").classList.add("fast-buy__on");
      }
    }, 900);
  },
  calculateLowerUpgrade() {
    fastBuy.lowerUpgrade = [...click.upgrades].sort((upgA, upgB) => {
      return upgA.next_cost - upgB.next_cost;
    })[0];
  },
  calculateHigherUpgradeBuyable() {
    fastBuy.higherUpgradeBuyable = 0;
    fastBuy.indexOfHigherUpgradeBuyable = null;
    let buyable = click.upgrades.filter((upg) => {
      if (upg.unlock === true && Number(click.score) >= Number(upg.next_cost)) {
        return upg;
      }
    });

    if (buyable.length) {
      buyable.sort((upgA, upgB) => {
        return upgA.is_active - upgB.is_active;
      });
      buyable.sort((upgA, upgB) => {
        return upgA.next_cost - upgB.next_cost;
      });

      fastBuy.higherUpgradeBuyable = buyable[buyable.length - 1];
      fastBuy.indexOfHigherUpgradeBuyable = click.upgrades.findIndex((upg) => {
        return upg.id === fastBuy.higherUpgradeBuyable.id;
      });
    }
  },
  uppdateButtonInfoInDOM() {
    document.getElementById("buy-label").textContent =
      fastBuy.higherUpgradeBuyable.label;
    document.getElementById("buy-level").textContent =
      fastBuy.higherUpgradeBuyable.level;
    if (fastBuy.higherUpgradeBuyable.level > 0) {
      document.getElementById("buy-level").style.display = "flex";
    } else {
      document.getElementById("buy-level").style.display = "none";
    }
    document.getElementById("buy-next_cost").textContent =
      utils.convertToReadable(fastBuy.higherUpgradeBuyable.next_cost);
  },

  async displayPossibleBuyButton() {
    fastBuy.calculateHigherUpgradeBuyable();
    // On calcule le plus haut achetable : s'il existe, et que le bouton n'est pas déjà affiché, on l'affiche
    if (fastBuy.higherUpgradeBuyable) {
      fastBuy.uppdateButtonInfoInDOM();
      if (
        document
          .getElementById("buy-impossible")
          .classList.contains("fast-buy__on")
      ) {
        fastBuy.displayButtonInDOM();
        if (click.isLogged) {
          document
            .getElementById("buy-possible")
            .addEventListener("click", () => {
              buy.buyAndSave(
                click.upgrades[fastBuy.indexOfHigherUpgradeBuyable],
                fastBuy.indexOfHigherUpgradeBuyable
              );

              document.getElementById("disableFastBuy").style.display = "block";
              setTimeout(() => {
                document.getElementById("disableFastBuy").style.display =
                  "none";
              }, 100);
            });
        }
      }
    } else {
      if (
        document
          .getElementById("buy-possible")
          .classList.contains("fast-buy__on")
      ) {
        fastBuy.resetButton();
      }
    }
  },
  resetButton() {
    fastBuy.higherUpgradeBuyable = 0;
    fastBuy.indexOfHigherUpgradeBuyable = null;
    document.getElementById("buy-impossible").style.width = "45vw";
    document.getElementById("buy-impossible").style.opacity = "0.3";
    document.getElementById("buy-impossible").style.display = "flex";
    document.getElementById("buy-impossible").classList.add("fast-buy__on");
    document.getElementById("buy-possible").style.display = "none";
    document.getElementById("buy-possible").classList.remove("fast-buy__on");
  },
};
