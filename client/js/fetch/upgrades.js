const upgradesData = {
  async getDataUpgrades() {
    try {
      const response = await fetch(`${utils.baseUrl}/upgrades`);

      if (!response.ok) throw new Error(response);

      result = await response.json();
      return result;
    } catch (error) {
      console.error(
        "Erreur lors de la recupération des données: Upgrades",
        error
      );
    }
  },
};
