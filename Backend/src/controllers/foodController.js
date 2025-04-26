"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleFood = exports.deleteFood = exports.updateFood = exports.addFood = exports.getFood = void 0;
const food_model_1 = require("../models/food.model");
const foodValidation_1 = require("../validators/foodValidation");
const getFood = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield food_model_1.Food.find();
});
exports.getFood = getFood;
const addFood = (food) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = foodValidation_1.foodValidation.validate(food);
        if (error) {
            return error;
        }
        const foods = yield food_model_1.Food.create(food);
        foods.save();
        return foods;
    }
    catch (error) {
        return error;
    }
});
exports.addFood = addFood;
const updateFood = (id, food) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFood = yield food_model_1.Food.findByIdAndUpdate(id, {
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        imageUrl: food.imageUrl
    }, { new: true });
    return exports.updateFood;
});
exports.updateFood = updateFood;
const deleteFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return food_model_1.Food.findByIdAndDelete(id);
});
exports.deleteFood = deleteFood;
const getSingleFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield food_model_1.Food.findById(id);
});
exports.getSingleFood = getSingleFood;
