import express from "express";
import { faker } from "@faker-js/faker";
import { authMiddleware } from "../middlewares/middleware";

const wordsRouter = express.Router();

wordsRouter.get("/", authMiddleware, async (req: any, res: any) => {
  const words = Array.from({ length: 500 }, () => faker.word.sample());
  res.json({
    words,
  });
});

export default wordsRouter;
