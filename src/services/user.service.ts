import { prisma } from "..";
import { UserRoleEnum } from "../enums/user.enum";
import { createUserSchema } from "../schema/user.schema";
import bcrypt from "bcrypt";

class UserService {
  static getInstance(): UserService {
    return new UserService();
  }

  async getUserById(id: number) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getUserByEmailAndRole(email: string, role: UserRoleEnum) {
    return await prisma.user.findFirst({
      where: {
        email: email,
        role: role,
      },
    });
  }

  async getAllDriverIds() {
    return await prisma.user.findMany({
      select: {
        id: true,
      },
      where: {
        role: UserRoleEnum.DRIVER,
      },
    });
  }

  async createUser(data: createUserSchema, role: UserRoleEnum) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        role: role,
      },
    });
  }
}

export const userService = UserService.getInstance();
