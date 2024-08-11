import { QueryInterface } from "sequelize";

const now = new Date();

const categoriesData = [
  // Parent Categories
  {
    id: 1,
    name: "Electronics",
    parentId: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: "Home Appliances",
    parentId: null,
    createdAt: now,
    updatedAt: now,
  },
  { id: 3, name: "Books", parentId: null, createdAt: now, updatedAt: now },
  { id: 4, name: "Fashion", parentId: null, createdAt: now, updatedAt: now },
  { id: 5, name: "Sports", parentId: null, createdAt: now, updatedAt: now },

  // Children of Electronics
  { id: 6, name: "Computers", parentId: 1, createdAt: now, updatedAt: now },
  { id: 7, name: "Smartphones", parentId: 1, createdAt: now, updatedAt: now },

  // Grandchildren of Electronics
  { id: 8, name: "Laptops", parentId: 6, createdAt: now, updatedAt: now },
  { id: 9, name: "Desktops", parentId: 6, createdAt: now, updatedAt: now },
  {
    id: 10,
    name: "Android Phones",
    parentId: 7,
    createdAt: now,
    updatedAt: now,
  },
  { id: 11, name: "iPhones", parentId: 7, createdAt: now, updatedAt: now },

  // Children of Home Appliances
  {
    id: 12,
    name: "Kitchen Appliances",
    parentId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 13,
    name: "Cleaning Appliances",
    parentId: 2,
    createdAt: now,
    updatedAt: now,
  },

  // Grandchildren of Home Appliances
  { id: 14, name: "Microwaves", parentId: 12, createdAt: now, updatedAt: now },
  {
    id: 15,
    name: "Refrigerators",
    parentId: 12,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 16,
    name: "Vacuum Cleaners",
    parentId: 13,
    createdAt: now,
    updatedAt: now,
  },
  { id: 17, name: "Dishwashers", parentId: 13, createdAt: now, updatedAt: now },

  // Children of Books
  { id: 18, name: "Fiction", parentId: 3, createdAt: now, updatedAt: now },
  { id: 19, name: "Non-Fiction", parentId: 3, createdAt: now, updatedAt: now },

  // Grandchildren of Books
  { id: 20, name: "Mystery", parentId: 18, createdAt: now, updatedAt: now },
  {
    id: 21,
    name: "Science Fiction",
    parentId: 18,
    createdAt: now,
    updatedAt: now,
  },
  { id: 22, name: "Biographies", parentId: 19, createdAt: now, updatedAt: now },
  { id: 23, name: "Self-Help", parentId: 19, createdAt: now, updatedAt: now },

  // Children of Fashion
  {
    id: 24,
    name: "Men's Clothing",
    parentId: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 25,
    name: "Women's Clothing",
    parentId: 4,
    createdAt: now,
    updatedAt: now,
  },

  // Grandchildren of Fashion
  { id: 26, name: "Shirts", parentId: 24, createdAt: now, updatedAt: now },
  { id: 27, name: "Pants", parentId: 24, createdAt: now, updatedAt: now },
  { id: 28, name: "Dresses", parentId: 25, createdAt: now, updatedAt: now },
  { id: 29, name: "Skirts", parentId: 25, createdAt: now, updatedAt: now },

  // Children of Sports
  {
    id: 30,
    name: "Outdoor Sports",
    parentId: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 31,
    name: "Indoor Sports",
    parentId: 5,
    createdAt: now,
    updatedAt: now,
  },

  // Grandchildren of Sports
  { id: 32, name: "Football", parentId: 30, createdAt: now, updatedAt: now },
  { id: 33, name: "Basketball", parentId: 30, createdAt: now, updatedAt: now },
  {
    id: 34,
    name: "Table Tennis",
    parentId: 31,
    createdAt: now,
    updatedAt: now,
  },
  { id: 35, name: "Badminton", parentId: 31, createdAt: now, updatedAt: now },
];

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("Categories", categoriesData);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Categories", {});
  },
};
