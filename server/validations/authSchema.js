const Joi = require('@hapi/joi')

const signupSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required().min(6),
    password: Joi.string().min(6).max(32).required(),
    role: Joi.string().valid('user', 'admin', 'wizardCreator')
})

const signinSchema = Joi.object({
    email: Joi.string().email().required().min(6),
    password: Joi.string().min(6).max(32).required(),
})

const updateDetailsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required().min(6),
    password: Joi.string().min(6).max(32).required(),
    role: Joi.string().valid('user', 'admin', 'wizardCreator')
})

module.exports = {signupSchema, signinSchema, updateDetailsSchema}