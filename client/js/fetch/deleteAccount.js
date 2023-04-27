const deleteAccount = {
  init() {
    deleteAccount.submit();
  },
  submit() {
    document
      .getElementById("delete_account_btn")
      .addEventListener("click", deleteAccount.handleDeleteAccount);
  },
  async handleDeleteAccount() {
    const isConfirmed = confirm(
      "Voulez-vous vraiment supprimer votre compte ?"
    );
    if (!isConfirmed) {
      callback.closeAllModals();
      return;
    }

    try {
      const response = await fetch(`${utils.baseUrl}/player`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(response);
      await response.json();
      localStorage.removeItem("token");
      notLogged.handleNotLogged();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

    callback.closeAllModals();
  },
};

deleteAccount.init();
