// subCategory.controller.ts
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubCategoryServices } from "./subcategory.service";

const createSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.createSubCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "SubCategory created successfully",
    data: result,
  });
});

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.getAllSubCategoriesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "SubCategories fetched successfully",
    data: result,
  });
});

const updateSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubCategoryServices.updateSubCategoryIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "SubCategory updated successfully",
    data: result,
  });
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubCategoryServices.deleteSubCategoryFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "SubCategory deleted successfully",
    data: result,
  });
});

export const SubCategoryControllers = {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
};
