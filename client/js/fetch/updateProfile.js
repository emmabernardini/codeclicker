const updateProfil = {
  init() {
    updateProfil.submit();
  },
  submit() {
    document
      .getElementById("update")
      .addEventListener("submit", updateProfil.handleUpdateForm);
  },
  async handleUpdateForm(event) {
    event.preventDefault();

    if (!localStorage.getItem("token")) {
      callback.closeAllModals();
      return;
    }

    const updateFormElem = event.target;
    const updateFormDataObject = new FormData(updateFormElem);
    const updateData = Object.fromEntries(updateFormDataObject);
    const isValid = verifyFormInfo.verifyUpdateInfo(updateData);
    if (isValid === false) return;
    try {
      const response = await fetch(`${utils.baseUrl}/player`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      });
      utils.displayMessage(
        "update_error_info",
        "Modifications bien effectuées !"
      );
      const data = await response.json();

      if (data.message) {
        utils.displayMessage("update_error_info", data.message);
        userInfo.emptyFormElementsAndHideForm();
      } else {
        userInfo.handleNewData(data);
      }
    } catch (error) {
      console.error(error);
      userInfo.emptyFormElementsAndHideForm();
    }
  },
};

updateProfil.init();
