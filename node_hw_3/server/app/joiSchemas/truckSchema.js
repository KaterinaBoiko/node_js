const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    type: Joi.string().min(3).max(30).required(),
    created_by: Joi.string().required(),
    assigned_by: Joi.string(),
    status: Joi.string().valid('is', 'ol').lowercase()
});
