import AppError from "../../error/AppError";
import { TSubCategory } from "./subcategory.interface";
import { SubCategoryModel } from "./subcategory.model";


const createSubCategoryIntoDB = async (payload: TSubCategory) => {
  // Check duplicate under same category
  const existing = await SubCategoryModel.findOne({
    name: payload.name,
    category: payload.category,
  });
  if (existing) {
    throw new AppError(409, "This subcategory already exists in the selected category");
  }

  const result = await SubCategoryModel.create(payload);
  return result;
};

const getAllSubCategoriesFromDB = async () => {
  return await SubCategoryModel.find().populate("category", "name"); // populate category name
};

const updateSubCategoryIntoDB = async (id: string, payload: Partial<TSubCategory>) => {
  const result = await SubCategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("category", "name");
  return result;
};

const deleteSubCategoryFromDB = async (id: string) => {
  return await SubCategoryModel.findByIdAndDelete(id);
};

export const SubCategoryServices = {
  createSubCategoryIntoDB,
  getAllSubCategoriesFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryFromDB,
};
