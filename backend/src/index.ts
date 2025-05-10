import cors from "cors";
import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import wordsRouter from "./routes/wordsRouter";
import scoreCardRouter from "./routes/scoreCardRouter";
import cookieParser from "cookie-parser";
import expressListEndpoints from "express-list-endpoints";

dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/user", userRouter);
app.use("/api/scores", scoreCardRouter);
app.use("/api/words", wordsRouter);

app.listen(PORT, () => {
  console.log(`Type tester backend running on PORT:${PORT} ✅`);
  console.log("Registered Routes: ", expressListEndpoints(app));
});
