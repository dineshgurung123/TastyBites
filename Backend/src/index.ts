import express from "express";
import connectDB from "./config";

//Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
