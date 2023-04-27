class APIError extends Error {
  constructor(message, code) {
    super(message); // le super() appelle le constructeur du parent
    this.code = code;
  }
}

module.exports = APIError;
