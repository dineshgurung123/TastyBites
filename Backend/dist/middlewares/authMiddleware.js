"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticationUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationUser = (req, res, next) => {
    const token = req.cookies.AuthToken;
    console.log(token);
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            userType: decoded.userType
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid authToken" });
    }
};
exports.authenticationUser = authenticationUser;
// Admin-only middleware
const isAdmin = (req, res, next) => {
    var _a, _b;
    console.log("here", (_a = req.user) === null || _a === void 0 ? void 0 : _a.userType);
    if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.userType) !== "admin") {
        res.status(403).json({ message: "Forbidden: only admins can access this" });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
