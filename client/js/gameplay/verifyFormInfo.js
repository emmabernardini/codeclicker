const verifyFormInfo = {
  regexPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  regexEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

  verifyForgotPwd(info) {
    if (!info.email.trim()) {
      utils.displayMessage("forgot_pwd_info", "L'email n'a pas été rempli");
      return false;
    }

    if (!verifyFormInfo.regexEmail.test(info.email)) {
      utils.displayMessage(
        "forgot_pwd_info",
        "Votre adresse email est invalide"
      );
      return false;
    }
    return true;
  },
  verifyRegisterInfo(info) {
    if (
      !info.email.trim() ||
      !info.password.trim() ||
      !info.confirmPassword.trim() ||
      !info.username.trim()
    ) {
      utils.displayMessage(
        "register_error_info",
        "Tous les champs n'ont pas été fournis"
      );
      return false;
    }

    if (info.password !== info.confirmPassword) {
      utils.displayMessage(
        "register_error_info",
        "Le mot de passe et sa confirmation ne correspondent pas"
      );
      return false;
    }

    // if(!verifyFormInfo.regexPassword.test(info.password)){
    //     utils.displayMessage(
    //         "Votre mot de passe est invalide, il doit contenir une minuscule, une majuscule, un chiffre, un caractère special et 8 caractères minimum"
    //     );
    //     return;
    // }

    if (!verifyFormInfo.regexEmail.test(info.email)) {
      utils.displayMessage(
        "register_error_info",
        "Votre adresse email est invalide"
      );
      return false;
    }

    return true;
  },
  verifyLogInInfo(info) {
    if (!info.identity.trim() || !info.password.trim()) {
      utils.displayMessage(
        "login_error_info",
        "Tous les champs n'ont pas été fournis"
      );
      return false;
    }

    return true;
  },
  verifyUpdateInfo(info) {
    if (info.newMail) {
      if (!info.newMail.trim() || !info.confirmPassword.trim()) {
        utils.displayMessage(
          "update_error_info",
          "Tous les champs n'ont pas été fournis"
        );
        return false;
      }

      if (!verifyFormInfo.regexEmail.test(info.newMail)) {
        utils.displayMessage(
          "update_error_info",
          "Votre adresse email est invalide"
        );
        return false;
      }
    } else if (
      info.newPassword &&
      info.confirmPassword &&
      info.confirmNewPassword
    ) {
      if (
        !info.newPassword.trim() ||
        !info.confirmPassword.trim() ||
        !info.confirmNewPassword.trim()
      ) {
        utils.displayMessage(
          "update_error_info",
          "Tous les champs n'ont pas été fournis"
        );
        return false;
      }
      if (info.newPassword.trim() === info.confirmPassword.trim()) {
        utils.displayMessage(
          "update_error_info",
          "Le nouveau mot de passe ne peut pas être le même que l'ancien"
        );
        return false;
      }
      if (info.newPassword.trim() !== info.confirmNewPassword.trim()) {
        utils.displayMessage(
          "update_error_info",
          "Le nouveau mot de passe et sa confirmation sont différents"
        );
        return false;
      }
      // if(!verifyFormInfo.regexPassword.test(info.newPassword)){
      //     utils.displayMessage("update_error_info",
      //         "Votre mot de passe est invalide, il doit contenir une minuscule, une majuscule, un chiffre, un caractère special et 8 caractères minimum"
      //     );
      //     return;
      // }
    }
    return true;
  },
};
