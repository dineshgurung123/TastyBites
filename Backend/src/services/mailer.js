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
exports.sendEmail = void 0;
// mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
    },
});
// Verify the connection
transporter.verify((error, success) => {
    if (error) {
        console.log("Error setting up email transporter:", error);
    }
    else {
        console.log("Email Server is ready to take our messages");
    }
});
// Send email function
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, message }) {
    try {
        const info = yield transporter.sendMail({
            from: '"TastyBites" <no-reply@TastyBites>',
            to,
            subject,
            html: message,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    }
    catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
