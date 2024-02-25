import { Request, Response } from "express";
import { rideService } from "../services/ride.service";

export const getAllRides = async (req: Request, res: Response) => {
  // @ts-ignore
  let user = req.user;

  try {
    const rides = await rideService.getAllRidesByUser(user.id);
    return res.status(200).json({ data: rides });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};
