import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IOrder extends Document {
  user?: Types.ObjectId | null;
  tran_id: string;
  amount: number;
  currency: "BDT" | "USD";
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  orderStatus:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "RETURNED"
    | "ON_ARRIVAL_PENDING"
    | "ON_ARRIVAL_DELIVERED";
  items: IOrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    email?: string;
    postcode?: string;
  };
  paymentInfo?: any;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "RegistrationModel",
      default: null,
    },
    tran_id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["BDT", "USD"], default: "BDT" },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
      default: "PENDING",
    },
     orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "RETURNED",
        "ON_ARRIVAL_PENDING",
        "ON_ARRIVAL_DELIVERED",
      ],
      default: "PENDING",
    },
   
    items: [
      {
        _id: String,
        title: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      email: String,
      postcode: String,
    },
    paymentInfo: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const OrderModel = model<IOrder>("Order", orderSchema);
