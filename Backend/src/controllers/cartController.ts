import { error } from "console";
import Cart, { CartItem } from "../models/cart.model";
import { cartValidation } from "../validators/cartValidation";
import { Food } from "../models/food.model";

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



export const getCart = async (userId ?: string) => {
  const cart  = await Cart.findOne({userId});

  if(!cart){
    return ;
  }

  return cart
};



export const updateCart = async(data : CartItem, userId ?:string) =>{

  try {
    
    let cart = await Cart.findOne({userId})

    if(!cart){
      return
    }

    const item = cart.items.find(item => item.foodId.toString()=== data.foodId.toString())
   
    if(!item){
      return
    }

    item.quantity = data.quantity

    const total = cart.items.reduce((sum, item)=> sum + item.price * item.quantity ,0)

    await cart.save()

    return cart
  } catch (error) {
     return error
  }

}


export const clearCart = async(userId ?: String) =>{
         
  
 try {
  
     await Cart.findOneAndDelete({userId})
    return  Cart
 } catch (error) {

  return error
  
 }
}

export const deleteCartItem = async(foodId ?: string, userId ?: string ) =>{

  try {
    
    let cart =  await Cart.findOne({userId})
    
   if(!cart){
   return null
  }

    cart.items = cart.items.filter(item => item.foodId.toString() !== foodId?.toString())
    cart.total = cart.items.reduce((sum, item)=> sum + item.price * item.quantity, 0)
     
    cart.save()
    return cart

  } catch (error) {
    
    return error
  }

}
