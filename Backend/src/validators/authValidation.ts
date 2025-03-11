import joi from 'joi'


export const registerValidation = joi.object({

    name : joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    userType: joi.string().required()

})


export const loginValidation = joi.object({

email : joi.string().email().required(),
password: joi.string().required()

})