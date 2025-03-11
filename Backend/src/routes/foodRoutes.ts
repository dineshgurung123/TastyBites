import { Router, Request, Response, NextFunction } from "express";
import { authenticationUser, isAdmin } from "../middlewares/authMiddleware"; // Correct import name

const router = Router();

router.get(
  "/",
  
  (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      message: 'Food data',
    });
  }
);

export default router;