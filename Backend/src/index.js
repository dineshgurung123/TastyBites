"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const ordeRoutes_1 = __importDefault(require("./routes/ordeRoutes"));
const cors_1 = __importDefault(require("cors"));
//Database connection
(0, config_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
dotenv_1.default.config();
//Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
//Routes
app.use("/api/auths", authRoutes_1.default);
app.use("/api/foods", foodRoutes_1.default);
app.use("/api/carts", cartRoutes_1.default);
app.use("/api/orders", ordeRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
