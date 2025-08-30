// subCategory.model.ts
import { Schema, model } from "mongoose";
import { TSubCategory } from "./subcategory.interface";

const subCategorySchema = new Schema<TSubCategory>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const SubCategoryModel = model<TSubCategory>("SubCategory", subCategorySchema);
