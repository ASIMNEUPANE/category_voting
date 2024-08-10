import { Category } from "../modules/categories/category.model";
import { Vote } from "../modules/vote/vote.model";

const seedData = async () => {
  try {
    // Clear existing data
    await Category.destroy({ where: {} });
    await Vote.destroy({ where: {} });

    // Create top-level categories
    const topLevelCategory1 = await Category.create({ name: "Technology" });
    const topLevelCategory2 = await Category.create({ name: "Science" });

    // Create child categories
    const childCategory1 = await Category.create({
      name: "Software",
      parentId: topLevelCategory1.id,
    });
    const childCategory2 = await Category.create({
      name: "Hardware",
      parentId: topLevelCategory1.id,
    });
    const childCategory3 = await Category.create({
      name: "Physics",
      parentId: topLevelCategory2.id,
    });
    const childCategory4 = await Category.create({
      name: "Biology",
      parentId: topLevelCategory2.id,
    });

    // Create grandchild categories
    await Category.create({
      name: "Artificial Intelligence",
      parentId: childCategory1.id,
    });
    await Category.create({ name: "Networking", parentId: childCategory2.id });
    await Category.create({
      name: "Quantum Mechanics",
      parentId: childCategory3.id,
    });
    await Category.create({ name: "Genetics", parentId: childCategory4.id });

    console.log("Categories seeded successfully");

    // Fetch all categories for voting
    const categories = await Category.findAll();

    if (categories.length === 0) {
      console.log("No categories found to seed votes.");
      return;
    }

    // Create votes for each category
    for (const category of categories) {
      await Vote.create({
        categoryId: category.id,
        userId: Math.floor(Math.random() * 1000).toString(), // Random user ID for demonstration
      });
    }

    console.log("Votes seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
