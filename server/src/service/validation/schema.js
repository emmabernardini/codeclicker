const Joi = require("joi");

const registerObjectSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp("^[\\w-.]+@([\\w-]+.)+[\\w-]{2,4}$"))
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  exp: Joi.number().unsafe().required(),
  click_counter: Joi.number().unsafe().required(),
  "g-recaptcha-response": Joi.string().required(),
});

const loginObjectSchema = Joi.object({
  identity: Joi.string().required(),
  password: Joi.string().required(),
});

const simpleSaveObjectSchema = Joi.object({
  exp: Joi.number().unsafe().required(),
  click_counter: Joi.number().unsafe().required(),
});

const firstUpgradeBuyObjectSchema = Joi.object({
  exp: Joi.number().unsafe().required(),
  click_counter: Joi.number().unsafe().required(),
  click_value: Joi.number().unsafe().required(),
  passive_value: Joi.number().unsafe().required(),
  player_has_upgrade: Joi.array().required(),
});

const nextUpgradeBuyObjectSchema = Joi.object({
  exp: Joi.number().unsafe().required(),
  click_counter: Joi.number().unsafe().required(),
  click_value: Joi.number().unsafe().required(),
  passive_value: Joi.number().unsafe().required(),
  player_has_upgrade: Joi.array().items(Joi.object()).has(Joi.object()),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp("^[\\w-.]+@([\\w-]+.)+[\\w-]{2,4}$"))
    .required(),
});

module.exports = {
  registerObjectSchema,
  loginObjectSchema,
  simpleSaveObjectSchema,
  firstUpgradeBuyObjectSchema,
  nextUpgradeBuyObjectSchema,
  forgotPasswordSchema,
};
