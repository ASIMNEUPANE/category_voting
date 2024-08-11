import { z } from "zod";

export const createVoteSchema = z.object({
  categoryId: z.number().int().positive(),
  userId: z.string().min(1),
});

export const getVotesForCategorySchema = z.object({
  categoryId: z.number().int().positive(),
});

export const deleteVoteSchema = z.object({
  categoryId: z.number().int().positive(),
  userId: z.string().min(1),
});

export const getUserVotesSchema = z.object({
  userId: z.string().min(1),
});
