const resetSave = {
  init() {
    resetSave.submit();
  },
  submit() {
    //! Le reset btn n'existe plus, il reviendra dans la prochaine modale
    document
      .getElementById("restart_save_btn")
      .addEventListener("click", resetSave.handleResetSave);
  },
  async handleResetSave() {
    const isConfirmed = confirm(
      "Voulez-vous vraiment réinitialiser votre sauvegarde ?"
    );
    if (!isConfirmed) {
      callback.closeAllModals();
      return;
    }

    try {
      const response = await fetch(`${utils.baseUrl}/reset`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(response);
      await response.json();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

    callback.closeAllModals();
  },
};

resetSave.init();
