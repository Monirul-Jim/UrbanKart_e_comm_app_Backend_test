
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProductFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});
const updateStockOut = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { stockOut } = req.body;

  const result = await ProductServices.updateStockOut(id, stockOut);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product stock status updated successfully",
    data: result,
  });
});
const getFlashSaleProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getFlashSaleProductsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Flash Sale products fetched successfully",
    data: result,
  });
});
 const updatePopularStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isPopular } = req.body;

  const result = await ProductServices.updatePopularStatusIntoDB(id, isPopular);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product popular status updated successfully",
    data: result,
  });
});
const getPopularProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getPopularProductsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Popular products fetched successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateStockOut,
  getFlashSaleProducts,
  updatePopularStatus,
  getPopularProducts
};
