
import AppError from "../../error/AppError";
import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const existing = await CategoryModel.findOne({ name: payload.name });
  if (existing) {
    throw new AppError(409, "This category already exists. Please choose another one.");
  }
  return await CategoryModel.create(payload);
};

const getAllCategoriesFromDB = async () => {
  return await CategoryModel.find();
};

const getSingleCategoryFromDB = async (id: string) => {
  return await CategoryModel.findById(id);
};

const updateCategoryIntoDB = async (id: string, payload: Partial<TCategory>) => {
  const result = await CategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(404, "Category not found");
  }
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await CategoryModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, "Category not found");
  }
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
