import express, { Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createVoteSchema,
  getVotesForCategorySchema,
  deleteVoteSchema,
  getUserVotesSchema,
} from "../../schemas/voteSchema";
import {
  createVote,
  getVotesForCategory,
  deleteVote,
  getUserVotes,
} from "./vote.controller";

const router = express.Router();

// Route for creating a vote
router.post(
  "/",
  validateRequest(createVoteSchema),
  async (req: Request, res: Response) => {
    const { categoryId, userId } = req.body;
    try {
      const vote = await createVote(categoryId, userId);
      res.status(201).json(vote);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Route for getting votes for a category
router.get(
  "/votes/:categoryId",
  validateRequest(getVotesForCategorySchema),
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
      const votes = await getVotesForCategory(Number(categoryId));
      res.status(200).json(votes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Route for deleting a vote
router.delete(
  "/",
  validateRequest(deleteVoteSchema),
  async (req: Request, res: Response) => {
    const { categoryId, userId } = req.body;
    try {
      const result = await deleteVote(categoryId, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

// Route for getting votes by user
router.get(
  "/user-votes/:userId",
  validateRequest(getUserVotesSchema),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const votes = await getUserVotes(userId);
      res.status(200).json(votes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);

export { router as voteRoutes };
