import { Router } from "express";
import {
  offerRides,
  selectRide,
  endRide,
} from "../controllers/ride.controller";
import authMiddleware from "../middlewares/auth.middleware";

const rideRoutes: Router = Router();

rideRoutes.post("/offer", [authMiddleware], offerRides);
rideRoutes.post("/select", [authMiddleware], selectRide);
rideRoutes.post("/end-ride/:rideId", [authMiddleware], endRide);

export default rideRoutes;
