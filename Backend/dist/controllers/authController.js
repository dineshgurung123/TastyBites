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
exports.logoutUser = exports.verifyUser = exports.loginUser = exports.registerUser = void 0;
const authValidation_1 = require("../validators/authValidation");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../services/mailer"); // Adjust the path if needed
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, userType } = req.body;
        // Validate request
        const { error } = authValidation_1.registerValidation.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        // Check for existing user
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create and save new user
        const newUser = yield user_model_1.default.create({
            name,
            email,
            password: hashPassword,
            userType,
        });
        // 📨 Send welcome email
        yield (0, mailer_1.sendEmail)({
            to: email,
            subject: "Welcome to TastyBites!",
            message: `<h2>Hi ${name},</h2><p>Thanks for registering at <strong>TastyBites</strong>! 🍔<br />Enjoy exploring our platform.</p>`,
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            res.status(400).json({ message: "Password does not match" });
            return;
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Set cookie
        res.cookie("AuthToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3600000, // 1 hour
        });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.loginUser = loginUser;
// Verify User
const verifyUser = (req, res) => {
    const token = req.cookies.AuthToken;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ userType: decoded.userType });
    }
    catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.verifyUser = verifyUser;
// Logout User
const logoutUser = (req, res) => {
    res.cookie("AuthToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logoutUser = logoutUser;
