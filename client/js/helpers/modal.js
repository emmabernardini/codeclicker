const callback = {
  openSignInModal() {
    pages.profil.isActive = true;
    signInModal.style.display = "flex";
    // Empty input
    document.getElementById("identity").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login_error_info").textContent = "";
    signInOverlay.addEventListener("click", callback.closeAllModals);
  },

  openProfilModal() {
    pages.profil.isActive = true;
    profilModal.style.display = "flex";
    profilOverlay.addEventListener("click", callback.closeAllModals);
  },

  openSignUpModal() {
    callback.closeAllModals();
    signUpModal.style.display = "flex";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("register_error_info").textContent = "";
    signUpOverlay.addEventListener("click", callback.closeAllModals);
  },

  async openChallengeModal(event) {
    event.preventDefault();
    // Get the value of the input field
    const inputValue = promptInput.value.toUpperCase();
    promptInput.value = "";
    // Check if the input value is "Hello"
    if (inputValue === "YES") {
      if (!click.isLogged) {
        callback.openSignInModal();
        return;
      }
      if (click.last_challenge_id >= 8) {
        return;
      } else {
        challenge.info = await getChallenge.handleGetChallenge();
        challenge.init();
        challengeModal.style.display = "block";
        challengeOverlay.addEventListener("click", callback.closeAllModals);
      }
    } else if (inputValue === "HELP") {
      utils.displayManualPopUp();
    }
  },

  openMenuModal() {
    pages.menu.isActive = true;
    menuModal.style.display = "flex";
    menuOverlay.addEventListener("click", callback.closeAllModals);
  },

  openForgetPwdModal() {
    callback.closeAllModals();
    forgotPwdModal.style.display = "block";
    document.getElementById("identity-password-forget").value = "";
    forgotPwdOverlay.addEventListener("click", callback.closeAllModals);
  },

  openUpdateProfileModal() {
    callback.closeAllModals();
    userInfo.emptyFormElementsAndHideForm();
    document.getElementById("update_error_info").textContent = "";
    updateProfilModal.style.display = "flex";
    updateProfilOverlay.addEventListener("click", callback.closeAllModals);
  },

  closeAllModals() {
    // Gestion du swipe
    pages.profil.isActive = false;
    pages.menu.isActive = false;
    // Gestion du menu sur téléphone
    document
      .getElementById("menu_modal_mobile")
      .querySelector("[mobile_icon]").style.fill = "white";
    const modals = document.querySelectorAll("[modal]");
    for (const modal of modals) {
      modal.style.display = "none";
    }
  },
};

// Modal & bouton sign-in
const signInModal = document.getElementById("signin_modal");
const signInButton = document.getElementById("signin_modal_btn");
const signInOverlay = document.getElementById("signin_overlay");
signInButton.addEventListener("click", callback.openSignInModal);

// Modal & bouton profil
const profilModal = document.getElementById("profile_modal");
const profilButton = document.getElementById("profile_modal_btn");
const profilOverlay = document.getElementById("profile_overlay");
profilButton.addEventListener("click", callback.openProfilModal);

/*Mobile*/
const signInButton_Mobile = document.getElementById("signin_modal_mobile");
signInButton_Mobile.addEventListener("click", callback.openSignInModal);

// Modal & bouton sign-up (dans sign in)
const signUpModal = document.getElementById("signup_modal");
const signUpButton = document.getElementById("signup_modal_btn");
const signUpOverlay = document.getElementById("signup_overlay");
signUpButton.addEventListener("click", callback.openSignUpModal);

// Modal & bouton (yes) challenge
const challengeModal = document.getElementById("challenge_modal");
const challengeOverlay = document.getElementById("challenge_overlay");
const promptForm = document.getElementById("prompt-form");
const promptInput = document.getElementById("prompt-input-data");
promptForm.addEventListener("submit", callback.openChallengeModal);

// Modal & bouton Menu
const menuModal = document.getElementById("menu_modal");
const menuButton = document.getElementById("menu_modal_btn");
const menuOverlay = document.getElementById("menu_overlay");
menuButton.addEventListener("click", callback.openMenuModal);

//Modal & bouton Forgot Pwd
const forgotPwdModal = document.getElementById("pwd_forget_modal");
const forgotPwdButton = document.getElementById("pwd_forget_modal_btn");
const forgotPwdOverlay = document.getElementById("pwd_forget_overlay");
forgotPwdButton.addEventListener("click", callback.openForgetPwdModal);

// Modale Exp
const expOverlay = document.getElementById("exp_overlay");
expOverlay.addEventListener("click", callback.closeAllModals);

/*Mobile*/
const menuButton_Mobile = document.getElementById("menu_modal_mobile");
menuButton_Mobile.addEventListener("click", callback.openMenuModal);

// Boutons close button & clic en dehors de la modale
const close_btn = document.querySelectorAll("[close_button]");
for (const btn of close_btn) {
  btn.addEventListener("click", callback.closeAllModals);
}

// Profil
const profilButton_Mobile = document.getElementById("profile_modal_mobile");
profilButton_Mobile.addEventListener("click", callback.openProfilModal);

// UPDATE PROFIL
const updateProfilModal = document.getElementById("update_profile_modal");
const updateProfilButton = document.getElementById("update_profile_btn");
const updateProfilOverlay = document.getElementById("update_profile_overlay");
updateProfilButton.addEventListener("click", callback.openUpdateProfileModal);

// Marche à suivre en JS pour ajouter une modale :
// Sélectionner la modale, le bouton d'ouverture, et l'overlay de la nouvelle modale
// Créer le callback d'ouverture correspondant en se basant sur le code précédent
