// controllers/voteController.ts
import { Request, Response } from "express";
import { Vote } from "./vote.model";
import { Category } from "../categories/category.model";
import { sequelize } from "../../DB/db.config"; // Adjust the path to your sequelize instance

export const voteForCategory = async (req: Request, res: Response) => {
  const { categoryId, userId } = req.body;
  try {
    const vote = await Vote.create({ categoryId, userId });
    res.status(201).json(vote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTopCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("COUNT", sequelize.col("votes.id")), "voteCount"],
      ],
      include: [{ model: Vote, as: "votes" }],
      group: ["Category.id"],
      order: [[sequelize.literal("voteCount"), "DESC"]],
      limit: 3,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
