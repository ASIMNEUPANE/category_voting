import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../DB/db.config";

interface VoteAttributes {
  id: number;
  categoryId: number;
  userId: string;
}

type VoteCreationAttributes = Optional<VoteAttributes, "id">;

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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    indexes: [
      {
        unique: true,
        fields: ["categoryId", "userId"],
      },
      {
        fields: ["userId"],
      },
    ],
  },
);

export { Vote };
