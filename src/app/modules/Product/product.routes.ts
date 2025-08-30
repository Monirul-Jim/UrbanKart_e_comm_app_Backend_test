// src/app/modules/product/product.routes.ts
import express from "express";
import { ProductController } from "./product.controller";
import {
  createProductValidation,
  updateProductValidation,
} from "./product.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(createProductValidation),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);
router.get("/flash-sale", ProductController.getFlashSaleProducts); 
router.get("/popular", ProductController.getPopularProducts);
router.get("/:id", ProductController.getSingleProduct);

router.patch(
  "/:id",
  validateRequest(updateProductValidation),
  ProductController.updateProduct
);

router.delete("/:id", ProductController.deleteProduct);
router.patch("/:id/stock-out", ProductController.updateStockOut);
router.patch("/:id/popular", ProductController.updatePopularStatus);

export const ProductRoutes = router;
