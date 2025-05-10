import express from "express";
import { authMiddleware } from "../middlewares/middleware";
import { prisma } from "../index";

const scoreCardRouter = express.Router();

scoreCardRouter.get(
  "/",
  authMiddleware,
  async (req: any, res: any, next: any) => {
    const id = req.user.id;

    const allScoreCards = await prisma.scoreCard.findMany({
      where: {
        userId: id,
      },
    });

    res.json({
      allScoreCards,
      message: "Data loaded successfully!",
    });
  }
);

scoreCardRouter.post(
  "/",
  authMiddleware,
  async (req: any, res: any, next: any) => {
    const id = req.user.id;
    const finalResult = req.body.finalResult;

    console.log(finalResult);

    const allScoreCards = await prisma.scoreCard.create({
      data: {
        userId: id,
        finalResult: finalResult,
      },
    });

    res.json({
      allScoreCards,
      message: "Data uploaded successfully!",
    });
  }
);

export default scoreCardRouter;
