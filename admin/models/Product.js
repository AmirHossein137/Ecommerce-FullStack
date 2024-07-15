import mongoose, { Schema, models, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});

export const Product = models.Product || model("Product", productSchema);
