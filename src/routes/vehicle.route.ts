import { Router } from "express";
import { createVehicle } from "../controllers/vehicle.controller";
import authMiddleware from "../middlewares/auth.middleware";
import driverMiddleware from "../middlewares/driver.middleware";

const vehicleRoutes: Router = Router();

vehicleRoutes.post("/", [authMiddleware, driverMiddleware], createVehicle);

export default vehicleRoutes;
