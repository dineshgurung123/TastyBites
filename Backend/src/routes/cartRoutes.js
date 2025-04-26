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
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const data = req.body;
        const result = yield (0, cartController_1.addCart)(data, userId);
        res.json(result);
    }
    catch (error) {
        res.send(error);
    }
}));
router.get("/", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const cartData = yield (0, cartController_1.getCart)(userId);
        if (!cartData) {
            res.status(400).send("Cart is empty");
            return;
        }
        res.status(200).json({ data: cartData });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.put("/", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const data = req.body;
        const updatedCart = yield (0, cartController_1.updateCart)(data, userId);
        res.status(200).json({ message: " Cart item updated" });
    }
    catch (error) {
        res.json(error);
    }
}));
router.delete("/", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const cart = yield (0, cartController_1.clearCart)(userId);
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json({ message: "Cart cleared successfully", cart });
    }
    catch (error) {
        console.log("hey");
        res.status(500).send(error);
    }
}));
router.delete("/:foodId", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { foodId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const cart = yield (0, cartController_1.deleteCartItem)(foodId, userId);
        res.send({ message: "successfully deleted cart", cart });
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = router;
