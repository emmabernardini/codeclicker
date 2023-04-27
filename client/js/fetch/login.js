const login = {
  init() {
    login.submit();
  },
  submit() {
    document
      .getElementById("login")
      .addEventListener("submit", login.handleLoginForm);
  },
  async handleLoginForm(event) {
    event.preventDefault();

    if (localStorage.getItem("token")) {
      callback.closeAllModals();
    }

    const loginFormElem = event.target;
    const formDataObject = new FormData(loginFormElem);
    const loginData = Object.fromEntries(formDataObject);

    const isValid = verifyFormInfo.verifyLogInInfo(loginData);
    if (isValid === false) return;
    try {
      const response = await fetch(`${utils.baseUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        utils.displayMessage(
          "login_error_info",
          "Identifiant ou mot de passe incorrect"
        );
        return;
      }
      const playerObject = await response.json();
      localStorage.setItem("token", playerObject.token);

      callback.closeAllModals();

      logged.handlePlayerInfo(playerObject);
    } catch (error) {
      console.error(error);
    }
  },
};

login.init();
