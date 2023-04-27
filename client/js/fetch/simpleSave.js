const simpleSave = {
  init() {
    simpleSave.submit();
  },
  submit() {
    //! Le save btn n'existe plus, il reviendra dans la prochaine modale
    document
      .getElementById("save_btn")
      .addEventListener("click", simpleSave.saveAndHandleDom);
  },
  saveAndHandleDom() {
    simpleSave.handleSimpleSaveAction();
    utils.disableSaveBtn();
    callback.closeAllModals();
  },
  async handleSimpleSaveAction() {
    // Plugger les informations du front : quantité d'exp, nombre de clic (via le player object).
    const info = { exp: click.score, click_counter: click.click };

    try {
      const response = await fetch(`${utils.baseUrl}/save`, {
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
      console.log(json);
      simpleSave.setTerminalSaveInfo();
    } catch (error) {
      console.log(error);
    }
  },
  setTerminalSaveInfo() {
    // Display save message on terminal
    document.getElementById("save_message").style.display = "block";
    setTimeout(() => {
      document.getElementById("save_message").style.display = "none";
    }, 10000);
  },
};

simpleSave.init();
