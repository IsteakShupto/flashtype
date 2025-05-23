import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";
const userRouter = express.Router();

userRouter.post("/signup", async (req: any, res: any, next: any) => {
  const getEmail = req.body.email;
  const getName = req.body.name;
  const getPassword = req.body.password;

  const searchEmail = await prisma.user.findFirst({
    where: {
      email: getEmail,
    },
  });

  if (searchEmail) {
    // 409 - conflict status code
    return res.status(409).json({ message: "Email already exists!" });
  }

  const hashedPassword = await bcrypt.hash(getPassword, 10);

  const createNewUser = await prisma.user.create({
    data: {
      email: getEmail,
      name: getName,
      password: hashedPassword,
    },
  });

  return res.json({
    email: createNewUser.email,
    name: createNewUser.name,
    message: "Congrats! Your account has been created successfully.",
  });
});

userRouter.post("/login", async (req: any, res: any, next: any) => {
  const getEmail = req.body.email;
  const getPassword = req.body.password;

  const searchUser = await prisma.user.findFirst({
    where: {
      email: getEmail,
    },
  });

  if (!searchUser) {
    // 401 - unauthorized
    return res.status(401).json({
      message: "Email not found!",
    });
  }

  const matchedPassword = await bcrypt.compare(
    getPassword,
    searchUser.password
  );

  if (!matchedPassword) {
    // 401 - unauthorized
    return res.status(401).json({
      message: "Please provide correct credentials.",
    });
  }

  const accessToken = jwt.sign(
    {
      id: searchUser.id,
      email: searchUser.email,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: searchUser.id,
      email: searchUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 5 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({
    message: "Login successful!",
  });
});

userRouter.post("/logout", async (req: any, res: any, next: any) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({
    message: "Logout successful!",
  });
});

export default userRouter;
