import Joi from 'joi';

export const schema = Joi.object({
    plantName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .messages({
        'string.min': 'Plant name must contain at least 3 letters',
        'string.empty': 'This field is required',
        'string.pattern.base': 'Not a valid name'
    }),
    genetic: Joi.string()
    .min(3)
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .messages({
        'string.min': 'Genetics must contain at least 3 letters',
        'string.empty': 'This field is required',
        'string.pattern.base': 'Not a valid name'
    }),
    growMode: Joi.string()
    .required()
    .messages({
        'string.empty': 'This field is required'
    }),
    date: Joi.date()
    .required()
    .messages({
        'date.empty': 'This field is required',
    }),
    auto: Joi.boolean()
    .required()
})