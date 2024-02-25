import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AUTH_KEY } from "../secrets";
import { userService } from "../services/user.service";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    if (!token.includes("Bearer")) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    const authToken = token.split(" ")[1];
    const payload = jwt.verify(authToken, AUTH_KEY) as any;

    const user = await userService.getUserById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Please login, then try" });
  }
};

export default authMiddleware;
