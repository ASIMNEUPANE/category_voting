import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import helmet from "helmet";
import https from "https";
import fs from "fs";
import compression from "compression";
import cors from "cors";
import { sequelize } from "./DB/db.config";

import { AppError, ErrorHandler } from "./middlewares/ErrorHandler";
import limiter from "./middlewares/rateLimit";

import { testConnection } from "./DB/db.config";
import IndexRouter from "./routes/index";
import "./modules/categories/category.model";
import "./modules/votes/vote.model";
import setupAssociations from "./modules/associations";

setupAssociations();
sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized successfully.");
});

const PORT = parseInt(process.env.PORT || "3000");
export const app = express();

try {
  testConnection();

  app.use(helmet());
  app.use(express.json());
  app.use(cors());

  app.use(express.urlencoded({ extended: false }));

  app.use(
    compression({
      filter: (req: Request, res: Response) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.use(limiter);
  app.use("/", IndexRouter);
  app.use(ErrorHandler);

  // HTTPS server setup

  // const httpsOptions = {
  //   key: fs.readFileSync("ssl/private.key"),
  //   cert: fs.readFileSync("/ssl/certificate.crt"),
  // };
  // https.createServer(httpsOptions, app).listen(PORT, () => {
  //   console.log(`App is running on port ${PORT}`);
  // });

  app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    throw new AppError(error.message, 500);
  } else {
    console.error("Unknown error:", error);
    process.exit(1);
  }
}
