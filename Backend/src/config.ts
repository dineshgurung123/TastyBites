import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoDb_URI = process.env.mongoDb_URI;
    console.log(mongoDb_URI);

    if (!mongoDb_URI) {
      throw new Error("mongoDb_URI does not exists");
    }
    await mongoose.connect(mongoDb_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
  }
};

export default connectDB;
