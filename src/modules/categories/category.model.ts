import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../DB/db.config";
import { Vote } from "../votes/vote.model";

interface CategoryAttributes {
  id: number;
  name: string;
  parentId?: number;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, "id">;

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public parentId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly children?: Category[];
  public readonly votes?: Vote[];

  public static validateNoCycle(category: Category) {
    if (category.parentId === category.id) {
      throw new Error("A category cannot be its own parent.");
    }
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories",
    indexes: [
      {
        fields: ["parentId"],
      },
    ],
    hooks: {
      beforeCreate: (category) => Category.validateNoCycle(category),
      beforeUpdate: (category) => Category.validateNoCycle(category),
    },
  },
);

export { Category };
