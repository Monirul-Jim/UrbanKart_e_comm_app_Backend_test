
import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createSubCategoryValidation, updateSubCategoryValidation } from "./subcategory.validation";
import { SubCategoryControllers } from "./subcategory.controller";
const router = express.Router();

router.post(
  "/",
  validateRequest(createSubCategoryValidation),
  SubCategoryControllers.createSubCategory
);

router.get("/", SubCategoryControllers.getAllSubCategories);

router.patch(
  "/:id",
  validateRequest(updateSubCategoryValidation),
  SubCategoryControllers.updateSubCategory
);

router.delete("/:id", SubCategoryControllers.deleteSubCategory);

export const SubCategoryRoutes = router;
