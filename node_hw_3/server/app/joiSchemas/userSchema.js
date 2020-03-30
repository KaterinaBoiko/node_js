const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    password: Joi.string().required()
});
