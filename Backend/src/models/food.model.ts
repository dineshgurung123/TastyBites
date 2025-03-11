import mongoose, { Model, Schema } from "mongoose";

export interface IFood extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const foodSchema: Schema<IFood> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

export const Food: Model<IFood> = mongoose.model<IFood>("Food", foodSchema);
