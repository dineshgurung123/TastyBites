import express, { Request, Response, NextFunction, Router } from "express";
import {
  loginUser,
  logoutuser,
  registerUser,
} from "../controllers/authController";
import { authenticationUser } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/register",
  authenticationUser,
  async (req: Request, res: Response) => {
    if (req.body.userType === "admin" && req.user?.userType !== "admin") {
      
      res
        .status(403)
        .json({ message: "You do not have permission to assign admin role" });
      return;
    }

    try {
      await registerUser(req, res);
    } catch (error) {
      res.send(error);
    
      return;
    }
  }
);


router.post("/customerRegister", registerUser)
router.post("/login", loginUser);
router.post("/logout", logoutuser);

export default router;
