import { Sequelize, QueryTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "mysql", // or 'postgres', 'sqlite', 'mariadb', etc.
  logging: false, // Optional: Disable logging or set to a logging function
});
export { QueryTypes };

export async function testConnection () {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL environment variable is not defined");
    }

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error((error as Error).message);
    } else {
      throw new Error((error as Error).message);
    }
  }
}

testConnection();
