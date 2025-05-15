import { Request, Response } from "express";
import { registerValidation } from "../validators/authValidation";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { sendEmail } from "../services/mailer";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, userType } = req.body;
    const { error } = registerValidation.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      userType,
    });
    await sendEmail({
      to: email,
      subject: "Welcome to TastyBites!",
      message: `<h2>Hi ${name},</h2><p>Thanks for registering at <strong>TastyBites</strong>! 🍔<br />Enjoy exploring our platform.</p>`,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

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
    const token = Jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  res.cookie("AuthToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

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