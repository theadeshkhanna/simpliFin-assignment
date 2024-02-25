import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/login", login);
authRoutes.post("/signup/driver", signup);
authRoutes.post("/signup/passenger", signup);

export default authRoutes;
