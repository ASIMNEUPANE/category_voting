import { QueryInterface } from "sequelize";

const now = new Date();

const votesData = [
  // Votes for Electronics and its descendants
  { categoryId: 1, userId: "user1", createdAt: now, updatedAt: now },
  { categoryId: 6, userId: "user2", createdAt: now, updatedAt: now }, // Computers
  { categoryId: 8, userId: "user3", createdAt: now, updatedAt: now }, // Laptops
  { categoryId: 7, userId: "user1", createdAt: now, updatedAt: now }, // Smartphones
  { categoryId: 10, userId: "user2", createdAt: now, updatedAt: now }, // Android Phones

  // Votes for Home Appliances and its descendants
  { categoryId: 2, userId: "user3", createdAt: now, updatedAt: now },
  { categoryId: 12, userId: "user1", createdAt: now, updatedAt: now }, // Kitchen Appliances
  { categoryId: 14, userId: "user2", createdAt: now, updatedAt: now }, // Microwaves
  { categoryId: 13, userId: "user3", createdAt: now, updatedAt: now }, // Cleaning Appliances
  { categoryId: 16, userId: "user1", createdAt: now, updatedAt: now }, // Vacuum Cleaners

  // Votes for Books and its descendants
  { categoryId: 3, userId: "user2", createdAt: now, updatedAt: now },
  { categoryId: 18, userId: "user3", createdAt: now, updatedAt: now }, // Fiction
  { categoryId: 20, userId: "user1", createdAt: now, updatedAt: now }, // Mystery
  { categoryId: 19, userId: "user2", createdAt: now, updatedAt: now }, // Non-Fiction
  { categoryId: 22, userId: "user3", createdAt: now, updatedAt: now }, // Biographies

  // Votes for Fashion and its descendants
  { categoryId: 4, userId: "user1", createdAt: now, updatedAt: now },
  { categoryId: 24, userId: "user2", createdAt: now, updatedAt: now }, // Men's Clothing
  { categoryId: 26, userId: "user3", createdAt: now, updatedAt: now }, // Shirts
  { categoryId: 25, userId: "user1", createdAt: now, updatedAt: now }, // Women's Clothing
  { categoryId: 28, userId: "user2", createdAt: now, updatedAt: now }, // Dresses

  // Votes for Sports and its descendants
  { categoryId: 5, userId: "user3", createdAt: now, updatedAt: now },
  { categoryId: 30, userId: "user1", createdAt: now, updatedAt: now }, // Outdoor Sports
  { categoryId: 32, userId: "user2", createdAt: now, updatedAt: now }, // Football
  { categoryId: 31, userId: "user3", createdAt: now, updatedAt: now }, // Indoor Sports
  { categoryId: 34, userId: "user1", createdAt: now, updatedAt: now }, // Table Tennis
];

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("Votes", votesData);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Votes", {});
  },
};
