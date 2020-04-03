const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    type: Joi.string().valid('sprinter', 'small straight', 'large straight').lowercase(),
    created_by: Joi.string(),
    assigned_by: Joi.string(),
    status: Joi.string().valid('is', 'ol').lowercase()
});