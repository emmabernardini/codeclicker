const verifyToken = {
  async handleTokenVerification() {
    if (!localStorage.getItem("token")) return false;

    try {
      const response = await fetch(`${utils.baseUrl}/token`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(response);

      const result = await response.json();

      if (result === false) {
        // Si le token n'est pas bon, autant le virer
        localStorage.removeItem("token");
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};
