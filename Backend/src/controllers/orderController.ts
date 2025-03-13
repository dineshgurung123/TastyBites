import Cart from "../models/cart.model";
import { Order } from "../models/order.model";

export const makeOrder = async (userId?: string) => {
  try {
    if (!userId) {
      return "User ID is required";
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return "Cart is empty";
    }

    const order = new Order({
      userId,
      items: cart.items,
      totalPrice: cart.total,
      status: "Pending",
    });

    await order.save();

    // Remove the cart after successful order placement
    await Cart.findOneAndDelete({ userId });

    return "Order placed successfully";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const getUsersOrders = async (userId ?: string ) => {
  
   try {

     const order = await Order.findOne({userId})

     if(!order){
      return "No orders made"
     }

      return order
    
   } catch (error) {
    return error
   }
    
};
