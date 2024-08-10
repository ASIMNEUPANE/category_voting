// controllers/categoryController.ts
import { Category } from "./category.model";
import { AppError } from "../../middlewares/ErrorHandler";

export const createCategory = async (name: string, parentId: number) => {
  try {
    const category = await Category.create({ name, parentId });
    if (!category) {
      throw new AppError("Failed to create category", 500);
    }
    return category;
  } catch (error) {
    throw new AppError(
      "Failed to create category: " + (error as Error).message,
      500,
    );
  }
};

export const getCategories = async () => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Category, as: "children" }],
    });

    return categories;
  } catch (error) {
    throw new AppError(
      "Failed to retrieve categories: " + (error as Error).message,
      500,
    );
  }
};

export const updateCategory = async (
  id: string,
  name: string,
  parentId: number,
) => {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name;
      category.parentId = parentId;
      await category.save();
      return category;
    } else {
      throw new AppError("Category not found", 404);
    }
  } catch (error) {
    throw new AppError(
      "Failed to update category: " + (error as Error).message,
      500,
    );
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return { message: "Category deleted successfully" };
    } else {
      throw new AppError("Category not found", 404);
    }
  } catch (error) {
    throw new AppError(
      "Failed to delete category: " + (error as Error).message,
      500,
    );
  }
};
