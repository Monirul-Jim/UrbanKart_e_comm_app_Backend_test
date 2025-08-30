import { Router } from "express";
import {
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIpn,
  OrderController,
} from "./payment.controller";

const router = Router();

router.post("/init", initPayment);
router.post("/success", paymentSuccess);
router.post("/fail", paymentFail);
router.post("/cancel", paymentCancel);
router.post("/ipn", paymentIpn);
router.get("/", OrderController.getAllOrders);
router.get("/my-orders", OrderController.getUserOrders);
router.put("/:id/status", OrderController.updateOrderStatus);
export const PaymentRoutes = router;
