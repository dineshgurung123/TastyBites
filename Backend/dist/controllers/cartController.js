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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItem = exports.clearCart = exports.updateCart = exports.getCart = exports.addCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const cartValidation_1 = require("../validators/cartValidation");
const addCart = (cartItem, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = cartValidation_1.cartValidation.validate(cartItem);
    if (error) {
        return error;
    }
    const { foodId, name, price, quantity } = cartItem;
    let cart = yield cart_model_1.default.findOne({ userId });
    if (!cart) {
        cart = new cart_model_1.default({ userId, items: [], total: 0 });
    }
    const existingCartItem = cart.items.find((item) => item.foodId.toString() === foodId.toString());
    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    }
    else {
        cart.items.push({ foodId, name, price, quantity });
    }
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    yield cart.save();
    return cart;
});
exports.addCart = addCart;
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    if (!cart) {
        return;
    }
    return cart;
});
exports.getCart = getCart;
const updateCart = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            return;
        }
        const item = cart.items.find((item) => item.foodId.toString() === data.foodId.toString());
        if (!item) {
            return;
        }
        item.quantity = data.quantity;
        const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        yield cart.save();
        return cart;
    }
    catch (error) {
        return error;
    }
});
exports.updateCart = updateCart;
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_model_1.default.findOneAndDelete({ userId });
        return cart_model_1.default;
    }
    catch (error) {
        return error;
    }
});
exports.clearCart = clearCart;
const deleteCartItem = (foodId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield cart_model_1.default.findOne({ userId });
        if (!cart) {
            return null;
        }
        cart.items = cart.items.filter((item) => item.foodId.toString() !== (foodId === null || foodId === void 0 ? void 0 : foodId.toString()));
        cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cart.save();
        return cart;
    }
    catch (error) {
        return error;
    }
});
exports.deleteCartItem = deleteCartItem;
