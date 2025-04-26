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
exports.getUsersOrders = exports.makeOrder = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const order_model_1 = require("../models/order.model");
const makeOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            return "User ID is required";
        }
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return "Cart is empty";
        }
        const order = new order_model_1.Order({
            userId,
            items: cart.items,
            totalPrice: cart.total,
            status: "Pending",
        });
        yield order.save();
        // Remove the cart after successful order placement
        yield cart_model_1.default.findOneAndDelete({ userId });
        return "Order placed successfully";
    }
    catch (error) {
        return `Error: ${error}`;
    }
});
exports.makeOrder = makeOrder;
const getUsersOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Order.findOne({ userId });
        if (!order) {
            return "No orders made";
        }
        return order;
    }
    catch (error) {
        return error;
    }
});
exports.getUsersOrders = getUsersOrders;
