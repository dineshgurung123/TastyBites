import { Router, Request, Response } from "express";
import Cart from "../models/cart.model";
import {
  addCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCart,
} from "../controllers/cartController";
import { authenticationUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const data = req.body;
  
    const result = await addCart(data, userId);

    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const cartData = await getCart(userId);
    if (!cartData) {
      res.status(400).send("Cart is empty");
      return;
    }

    res.status(200).json({ data: cartData });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/", authenticationUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const data = req.body;
    const updatedCart = await updateCart(data, userId);

    res.status(200).json({ message: " Cart item updated" });
  } catch (error) {
    res.json(error);
  }
});

router.delete(
  "/",
  authenticationUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      const cart = await clearCart(userId);

      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }

      res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (error) {
      console.log("hey");
      res.status(500).send(error);
    }
  }
);

router.delete(
  "/:foodId",
  authenticationUser,
  async (req: Request, res: Response) => {
    try {
      const { foodId } = req.params;
      const userId = req.user?.userId;

      const cart = await deleteCartItem(foodId, userId);

      res.send({ message: "successfully deleted cart", cart });
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
