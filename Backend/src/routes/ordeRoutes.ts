import express, { Router, Request, Response } from "express";
import { getUsersOrders, makeOrder } from "../controllers/orderController";
import { authenticationUser } from "../middlewares/authMiddleware";
import User from "../models/user.model";
import { sendEmail } from "../services/mailer";

const router = Router();

router.post("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(400).send("User id is required");
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const email = user.email;
    const name = user.name;

    const order = await makeOrder(userId);

    // 📨 Send order success email
    await sendEmail({
      to: email,
      subject: "Order Successful - TastyBites",
      message: `<h2>Hi ${name},</h2><p>Your order has been placed successfully at <strong>TastyBites</strong>! 🍽️<br />We'll get it ready for you soon!</p>`,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const order = await getUsersOrders(userId);

    res.json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
