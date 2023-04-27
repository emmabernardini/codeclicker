const logout = {
  init() {
    logout.submit();
  },
  submit() {
    document
      .getElementById("logout")
      .addEventListener("click", logout.handlelogout);
  },
  async handlelogout() {
    // Plugger les informations du front : quantité d'exp, nombre de clic (via le player object).
    const info = { exp: click.score, click_counter: click.click };

    if (!localStorage.getItem("token")) {
      return;
    }

    try {
      const response = await fetch(`${utils.baseUrl}/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) throw new Error(response);

      const json = await response.json();
      localStorage.removeItem("token");
      notLogged.handleNotLogged();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
};

logout.init();
