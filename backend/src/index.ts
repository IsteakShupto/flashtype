import cors from "cors";
import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import wordsRouter from "./routes/wordsRouter";
import scoreCardRouter from "./routes/scoreCardRouter";
import cookieParser from "cookie-parser";
import expressListEndpoints from "express-list-endpoints";
import jwt from "jsonwebtoken";
import { JwtType } from "./utils/jwt_struct";

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
app.post("/api/refresh", async (req: any, res: any) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Please login to continue.",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtType;

    const accessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "10m",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 5 * 60 * 1000,
    });

    return res.json({ message: "Access token refreshed." });
  } catch (error) {
    // 403 - user is not allowed to access the requested source
    return res.status(403).json({
      message: "Invalid or expired refresh token.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Type tester backend running on PORT:${PORT} ✅`);
  console.log("Registered Routes: ", expressListEndpoints(app));
});
