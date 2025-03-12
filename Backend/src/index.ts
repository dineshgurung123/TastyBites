import express from "express";
import connectDB from "./config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import foodRoutes from "./routes/foodRoutes";
import dotenv from "dotenv";
import cartRoutes from "./routes/cartRoutes";

//Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auths", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
