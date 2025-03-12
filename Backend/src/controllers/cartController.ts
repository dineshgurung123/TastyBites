import { error } from "console";
import Cart, { CartItem } from "../models/cart.model";
import { cartValidation } from "../validators/cartValidation";

export const addCart = async (cartItem: CartItem, userId?: string) => {
 
  
  const {error} = cartValidation.validate(cartItem);
console.log(error)
  if (error) {
    return error;
  }

  const { foodId, name, price, quantity } = cartItem;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [], total: 0 });
  }

  const existingCartItem = cart.items.find(
    (item) => item.foodId.toString() === foodId.toString()
  );

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    cart.items.push({ foodId, name, price, quantity });
  }

  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

export const getCart = async () => {
  return await Cart.find();
};
