import express from "express";
import { RegisterRoutes } from "../modules/Register/register.routes";
import { LoginRoutes } from "../modules/Login/login.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { SubCategoryRoutes } from "../modules/SubCategory/subcategory.routes";
import { ProductRoutes } from "../modules/Product/product.routes";
import { PaymentRoutes } from "../modules/Order/payment.routes";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: RegisterRoutes,
  },
  {
    path: "/auth",
    route: LoginRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/subcategories",
    route: SubCategoryRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;