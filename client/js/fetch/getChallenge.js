const getChallenge = {
  async handleGetChallenge() {
    try {
      const response = await fetch(`${utils.baseUrl}/challenge`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(response);
      const challenge = await response.json();
      return challenge;
    } catch (error) {
      console.error(error);
    }
  },
};
