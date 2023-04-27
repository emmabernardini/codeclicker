const getPlayerInfo = {
  async getPlayerObject() {
    try {
      const response = await fetch(`${utils.baseUrl}/player`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(response);

      const playerObject = await response.json();
      return playerObject;
    } catch (error) {
      console.error(error);
    }
  },
};
