import express from "express";
import connectDB from "./config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import foodRoutes from "./routes/foodRoutes";
import dotenv from "dotenv";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/ordeRoutes";
import cors from "cors";

// Load environment variables
dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1);

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://tasty-bites-ten.vercel.app" 
];

app.use(
  cors({
    origin: (origin, callback) => {
    
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auths", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});