import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const SignupSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});
