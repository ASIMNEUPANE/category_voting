import { Category } from "./categories/category.model";
import { Vote } from "./votes/vote.model";

export default function setupAssociations() {
  Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
  Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

  Category.hasMany(Vote, { as: "votes", foreignKey: "categoryId" });
  Vote.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
}
