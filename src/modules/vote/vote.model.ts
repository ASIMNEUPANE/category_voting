// models/vote.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../DB/db.config";
import { Category } from "../categories/category.model";

interface VoteAttributes {
  id: number;
  categoryId: number;
  userId: string;
}

interface VoteCreationAttributes extends Optional<VoteAttributes, "id"> {}

class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes
{
  public id!: number;
  public categoryId!: number;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Vote",
    tableName: "Votes",
  },
);

Vote.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export { Vote };
