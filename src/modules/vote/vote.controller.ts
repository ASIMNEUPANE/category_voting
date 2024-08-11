import { Vote } from "./vote.model";
import { AppError } from "../../middlewares/ErrorHandler";

export const createVote = async (
  categoryId: number,
  userId: string,
): Promise<Vote> => {
  try {
    const existingVote = await Vote.findOne({ where: { categoryId, userId } });
    if (existingVote) {
      throw new AppError("User has already voted for this category", 400);
    }
    const vote = await Vote.create({ categoryId, userId });
    return vote;
  } catch (error) {
    throw new AppError(
      "Failed to create vote: " + (error as Error).message,
      500,
    );
  }
};

export const getVotesForCategory = async (
  categoryId: number,
): Promise<Vote[]> => {
  try {
    const votes = await Vote.findAll({ where: { categoryId } });
    return votes;
  } catch (error) {
    throw new AppError(
      "Failed to retrieve votes: " + (error as Error).message,
      500,
    );
  }
};

export const deleteVote = async (
  categoryId: number,
  userId: string,
): Promise<{ message: string }> => {
  try {
    const vote = await Vote.findOne({ where: { categoryId, userId } });
    if (!vote) {
      throw new AppError("Vote not found", 404);
    }
    await vote.destroy();
    return { message: "Vote deleted successfully" };
  } catch (error) {
    throw new AppError(
      "Failed to delete vote: " + (error as Error).message,
      500,
    );
  }
};

export const getUserVotes = async (userId: string): Promise<Vote[]> => {
  try {
    const votes = await Vote.findAll({ where: { userId } });
    if (votes.length === 0) {
      throw new AppError("No votes found for this user", 404);
    }
    return votes;
  } catch (error) {
    throw new AppError(
      "Failed to retrieve user votes: " + (error as Error).message,
      500,
    );
  }
};
