import express from "express";
import connectDB from "./config";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes'

//Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(cookieParser())


//Routes
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
