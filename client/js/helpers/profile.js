const userInfo = {
  usernameElement: document.getElementById("update_profile_username"),
  newUsernameInput: document.getElementById("newUsernameInput"),
  editUsernameButton: document.getElementById("edit_username_button"),
  mailElement: document.getElementById("update_profile_mail"),
  newMailInput: document.getElementById("newMailInput"),
  editMailButton: document.getElementById("edit_mail_button"),
  editPasswordButton: document.getElementById("edit_password_button"),
  confirmPasswordElement: document.getElementById("update_profile_password"),
  confirmPasswordInput: document.getElementById("confirmPasswordInput"),
  confirmPasswordLabel: document.getElementById("confirm_password_label"),
  newPasswordElement: document.getElementById("update_new-password"),
  newPasswordInput: document.getElementById("newPasswordInput"),
  confirmNewPasswordElement: document.getElementById(
    "update_confirm-new-password"
  ),
  confirmNewPasswordInput: document.getElementById("confirmNewPasswordInput"),
  updateSubmitButton: document.getElementById("updateSubmit"),

  displayUsernameForm() {
    userInfo.usernameElement.style.display = "none";
    userInfo.newUsernameInput.style.display = "flex";
    userInfo.updateSubmitButton.style.display = "flex";
  },

  hideUsernameForm() {
    userInfo.usernameElement.style.display = "flex";
    userInfo.newUsernameInput.style.display = "none";
    userInfo.updateSubmitButton.style.display = "none";
  },

  displayMailForm() {
    userInfo.mailElement.style.display = "none";
    userInfo.newMailInput.style.display = "flex";
    userInfo.confirmPasswordLabel.textContent = "Confirmer votre mot de passe";
    userInfo.confirmPasswordInput.style.display = "flex";
    userInfo.editPasswordButton.style.display = "none";
    userInfo.confirmPasswordElement.style.display = "none";
    userInfo.updateSubmitButton.style.display = "flex";
  },

  hideMailForm() {
    userInfo.mailElement.style.display = "flex";
    userInfo.newMailInput.style.display = "none";
    userInfo.confirmPasswordLabel.textContent = "Mot de passe";
    userInfo.confirmPasswordInput.style.display = "flex";
    userInfo.confirmPasswordElement.style.display = "flex";
    userInfo.editPasswordButton.style.display = "block";
    userInfo.confirmNewPasswordElement.style.display = "none";
    userInfo.confirmPasswordInput.style.display = "none";
    userInfo.updateSubmitButton.style.display = "none";
  },

  displayPasswordForm() {
    userInfo.confirmPasswordLabel.textContent =
      "Confirmer l'ancien mot de passe";
    userInfo.confirmPasswordElement.style.display = "none";
    userInfo.confirmPasswordInput.style.display = "flex";
    userInfo.newPasswordElement.style.display = "flex";
    userInfo.confirmNewPasswordElement.style.display = "flex";
    userInfo.updateSubmitButton.style.display = "flex";
  },

  hidePasswordForm() {
    userInfo.confirmPasswordLabel.textContent = "Mot de passe";
    userInfo.confirmPasswordElement.style.display = "flex";
    userInfo.confirmPasswordInput.style.display = "none";
    userInfo.newPasswordElement.style.display = "none";
    userInfo.confirmNewPasswordElement.style.display = "none";
    userInfo.updateSubmitButton.style.display = "none";
  },

  handleUserProfile() {
    userInfo.usernameElement.textContent = click.username;
    userInfo.mailElement.textContent = click.email;
    userInfo.newUsernameInput.placeholder = click.username;
    userInfo.newMailInput.placeholder = click.email;

    userInfo.editUsernameButton.addEventListener("click", () => {
      if (userInfo.usernameElement.style.display === "none") {
        userInfo.hideUsernameForm();
      } else {
        userInfo.hideMailForm();
        userInfo.hidePasswordForm();
        userInfo.emptyFormElements();
        userInfo.displayUsernameForm();
      }
    });

    userInfo.editMailButton.addEventListener("click", () => {
      if (userInfo.mailElement.style.display === "none") {
        userInfo.hideMailForm();
      } else {
        userInfo.hideUsernameForm();
        userInfo.hidePasswordForm();
        userInfo.emptyFormElements();
        userInfo.displayMailForm();
      }
    });

    userInfo.editPasswordButton.addEventListener("click", () => {
      if (userInfo.newPasswordElement.style.display === "flex") {
        userInfo.hidePasswordForm();
      } else {
        userInfo.hideUsernameForm();
        userInfo.hideMailForm();
        userInfo.emptyFormElements();
        userInfo.displayPasswordForm();
      }
    });
  },

  emptyFormElements() {
    userInfo.newUsernameInput.value = "";
    userInfo.newMailInput.value = "";
    userInfo.confirmPasswordInput.value = "";
    userInfo.newPasswordInput.value = "";
    userInfo.confirmNewPasswordInput.value = "";
  },

  emptyFormElementsAndHideForm() {
    userInfo.emptyFormElements();
    // Cacher tous les input
    userInfo.newUsernameInput.style.display = "none";
    userInfo.newMailInput.style.display = "none";
    userInfo.confirmPasswordInput.style.display = "none";
    userInfo.newPasswordElement.style.display = "none";
    userInfo.confirmNewPasswordElement.style.display = "none";
    // Faire apparaitre toutes les spans
    userInfo.mailElement.style.display = "flex";
    userInfo.usernameElement.style.display = "flex";
    userInfo.confirmPasswordLabel.textContent = "Mot de passe";
    userInfo.confirmPasswordElement.style.display = "flex";
    userInfo.editPasswordButton.style.display = "flex";
    userInfo.updateSubmitButton.style.display = "none";
  },
  handleNewData(info) {
    click.email = info.email;
    click.username = info.username;
    // Et les placeholders des input
    userInfo.newMailInput.placeholder = click.email;
    userInfo.newUsernameInput.placeholder = click.username;
    document.getElementById("profile_modal_btn").textContent = click.username;
    // Mettre à jour le contenu de username et email avec les data
    userInfo.mailElement.textContent = click.email;
    userInfo.usernameElement.textContent = click.username;
    userInfo.emptyFormElementsAndHideForm();
  },
};
