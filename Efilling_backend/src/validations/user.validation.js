const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    mobileNo: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    address: Joi.string().required(),
    roles: Joi.string().required()
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    login_type: Joi.string().required(),
  }),
};


module.exports = {
  register,
  login
};
