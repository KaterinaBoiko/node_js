const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    type: Joi.object().keys({
        name: Joi.string().valid('sprinter', 'small straight', 'large straight').lowercase(),
        dimensions: Joi.object({
            width: Joi.number().positive().max(700).required(),
            length: Joi.number().positive().max(350).required(),
            height: Joi.number().positive().max(200).required()
        }),
        payload: Joi.number().positive().max(4000),
    }),
    created_by: Joi.string(),
    assigned_by: Joi.string(),
    status: Joi.object({
        abbr: Joi.string().valid('is', 'ol').lowercase(),
        status: Joi.string().valid('in service', 'on load').lowercase(),
    }),
});
