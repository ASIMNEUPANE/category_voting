// src/validators/categoryValidators.ts
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1),
  parentId: z.number().int().optional(),
});

export const updateCategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  parentId: z.number().int().optional(),
});

export const deleteCategorySchema = z.object({
  id: z.number().int().positive(),
});

export const getCategoryByIdSchema = z.object({
  id: z.number().int().positive(),
});
