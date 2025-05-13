import { prisma } from "../index";
import jwt from "jsonwebtoken";
import { JwtType } from "../utils/jwt_struct";

export async function authMiddleware(req: any, res: any, next: any) {
  const token = req.cookies.accessToken;

  if (!token) {
    // 401 - unauthorized
    return res
      .status(401)
      .json({ message: "Please provide correct credentials." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtType;

    const findUser = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });

    if (!findUser) {
      // 401 - unauthorized
      return res.status(401).json({ message: "User not found!" });
    }
    req.user = findUser;
    next();
  } catch (err) {
    console.log(err);
    // 401 - unauthorized
    return res.status(401).json({
      message:
        "Please provide correct credentials / Token expired / Please login again.",
    });
  }
}
