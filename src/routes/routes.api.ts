import express from "express";
const router = express.Router();
import { categoryRoutes } from "../modules/categories/category.route";
import { voteRoutes } from "../modules/vote/vote.route";

router.use("/category", categoryRoutes);
router.use("/vote", voteRoutes);

export default router;
