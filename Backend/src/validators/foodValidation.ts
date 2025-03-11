import joi from "joi";

export const foodValidation = joi.object({

name : joi.string().required(),
description : joi.string().required(),
price : joi.number().required(),
category : joi.string().required(),
imageUrl : joi.string().required()


})