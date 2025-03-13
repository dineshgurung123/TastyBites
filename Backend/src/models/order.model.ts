import { number, required } from "joi";
import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface orderItem {
  foodId: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: orderItem[];
  totalPrice: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [{
    foodId : {type : mongoose.Schema.Types.ObjectId , ref : "Food", required : true},
    name : {type : String, required : true},
    price : {type : String, required : true},
    quantity : {type : String , required : true}
  }],
  
     totalPrice : {type : Number, required : true},
     status : {type : String, enum :["Pending", "Processing", "Delivered", "Cancelled"], default : "Pending"},
     createdAt : {type : Date, default : Date.now} 
});

export const Order = mongoose.model<IOrder>("Order", orderSchema)