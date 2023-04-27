const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const debug = require("debug")("model-player");
const errorHandler = require("./error/errorHandler");

const auth = {
  // Used in login / register / refresh (?) to create token
  generateToken(id) {
    try {
      const payload = {
        id,
      };
      const options = { expiresIn: 60 * 60 * 4 }; //expires in 4hours
      const token = jwt.sign(payload, secret, options);

      return token;
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },

  // Used in every SecuredToken routes to check if the player is logged.
  verifyToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Token not provided" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: "Invalid token" });
        }
        req.player = decoded;
        next();
      });
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
  verifyTokenBoolean(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.json(false);
        }
        return res.json(true);
      });
    } catch (err) {
      debug(err);
      errorHandler.logError(err);
    }
  },
};

module.exports = auth;
