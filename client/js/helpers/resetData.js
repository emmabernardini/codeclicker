const resetData = {
  // Not functionning because of shop comportment.
  // The goal is to reset the save / log out / delete account without refreshing the front page
  async resetDOMandClickObject() {
    click.score = 0;
    click.click = 0;
    click.passive_value = 0;
    click.click_value = 1;
    click.upgrades = [];
    document.getElementById("exp").textContent = click.score;
    document.getElementById("click_counter").textContent = click.click;
    document.getElementById("click_value").textContent = click.click_value;
    document.getElementById("passive_value").textContent = click.passive_value;

    click.upgrades = await upgradesData.getDataUpgrades();
    utils.resetShopStyleAndContent();

    const titlesCV = document.querySelectorAll(
      ".main__resume-grid-item--title"
    );
    titlesCV.forEach((title) => (title.textContent = ""));

    const gridCV = document.querySelectorAll(".main__resume-grid-item");
    gridCV.forEach((grid) => {
      grid.textContent = "";
      grid.style.backgroundColor = "var(--third-color)";
    });

    const avatarCV = document.querySelectorAll(".main__graph-avatar--img");
    avatarCV.forEach((avatar) => avatar.remove());

    const horizontalLine = document.querySelectorAll(
      ".main__graph-element--line-horizontal"
    );
    horizontalLine.forEach((line) => {
      line.style.height = "2px";
      line.style.backgroundColor = "white";
    });

    const verticalLine = document.querySelectorAll(
      ".main__graph-element--line-vertical"
    );
    verticalLine.forEach((line) => {
      line.style.width = "2px";
      line.style.backgroundColor = "white";
    });

    const horizontalBits = document.querySelectorAll(".target");
    horizontalBits.forEach((bit) => (bit.style.animation = "none"));

    const verticalBits = document.querySelectorAll(".target2");
    verticalBits.forEach((bit) => (bit.style.animation = "none"));
  },
};
