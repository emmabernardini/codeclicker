const firstBuy = {
  async handleFirstBuy(id) {
    const info = {
      exp: click.score,
      click_counter: click.click,
      click_value: click.click_value,
      passive_value: click.passive_value,
      player_has_upgrade: click.upgrades.filter((upgrade) => upgrade.level),
    };
    try {
      const response = await fetch(`${utils.baseUrl}/save/upgrade/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) throw new Error(response);

      const playerObject = await response.json();
      firstBuy.setTerminalBuyInfo();
      return playerObject;
    } catch (error) {
      console.error(error);
    }
  },
  setTerminalBuyInfo() {
    // Display save message on terminal
    if (
      !document
        .getElementById("buy_message")
        .classList.contains("buy-message-active")
    ) {
      document
        .getElementById("buy_message")
        .classList.add("buy-message-active");
      document.getElementById("buy_message").style.display = "block";
      setTimeout(() => {
        document
          .getElementById("buy_message")
          .classList.remove("buy-message-active");
        document.getElementById("buy_message").style.display = "none";
      }, 10000);
    }
  },
};
