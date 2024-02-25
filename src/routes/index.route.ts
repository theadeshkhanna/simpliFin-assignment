import { Router } from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import vehicleRoutes from "./vehicle.route";
import rideRoutes from "./ride.route";

const rootRouter: Router = Router();

rootRouter.use("/user", userRoutes);
rootRouter.use("/auth", authRoutes);
rootRouter.use("/vehicle", vehicleRoutes);
rootRouter.use("/ride", rideRoutes);

export default rootRouter;
