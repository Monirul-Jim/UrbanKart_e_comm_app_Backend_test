// src/app/modules/product/product.service.ts
import { ProductModel } from "./product.model";
import { TProduct } from "./product.interface";

// Create Product
const createProductIntoDB = async (payload: TProduct) => {
  // Always force flash sale to false at creation
  payload.isFlashSale = false;
  payload.flashSalePrice = undefined;
  payload.flashSaleEnd = undefined;

  const result = await ProductModel.create(payload);
  return result;
};



const getAllProductsFromDB = async () => {
  return await ProductModel.find()
    .populate({
      path: "subCategory",
      populate: { path: "category" },
    })
    .exec();
};


const getSingleProductFromDB = async (id: string) => {
  return await ProductModel.findById(id)
    .populate({
      path: "subCategory",
      populate: { path: "category" },
    })
    .exec();
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  return await ProductModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProductFromDB = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
const updateStockOut = async (id: string, stockOut: boolean) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { stockOut },
    { new: true, runValidators: true }
  );
  return result;
};

const getFlashSaleProductsFromDB = async () => {
  const now = new Date();

  return await ProductModel.find({
    isFlashSale: true,
    flashSaleStart: { $lte: now },
    flashSaleEnd: { $gte: now },
  })
    .populate({
      path: "subCategory",
      populate: { path: "category" },
    })
    .exec();
};
const updatePopularStatusIntoDB = async (id: string, isPopular: boolean) => {
  return await ProductModel.findByIdAndUpdate(
    id,
    { isPopular },
    { new: true }
  );
};
const getPopularProductsFromDB = async () => {
  return await ProductModel.find({ isPopular: true })
    .populate({
      path: "subCategory",
      populate: { path: "category" },
    })
    .lean();
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  updateStockOut,
  getFlashSaleProductsFromDB,
  updatePopularStatusIntoDB,
  getPopularProductsFromDB
};
