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
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const user_model_1 = __importDefault(require("../models/user.model"));
const mailer_1 = require("../services/mailer");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(400).send("User id is required");
            return;
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const email = user.email;
        const name = user.name;
        const order = yield (0, orderController_1.makeOrder)(userId);
        // 📨 Send order success email
        yield (0, mailer_1.sendEmail)({
            to: email,
            subject: "Order Successful - TastyBites",
            message: `<h2>Hi ${name},</h2><p>Your order has been placed successfully at <strong>TastyBites</strong>! 🍽️<br />We'll get it ready for you soon!</p>`,
        });
        res.status(201).json({ message: "Order placed successfully", order });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
router.get("/", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const order = yield (0, orderController_1.getUsersOrders)(userId);
        res.json({ data: order });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
exports.default = router;
