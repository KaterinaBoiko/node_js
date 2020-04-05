const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    name: Joi.string().allow(null).min(2).max(30).messages({
        "string.min": 'Name should have a minimum length of 2.',
        "string.max": 'Name should have a maximum length of 30.'
    }),
    username: Joi.string().min(3).max(30).messages({
        "string.min": 'Username should have a minimum length of 3.',
        "string.max": 'Username should have a maximum length of 30.'
    }),
    email: Joi.string().email().required().messages({
        "string.email": 'Email is not valid.',
        "any.required": 'Email is required.'
    }),
    password: Joi.string().min(5).max(30).messages({
        "string.min": 'Password should have a minimum length of 5.',
        "string.max": 'Password should have a maximum length of 30.'
    }),
    role: Joi.string(),
});