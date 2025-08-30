// src/app/modules/product/product.interface.ts
import { Types } from "mongoose";

export type TProduct = {
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  subCategory: Types.ObjectId;
  stockOut?: boolean;

  // Flash Sale
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleStart?: Date;
  flashSaleEnd?: Date;
   isPopular?: boolean;
};
