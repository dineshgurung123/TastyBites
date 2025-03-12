import joi from "joi";

export const cartValidation = joi.object({

foodId: joi.string().required(),
name : joi.string().min(2).required(),
price: joi.number().required(),
quantity : joi.number().required()

}).required()