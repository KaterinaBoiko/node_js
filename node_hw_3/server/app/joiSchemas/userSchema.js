const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    name: Joi.string().min(3).max(30).messages({
        "string.min": 'Name should have a minimum length of 3.',
        "string.max": 'Name should have a maximum length of 30.'
    }),
    username: Joi.string().min(3).max(30).messages({
        "string.min": 'Username should have a minimum length of 3.',
        "string.max": 'Username should have a maximum length of 30.'
    }),
    email: Joi.string().email().message('Email is not valid.'),
    password: Joi.string()
});