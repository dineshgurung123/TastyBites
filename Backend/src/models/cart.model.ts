import mongoose, { Schema, Document } from "mongoose";

export interface CartItem {
  foodId: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
  total: number;
}

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
