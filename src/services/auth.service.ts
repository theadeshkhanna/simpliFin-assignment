import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AUTH_KEY } from "../secrets";

class AuthService {
  static getInstance(): AuthService {
    return new AuthService();
  }

  async generateToken(user: User) {
    return jwt.sign({ userId: user.id }, AUTH_KEY);
  }

  async comparePasswords(payloadPassword: string, dbPassword: string) {
    return await bcrypt.compare(payloadPassword, dbPassword);
  }
}

export const authService = AuthService.getInstance();
