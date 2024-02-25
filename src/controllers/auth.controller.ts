import { Request, Response } from "express";
import { LoginSchema, SignupSchema } from "../validators/auth.validator";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { UserRoleEnum } from "../enums/user.enum";

export const login = async (req: Request, res: Response) => {
  let payload = req.body;

  try {
    payload = LoginSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({ error: e.errors });
  }

  try {
    const dbUser = await userService.getUserByEmail(payload.email);
    if (!dbUser) {
      return res
        .status(404)
        .json({ error: `User with this email does not exist` });
    }

    const isPasswordCorrect = await authService.comparePasswords(
      payload.password,
      dbUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: `Password entered is wrong` });
    }

    const token = await authService.generateToken(dbUser);
    return res.status(200).json({ data: dbUser, token: token });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

export const signup = async (req: Request, res: Response) => {
  let payload = req.body;
  const role = req.url.includes("passenger")
    ? UserRoleEnum.PASSENGER
    : UserRoleEnum.DRIVER;

  try {
    payload = SignupSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({ error: e.errors });
  }

  try {
    const dbUser = await userService.getUserByEmailAndRole(payload.email, role);
    if (dbUser) {
      return res
        .status(404)
        .json({ error: `User with this email already exists` });
    }

    const user = await userService.createUser(payload, role);
    const token = await authService.generateToken(user);
    return res.status(200).json({ data: user, token: token });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};
