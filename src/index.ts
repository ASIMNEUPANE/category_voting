import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import compression from "compression";
import cors from "cors";

import { AppError, ErrorHandler } from "./middlewares/ErrorHandler";
import limiter from "./middlewares/rateLimit";
import { testConnection } from "./DB/db.config";

// import IndexRouter from "./routes/index";

const PORT = parseInt(process.env.PORT || "3333");
export const app = express();

try {
  testConnection();
  // declare global {
  //   namespace NodeJS {
  //     interface ProcessEnv {
  //        JWT_SECRET: string;
  //       PORT: string;
  //       NODE_ENV: string;
  //       OTP_SECRET: string;
  //       OTP_DURATION: number;
  //       SALT_ROUND: number;
  //     }
  //   }
  // }
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
  app.use(limiter);
  // app.use("/", IndexRouter);
  app.use(ErrorHandler);

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
