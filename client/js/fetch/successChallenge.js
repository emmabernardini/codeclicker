const successChallenge = {
  async handleSuccessChallenge() {
    const info = {
      exp: click.score,
      click_counter: click.click,
      last_challenge_id: click.last_challenge_id,
    };

    try {
      const response = await fetch(`${utils.baseUrl}/challenge`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) throw new Error(response);
      const json = await response.json();

      if (json.isSaved) {
        if (click.last_challenge_id) {
          click.last_challenge_id = Number(click.last_challenge_id) + 1;
        } else {
          click.last_challenge_id = 1;
        }
        document.getElementById("challenge_counter").textContent =
          click.last_challenge_id;
      }

      return;
    } catch (error) {
      console.error(error);
    }
  },
};
