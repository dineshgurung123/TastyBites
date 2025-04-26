"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const orderSchema = new mongoose_2.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
            foodId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Food", required: true },
            name: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: String, required: true }
        }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Processing", "Delivered", "Cancelled"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});
exports.Order = mongoose_1.default.model("Order", orderSchema);
