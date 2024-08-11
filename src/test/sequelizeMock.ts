import { Model, DataTypes, Sequelize } from "sequelize";
//@ts-ignore
import SequelizeMock from "sequelize-mock";

// Create a mock sequelize instance
const dbMock = new SequelizeMock();

// Create mock models
export const Category = dbMock.define("Category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  parentId: DataTypes.INTEGER,
});

export const Vote = dbMock.define("Vote", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categoryId: DataTypes.INTEGER,
  userId: DataTypes.STRING,
});
