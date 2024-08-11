import { Category } from "./category.model";
import { AppError } from "../../middlewares/ErrorHandler";
import { Vote } from "../vote/vote.model";
import { Op } from "sequelize";

// Utility function to aggregate votes recursively
const aggregateVotes = async (categoryId: number): Promise<number> => {
  const directVotes = await Vote.count({ where: { categoryId } });

  const childCategories = await Category.findAll({
    where: { parentId: categoryId },
  });

  let childVotes = 0;
  for (const child of childCategories) {
    childVotes += await aggregateVotes(child.id);
  }

  return directVotes + childVotes;
};

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

export const deleteCategory = async (
  id: number,
): Promise<{ message: string }> => {
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await Vote.destroy({ where: { categoryId: id } });

      const childCategories = await Category.findAll({
        where: { parentId: id },
      });
      for (const child of childCategories) {
        await deleteCategory(child.id); // Recursive delete
      }

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

export const getTopCategories = async (): Promise<Category[]> => {
  try {
    const topCategories = await Category.findAll({
      where: { parentId: { [Op.is]: null } } as never,
    });

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
