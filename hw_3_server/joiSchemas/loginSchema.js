const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    username: Joi.string().min(3).max(30).required().messages({
        "string.min": 'Username should have a minimum length of 3.',
        "string.max": 'Username should have a maximum length of 30.',
        "any.required": "Username is required"
    }),
    password: Joi.string().min(5).max(30).required().messages({
        "string.min": 'Password should have a minimum length of 5.',
        "string.max": 'Password should have a maximum length of 30.',
        "any.required": "Password is required"
    }),
});