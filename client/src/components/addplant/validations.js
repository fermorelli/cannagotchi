import Joi from 'joi';

export const schema = Joi.object({
    plantName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .messages({
        'string.min': 'First name must contain at least 3 letters',
        'string.empty': 'This field is required',
        'string.pattern.base': 'Not a valid name'
    }),
    genetic: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .messages({
        'string.min': 'Last name must contain at least 3 letters',
        'string.empty': 'This field is required',
        'string.pattern.base': 'Not a valid name'
    }),
    date: Joi.date()
    .required()
    .messages({
        'date.empty': 'This field is required',
    }),
    growMode: Joi.string()
    .min(3)
    .max(10)
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .required()
    .messages({
        'string.min': 'Password must contain at least 8 digits',
        'string.max': `Password can't contain more than 10 digits`,
        'string.pattern.base': 'Password should contain at least 1 number and at least 1 letter',
        'string.empty': 'This field is required'
    })
})