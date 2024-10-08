import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTopCategories,
} from "./category.controller";
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getCategoryByIdSchema,
} from "../../schemas/categorySchema";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/", validateRequest(createCategorySchema), async (req, res) => {
  const { name, parentId } = req.body;
  try {
    const category = await createCategory(name, parentId);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get(
  "/categories/:id",
  validateRequest(getCategoryByIdSchema),
  async (req, res) => {
    const { id } = req.params;
    try {
      const category = await getCategoryById(Number(id));
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

router.put("/", validateRequest(updateCategorySchema), async (req, res) => {
  const { id, name, parentId } = req.body;
  try {
    const category = await updateCategory(id, name, parentId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete("/", validateRequest(deleteCategorySchema), async (req, res) => {
  const { id } = req.body;
  try {
    const response = await deleteCategory(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/categories/top", async (req, res) => {
  try {
    const topCategories = await getTopCategories();
    res.status(200).json(topCategories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export { router as categoryRoutes };
