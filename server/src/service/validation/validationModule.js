const errorHandler = require("../error/errorHandler");
const {
  registerObjectSchema,
  loginObjectSchema,
  simpleSaveObjectSchema,
  firstUpgradeBuyObjectSchema,
  nextUpgradeBuyObjectSchema,
  forgotPasswordSchema,
} = require("./schema");

const validationModule = {
  /**
   * Valide un schéma vis à vis d'une clef au niveau de la requête (req[key])
   * @param {object} schema schema issu du module Joi
   * @param {string} key  ici est attendu "query", "body" ou "params"
   * @error renvoie une erreur 500
   * @returns {} next()
   */

  validateRegister(req, res, next) {
    const { error } = registerObjectSchema.validate(req.body);
    if (error) {
      errorHandler._400(req);
    } else {
      next();
    }
  },

  validateLogin(req, res, next) {
    const { error } = loginObjectSchema.validate(req.body);
    if (error) {
      errorHandler._400(req);
    } else {
      next();
    }
  },

  validateSimpleSave(req, res, next) {
    const { error } = simpleSaveObjectSchema.validate(req.body);
    if (error) {
      errorHandler._400(req);
    } else {
      next();
    }
  },

  validateFirstBuy(req, res, next) {
    const { error } = firstUpgradeBuyObjectSchema.validate(req.body);
    if (error) {
      errorHandler._400(req);
    } else {
      next();
    }
  },

  validateNextBuy(req, res, next) {
    const { error } = nextUpgradeBuyObjectSchema.validate(req.body);
    if (error) {
      errorHandler._400(req);
    } else {
      next();
    }
  },

  validateForgotPassword(req, res, next) {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) {
      errorHandler._400(req);
    } else {
      next();
    }
  },

  validateUpdateProfile(req, res, next) {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      errorHandler._500(req);
    } else {
      next();
    }
  },
};

module.exports = validationModule;
