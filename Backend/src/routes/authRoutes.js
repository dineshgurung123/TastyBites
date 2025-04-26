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
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/register", authMiddleware_1.authenticationUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.body.userType === "admin" && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userType) !== "admin") {
        res
            .status(403)
            .json({ message: "You do not have permission to assign admin role" });
        return;
    }
    try {
        yield (0, authController_1.registerUser)(req, res);
    }
    catch (error) {
        res.send(error);
        return;
    }
}));
router.post("/customerRegister", authController_1.registerUser);
router.get("/verify", authController_1.verifyUser);
router.post("/login", authController_1.loginUser);
router.post("/logout", authController_1.logoutUser);
exports.default = router;
