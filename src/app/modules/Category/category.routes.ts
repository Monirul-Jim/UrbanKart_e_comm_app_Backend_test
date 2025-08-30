import express from "express";
import { CategoryController } from "./category.controller";
import { createCategoryValidation, updateCategoryValidation } from "./category.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(createCategoryValidation),
  CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategories);

router.get("/:id", CategoryController.getSingleCategory);

router.patch(
  "/:id",
  validateRequest(updateCategoryValidation),
  CategoryController.updateCategory
);

router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
