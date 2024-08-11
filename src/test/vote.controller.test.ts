import { Vote } from "../modules/votes/vote.model";
import { AppError } from "../middlewares/ErrorHandler";
import {
  createVote,
  getVotesForCategory,
  deleteVote,
  getUserVotes,
} from "../modules/votes/vote.controller";

jest.mock("../modules/votes/vote.model");

jest.spyOn(Vote, "create");
jest.spyOn(Vote, "findOne");
jest.spyOn(Vote, "findAll");
jest.spyOn(Vote, "destroy");

describe("Vote Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await Vote.drop();
  });

  // Create Vote Operation
  describe("createVote", () => {
    it("should create and save a vote successfully", async () => {
      const voteData = { id: 1, categoryId: 1, userId: "user123" };
      (Vote.findOne as jest.Mock).mockResolvedValue(null);
      (Vote.create as jest.Mock).mockResolvedValue(voteData);

      const createdVote = await createVote(1, "user123");
      expect(createdVote).toEqual(voteData);
      expect(Vote.findOne).toHaveBeenCalledWith({
        where: { categoryId: 1, userId: "user123" },
      });
      expect(Vote.create).toHaveBeenCalledWith({
        categoryId: 1,
        userId: "user123",
      });
    });

    it("should handle errors during vote creation if vote already exists", async () => {
      (Vote.findOne as jest.Mock).mockResolvedValue({});

      await expect(createVote(1, "user123")).rejects.toThrow(AppError);
    });

    it("should handle errors during vote creation", async () => {
      (Vote.findOne as jest.Mock).mockResolvedValue(null);
      (Vote.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(createVote(1, "user123")).rejects.toThrow(AppError);
    });
  });

  // Get Votes for Category Operation
  describe("getVotesForCategory", () => {
    it("should return all votes for a category", async () => {
      const votes = [{ id: 1, categoryId: 1, userId: "user123" }];
      (Vote.findAll as jest.Mock).mockResolvedValue(votes);

      const result = await getVotesForCategory(1);
      expect(result).toEqual(votes);
      expect(Vote.findAll).toHaveBeenCalledWith({ where: { categoryId: 1 } });
    });

    it("should handle errors during retrieving votes", async () => {
      (Vote.findAll as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(getVotesForCategory(1)).rejects.toThrow(AppError);
    });
  });

  // Delete Vote Operation
  describe("deleteVote", () => {
    it("should delete a vote successfully", async () => {
      const vote = {
        id: 1,
        categoryId: 1,
        userId: "user123",
        destroy: jest.fn().mockResolvedValue({}),
      };
      (Vote.findOne as jest.Mock).mockResolvedValue(vote);

      const result = await deleteVote(1, "user123");
      expect(result).toEqual({ message: "Vote deleted successfully" });
      expect(Vote.findOne).toHaveBeenCalledWith({
        where: { categoryId: 1, userId: "user123" },
      });
      expect(vote.destroy).toHaveBeenCalled();
    });

    it("should handle not found error during vote deletion", async () => {
      (Vote.findOne as jest.Mock).mockResolvedValue(null);

      await expect(deleteVote(1, "user123")).rejects.toThrow(AppError);
    });

    it("should handle errors during vote deletion", async () => {
      const vote = {
        id: 1,
        categoryId: 1,
        userId: "user123",
        destroy: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      (Vote.findOne as jest.Mock).mockResolvedValue(vote);

      await expect(deleteVote(1, "user123")).rejects.toThrow(AppError);
    });
  });

  // Get User Votes Operation
  describe("getUserVotes", () => {
    it("should return all votes for a user", async () => {
      const votes = [{ id: 1, categoryId: 1, userId: "user123" }];
      (Vote.findAll as jest.Mock).mockResolvedValue(votes);

      const result = await getUserVotes("user123");
      expect(result).toEqual(votes);
      expect(Vote.findAll).toHaveBeenCalledWith({
        where: { userId: "user123" },
      });
    });

    it("should handle not found error if no votes exist for a user", async () => {
      (Vote.findAll as jest.Mock).mockResolvedValue([]);

      await expect(getUserVotes("user123")).rejects.toThrow(AppError);
    });

    it("should handle errors during retrieving user votes", async () => {
      (Vote.findAll as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(getUserVotes("user123")).rejects.toThrow(AppError);
    });
  });
});
