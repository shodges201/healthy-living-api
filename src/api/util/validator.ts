import Joi from 'joi';
import { Cholesterol } from '../types/Cholesterol';

export const validateCholesterol = (cholesterol: Cholesterol) => {
    return Joi.object({
        level: Joi.number().integer().required(),
        date: Joi.date().required()
    }).validate(cholesterol);
} 

export const userValidator = Joi.object({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required()
})

export const heartRateValidator = Joi.object({
    rate: Joi.number().integer().required(),
    date: Joi.date().required()
})