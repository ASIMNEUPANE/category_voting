import { Category } from "./category.model";
import { AppError } from "../../middlewares/ErrorHandler";
import { Vote } from "../vote/vote.model";
import { Op } from "sequelize";

// Utility function to aggregate votes recursively
const aggregateVotes = async (categoryId: number): Promise<number> => {
  // Get direct votes for this category
  const directVotes = await Vote.count({ where: { categoryId } });

  // Get child categories
  const childCategories = await Category.findAll({
    where: { parentId: categoryId },
  });

  // Aggregate votes for child categories
  let childVotes = 0;
  for (const child of childCategories) {
    childVotes += await aggregateVotes(child.id);
  }

  return directVotes + childVotes;
};

// Controller to create a category
export const createCategory = async (
  name: string,
  parentId?: number,
): Promise<Category> => {
  try {
    const category = await Category.create({ name, parentId });
    if (!category) {
      throw new AppError("Failed to create category", 404);
    }
    return category;
  } catch (error) {
    throw new AppError(
      "Failed to create category: " + (error as Error).message,
      500,
    );
  }
};

// Controller to get all categories with hierarchical structure
export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Category,
          as: "children",
          include: [{ model: Category, as: "children" }],
        },
      ],
    });

    return categories;
  } catch (error) {
    throw new AppError(
      "Failed to retrieve categories: " + (error as Error).message,
      500,
    );
  }
};

// Controller to get a category by ID
export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const category = await Category.findByPk(id, {
      include: [{ model: Category, as: "children" }],
    });
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    return category;
  } catch (error) {
    throw new AppError(
      "Failed to retrieve category: " + (error as Error).message,
      500,
    );
  }
};

// Controller to update a category
export const updateCategory = async (
  id: number,
  name: string,
  parentId?: number,
): Promise<Category> => {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name;
      category.parentId = parentId;
      await category.save();

      // Handle votes aggregation if parent category changes
      // or if this category is updated

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

// Controller to delete a category
export const deleteCategory = async (
  id: number,
): Promise<{ message: string }> => {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      // Delete all votes for this category
      await Vote.destroy({ where: { categoryId: id } });

      // Find and delete all child categories
      const childCategories = await Category.findAll({
        where: { parentId: id },
      });
      for (const child of childCategories) {
        await deleteCategory(child.id); // Recursive delete
      }

      // Delete the category itself
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

// Controller to get top categories based on vote count
export const getTopCategories = async (): Promise<Category[]> => {
  try {
    // Get all top-level categories
    const topCategories = await Category.findAll({
      where: { parentId: { [Op.is]: null } } as never,
    });

    // Aggregate votes and sort top 3 categories
    const categoriesWithVotes = await Promise.all(
      topCategories.map(async (category) => {
        const votes = await aggregateVotes(category.id);
        return { category, votes };
      }),
    );

    const topCategoriesWithVotes = categoriesWithVotes
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 3)
      .map(({ category }) => category);

    return topCategoriesWithVotes;
  } catch (error) {
    throw new AppError(
      "Failed to retrieve top categories: " + (error as Error).message,
      500,
    );
  }
};
