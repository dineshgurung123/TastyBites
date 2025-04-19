import { Request, Response } from "express";
import { registerValidation } from "../validators/authValidation";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

// Register User
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, userType } = req.body;

    // Validate request
    const { error } = registerValidation.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      userType,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "Password does not match" });
      return;
    }

    // Generate token
    const token = Jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Set cookie
    res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Verify User (check if logged in and return role/type)
export const verifyUser = (req: Request, res: Response): void => {
  const token = req.cookies.AuthToken;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      userType: string;
    };

    res.status(200).json({ userType: decoded.userType });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Logout User
export const logoutUser = (req: Request, res: Response): void => {
  res.cookie("AuthToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
