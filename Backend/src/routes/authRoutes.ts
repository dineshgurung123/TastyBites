import express, { Router } from "express";
import { loginUser, logoutuser, registerUser } from "../controllers/authController";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutuser);

export default router;
