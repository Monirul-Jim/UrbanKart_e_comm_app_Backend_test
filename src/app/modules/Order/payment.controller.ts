import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import SSLCommerzPayment from "sslcommerz-lts";
import { OrderModel } from "./order.model";
import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.service";
import sendResponse from "../../utils/sendResponse";

const {
  SSL_STORE_ID,
  SSL_STORE_PASSWD,
  SSL_MODE,
  BACKEND_BASE_URL,
  FRONTEND_BASE_URL,
} = process.env;

const is_live = (SSL_MODE || "sandbox").toLowerCase() === "live";

export const initPayment = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    // expects: { amount, customer: {name,phone,address,city,email?,postcode?}, items: IOrderItem[] }
    const { amount, currency = "BDT", customer, items ,userId } = req.body;
 const user = userId?._id || userId || null;
    if (
      !amount ||
      !customer?.name ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payload" });
    }

    const tran_id = `txn_${uuidv4()}`;
    // 1) Create PENDING order
    await OrderModel.create({
      user,
      tran_id,
      amount,
      currency,
      status: "PENDING",
      items,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        email: customer.email,
        postcode: customer.postcode,
      },
    });

    // 2) SSLCOMMERZ payload
    const data = {
      total_amount: amount,
      currency,
      tran_id,
      success_url: `${BACKEND_BASE_URL}/api/v1/payment/success`,
      fail_url: `${BACKEND_BASE_URL}/api/v1/payment/fail`,
      cancel_url: `${BACKEND_BASE_URL}/api/v1/payment/cancel`,
      ipn_url: `${BACKEND_BASE_URL}/api/v1/payment/ipn`,

      cus_name: customer.name,
      cus_email: customer.email || "no@mail.com",
      cus_add1: customer.address,
      cus_city: customer.city,
      cus_postcode: customer.postcode || "0000",
      cus_country: "Bangladesh",
      cus_phone: customer.phone,

      shipping_method: "NO",
      product_name: "E-commerce items",
      product_category: "General",
      product_profile: "general",
      num_of_item: Array.isArray(items) ? items.length : 1,
    };

    const sslcz = new (SSLCommerzPayment as any)(
      SSL_STORE_ID,
      SSL_STORE_PASSWD,
      is_live
    );
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
      return res.status(200).json({
        success: true,
        redirectURL: apiResponse.GatewayPageURL,
        tran_id,
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Failed to create payment session" });
  } catch (err: any) {
    console.error("initPayment error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { tran_id, status } = req.body || {};
    if (!tran_id) return res.redirect(`${FRONTEND_BASE_URL}/payment/fail`);

    if (status === "VALID" || status === "VALIDATED") {
      await OrderModel.findOneAndUpdate(
        { tran_id },
        { status: "SUCCESS", paymentInfo: req.body },
        { new: true }
      );
      return res.redirect(
        `${FRONTEND_BASE_URL}/payment/success?tran_id=${tran_id}`
      );
    }

    await OrderModel.findOneAndUpdate(
      { tran_id },
      { status: "FAILED", paymentInfo: req.body },
      { new: true }
    );
    return res.redirect(`${FRONTEND_BASE_URL}/payment/fail?tran_id=${tran_id}`);
  } catch {
    return res.redirect(`${FRONTEND_BASE_URL}/payment/fail`);
  }
};

export const paymentFail = async (req: Request, res: Response) => {
  const { tran_id } = req.body || {};
  if (tran_id) {
    await OrderModel.findOneAndUpdate(
      { tran_id },
      { status: "FAILED", paymentInfo: req.body },
      { new: true }
    );
  }
  return res.redirect(
    `${FRONTEND_BASE_URL}/payment/fail${tran_id ? `?tran_id=${tran_id}` : ""}`
  );
};

export const paymentCancel = async (req: Request, res: Response) => {
  const { tran_id } = req.body || {};
  if (tran_id) {
    await OrderModel.findOneAndUpdate(
      { tran_id },
      { status: "CANCELLED", paymentInfo: req.body },
      { new: true }
    );
  }
  return res.redirect(
    `${FRONTEND_BASE_URL}/payment/cancel${tran_id ? `?tran_id=${tran_id}` : ""}`
  );
};

export const paymentIpn = async (req: Request, res: Response) => {
  try {
    const { status, tran_id } = req.body || {};
    if (!tran_id) return res.status(400).json({ success: false });

    if (status === "VALID" || status === "VALIDATED") {
      await OrderModel.findOneAndUpdate(
        { tran_id },
        { status: "SUCCESS", paymentInfo: req.body },
        { new: true }
      );
    } else if (status === "FAILED") {
      await OrderModel.findOneAndUpdate(
        { tran_id },
        { status: "FAILED", paymentInfo: req.body },
        { new: true }
      );
    } else if (status === "CANCELLED") {
      await OrderModel.findOneAndUpdate(
        { tran_id },
        { status: "CANCELLED", paymentInfo: req.body },
        { new: true }
      );
    }

    return res.status(200).json({ success: true });
  } catch (e: any) {
    console.error("paymentIpn error:", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};



const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});
const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const result = await OrderServices.updateOrderStatusInDB(id, orderStatus);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Order not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});
const getUserOrders = catchAsync(async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "userId is required",
    });
  }

  const result = await OrderServices.getUserOrdersFromDB(userId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User orders retrieved successfully",
    data: result,
  });
});
export const OrderController = {
  getAllOrders,
  updateOrderStatus,
  getUserOrders
};