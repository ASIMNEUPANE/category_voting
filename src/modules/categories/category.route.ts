// routes/categoryRoutes.ts
import express from "express";
import { Request, Response } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "./category.controller";

const router = express.Router();

router.post("/categories", async (req: Request, res: Response) => {
  const { name, parentId } = req.body;
  const category = await createCategory(name, parentId);
  res.status(201).json(category);
});

router.get("/categories", async (req: Request, res: Response) => {
  const categories = await getCategories();
  res.status(200).json(categories);
});

router.put("/categories/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, parentId } = req.body;
  const category = await updateCategory(id, name, parentId);
  res.status(200).json(category);
});

router.delete("/categories/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteCategory(id);
  res.status(200).json(response);
});

export { router as categoryRoutes };
