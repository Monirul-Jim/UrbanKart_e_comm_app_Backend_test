// subCategory.validation.ts
import { z } from "zod";

export const createSubCategoryValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
  }),
});
export const updateSubCategoryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
  }),
});
