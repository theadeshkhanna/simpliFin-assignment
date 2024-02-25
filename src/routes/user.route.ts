import { Router } from "express";
import { getAllRides } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import passengerMiddleware from "../middlewares/passenger.middleware";

const userRoutes: Router = Router();

userRoutes.get("/rides", [authMiddleware, passengerMiddleware], getAllRides);

export default userRoutes;
