const register = {
  init() {
    register.submit();
  },
  submit() {
    document
      .getElementById("register")
      .addEventListener("submit", register.handleRegisterForm);
  },
  async handleRegisterForm(event) {
    event.preventDefault();

    const responseCaptcha = grecaptcha.getResponse();
    if (!responseCaptcha) {
      utils.displayMessage(
        "register_error_info",
        "Veuillez vérifier que vous n'êtes pas un robot."
      );
      return;
    }

    if (localStorage.getItem("token")) {
      callback.closeAllModals();
    }

    const registerFormElem = event.target;
    const formDataObject = new FormData(registerFormElem);
    const registerData = Object.fromEntries(formDataObject);

    registerData.exp = click.score;
    registerData.click_counter = click.click;

    const isValid = verifyFormInfo.verifyRegisterInfo(registerData);
    if (isValid === false) return;

    try {
      const response = await fetch(`${utils.baseUrl}/player`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) throw new Error(response);

      const playerObject = await response.json();

      if (playerObject.token === undefined) {
        utils.displayMessage(
          "register_error_info",
          "Problème lors de la création de compte"
        );
        return;
      }

      localStorage.setItem("token", playerObject.token);
      logged.handlePlayerInfo(playerObject);
      utils.displayManualPopUp();
      callback.closeAllModals();
    } catch (error) {
      console.error("Erreur lors de la création du compte", error);
    }
  },
};

register.init();
