import { z } from "zod";

export const createCategoryValidation = z.object({
  body: z.object({
    name: z.string().min(2, "Category name must be at least 2 characters long"),
    imageUrl: z.string().min(2, "Image Url need"),
  }),
});

export const updateCategoryValidation = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    imageUrl: z.string().min(2).optional(),
  }),
});
