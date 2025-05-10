import { prisma } from "../index";
import jwt from "jsonwebtoken";
import { jwt_type } from "../utils/jwt_struct";

export async function authMiddleware(req: any, res: any, next: any) {
  const token = req.cookies.authToken;

  if (!token) {
    // 401 - unauthorized
    return res
      .status(401)
      .json({ message: "Please provide correct credentials." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt_type;

    const findUser = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });

    if (!findUser) {
      // 404 - not found
      return res.status(404).json({ message: "User not found!" });
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
