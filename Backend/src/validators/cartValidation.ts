import joi from "joi";

export const cartValidation = joi.object({

foodId: joi.string().required(),
name : joi.string().min(10).required(),
price: joi.number().min(10).required(),
quantity : joi.number().required()

}).required()