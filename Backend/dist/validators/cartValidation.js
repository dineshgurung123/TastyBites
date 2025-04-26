"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cartValidation = joi_1.default.object({
    foodId: joi_1.default.string().required(),
    name: joi_1.default.string().min(2).required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required()
}).required();
