import { Category } from "../modules/categories/category.model";
import { AppError } from "../middlewares/ErrorHandler";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../modules/categories/category.controller";
import { Vote } from "../modules/votes/vote.model";

jest.mock("../modules/categories/category.model");
jest.mock("../modules/votes/vote.model");

jest.mock("../modules/categories/category.controller", () => ({
  ...jest.requireActual("../modules/categories/category.controller"),
  aggregateVotes: jest.fn(),
}));

jest.spyOn(Category, "create");
jest.spyOn(Category, "findAll");
jest.spyOn(Category, "findByPk");
jest.spyOn(Category, "destroy");
jest.spyOn(Vote, "destroy");
jest.spyOn(Vote, "count");

describe("Category Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await Category.drop();
    await Vote.drop();
  });

  describe("createCategory", () => {
    it("should create and save a category successfully", async () => {
      const categoryData = { id: 1, name: "Technology", parentId: null };
      (Category.create as jest.Mock).mockResolvedValue(categoryData);

      const createdCategory = await createCategory("Technology");
      expect(createdCategory).toEqual(categoryData);
      expect(Category.create).toHaveBeenCalledWith({
        name: "Technology",
        parentId: undefined,
      });
    });

    it("should handle errors during category creation", async () => {
      (Category.create as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(createCategory("Technology")).rejects.toThrow(AppError);
    });
  });

  describe("getCategories", () => {
    it("should return all categories", async () => {
      const categories = [{ id: 1, name: "Technology", parentId: null }];
      (Category.findAll as jest.Mock).mockResolvedValue(categories);

      const result = await getCategories();
      expect(result).toEqual(categories);
      expect(Category.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: Category,
            as: "children",
            include: [{ model: Category, as: "children" }],
          },
        ],
      });
    });

    it("should handle errors during retrieving categories", async () => {
      (Category.findAll as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(getCategories()).rejects.toThrow(AppError);
    });
  });

  describe("getCategoryById", () => {
    it("should return a category by ID", async () => {
      const categoryData = { id: 1, name: "Technology", parentId: null };
      (Category.findByPk as jest.Mock).mockResolvedValue(categoryData);

      const result = await getCategoryById(1);
      expect(result).toEqual(categoryData);
      expect(Category.findByPk).toHaveBeenCalledWith(1, {
        include: [{ model: Category, as: "children" }],
      });
    });

    it("should handle not found error", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getCategoryById(1)).rejects.toThrow(AppError);
    });
  });

  describe("updateCategory", () => {
    it("should update a category by ID", async () => {
      const updatedCategory = { id: 1, name: "Updated Name", parentId: 2 };

      const existingCategory = {
        id: 1,
        name: "Old Name",
        parentId: 1,
        save: jest.fn().mockResolvedValue(updatedCategory),
      };

      (Category.findByPk as jest.Mock).mockResolvedValue(existingCategory);

      const result = await updateCategory(1, "Updated Name", 2);

      const resultWithoutSave = {
        id: result.id,
        name: result.name,
        parentId: result.parentId,
      };

      expect(resultWithoutSave).toEqual(updatedCategory);
      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(existingCategory.save).toHaveBeenCalled();
    });

    it("should handle not found error during update", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(updateCategory(1, "Updated Name")).rejects.toThrow(AppError);
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category and associated votes", async () => {
      const category = { id: 1, destroy: jest.fn() };
      const childCategory = { id: 2, destroy: jest.fn() };

      (Category.findByPk as jest.Mock)
        .mockResolvedValueOnce(category)
        .mockResolvedValueOnce(childCategory)
        .mockResolvedValueOnce(null);

      (Category.findAll as jest.Mock)
        .mockResolvedValueOnce([childCategory])
        .mockResolvedValueOnce([]);

      (Vote.destroy as jest.Mock).mockResolvedValue(1);
      (childCategory.destroy as jest.Mock).mockResolvedValue({});
      (category.destroy as jest.Mock).mockResolvedValue({});

      await deleteCategory(1);

      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(Category.findAll).toHaveBeenCalledWith({ where: { parentId: 1 } });
      expect(Vote.destroy).toHaveBeenCalledWith({ where: { categoryId: 1 } });
      expect(childCategory.destroy).toHaveBeenCalled();
      expect(category.destroy).toHaveBeenCalled();
    });

    it("should handle errors during category deletion", async () => {
      (Category.findByPk as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(deleteCategory(1)).rejects.toThrow(AppError);
    });
  });
});
