import { Request, Response, NextFunction } from "express";
import { UserRoleEnum } from "../enums/user.enum";

const driverMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = req.user;

  try {
    if (!user) {
      return res.status(401).json({ error: "Please login, then try" });
    }

    if (user.role !== UserRoleEnum.DRIVER) {
      return res.status(401).json({ error: "Only drivers have access" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Please login, then try" });
  }
};

export default driverMiddleware;
