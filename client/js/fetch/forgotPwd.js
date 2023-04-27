const forgotPwd = {
  init() {
    forgotPwd.submit();
  },
  submit() {
    document
      .getElementById("pwd_forget")
      .addEventListener("submit", forgotPwd.handleForgetPwdForm);
  },
  async handleForgetPwdForm(event) {
    event.preventDefault();

    if (localStorage.getItem("token")) {
      callback.closeAllModals();
    }

    const forgotPwdFormElem = event.target;
    const formDataObject = new FormData(forgotPwdFormElem);
    const forgotPwdData = Object.fromEntries(formDataObject);

    const isValid = verifyFormInfo.verifyForgotPwd(forgotPwdData);
    if (isValid === false) return;

    try {
      const response = await fetch(`${utils.baseUrl}/lostPassword`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPwdData),
      });

      if (response.ok) {
        utils.displayMessage(
          "forgot_pwd_info",
          "Un email vous a été envoyé avec votre nouveau mot de passe"
        );
      } else {
        utils.displayMessage(
          "forgot_pwd_info",
          "Il n'existe pas de compte associé à cet email"
        );
      }
      return;
    } catch (error) {
      console.error(error);
    }
  },
};

forgotPwd.init();
