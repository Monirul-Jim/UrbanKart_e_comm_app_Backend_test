
import { z } from "zod";

export const createProductValidation = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    discountPrice: z.number().optional(),
    image: z.string(),
     isPopular: z.boolean().optional(),
    subCategory: z.string(), 
     stockOut: z.boolean().optional(),
  }),
});

export const updateProductValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    discountPrice: z.number().optional(),
    image: z.string().optional(),
    subCategory: z.string().optional(),
    // flash sale fields allowed only in update
    isFlashSale: z.boolean().optional(),
    flashSalePrice: z.number().optional(),
    flashSaleEnd: z.string().datetime().optional(),
    isPopular: z.boolean().optional(),
     stockOut: z.boolean().optional(),
  }),
});
