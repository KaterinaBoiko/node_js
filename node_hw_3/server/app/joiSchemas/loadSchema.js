const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    logs: Joi.array().items(
        Joi.object({
            message: Joi.string(),
            time: Joi.date()
        })),
    created_by: Joi.string(),
    assigned_by: Joi.string(),
    status: Joi.string().valid('new', 'posted', 'assigned', 'shipped').lowercase(),
    state: Joi.string().valid('en route to pick up', 'arrived to pick up', 'en route to delivery', 'arrived to delivery').lowercase(),
    dimensions: Joi.object({
        width: Joi.number().positive().max(700),
        length: Joi.number().positive().max(350),
        height: Joi.number().positive().max(200)
    }),
    payload: Joi.number().positive().max(4000)
})
