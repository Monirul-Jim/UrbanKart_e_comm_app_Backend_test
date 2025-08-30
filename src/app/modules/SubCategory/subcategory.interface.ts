// subCategory.interface.ts
import { Types } from "mongoose";

export type TSubCategory = {
  name: string;
  category: Types.ObjectId; // Reference to Category
};
