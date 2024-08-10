// routes/voteRoutes.ts
import express from "express";
import {
  voteForCategory,
  getTopCategories,
} from "./vote.controller";

const router = express.Router();

router.post("/votes", voteForCategory);
router.get("/top-categories", getTopCategories);

export { router as voteRoutes };
