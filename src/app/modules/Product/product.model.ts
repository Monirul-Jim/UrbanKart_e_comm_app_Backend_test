// src/app/modules/product/product.model.ts
import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    image: { type: String, required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    stockOut: { type: Boolean, default: false },

    // Flash Sale
    isFlashSale: { type: Boolean, default: false },
    flashSalePrice: { type: Number },
    flashSaleStart: { type: Date },
    flashSaleEnd: { type: Date },
     isPopular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ProductModel = model<TProduct>("Product", productSchema);
