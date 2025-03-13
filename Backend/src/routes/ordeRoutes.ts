import express, { Router, Request, Response } from "express";
import { getUsersOrders, makeOrder } from "../controllers/orderController";
import { authenticationUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.send("User id is required");
    }

    const order = await makeOrder(userId);

    res.send({ message: order });
  } catch (error) {
    res.send(error);
  }
});

router.get("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
  
    const order = await getUsersOrders(userId);

    res.json({ data: order });
  } catch (error) {
    res.send(error);
  }
});





export default router;
