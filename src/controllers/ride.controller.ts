import { Request, Response } from "express";
import { CreateRideSchema } from "../validators/ride.validator";
import { rideService } from "../services/ride.service";

export const offerRides = async (req: Request, res: Response) => {
  let payload = req.body;

  try {
    const rides =
      await rideService.generateRandomRidesForGivenPickupAndDestination(
        payload
      );
    return res.status(200).json({ data: rides });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

export const selectRide = async (req: Request, res: Response) => {
  // @ts-ignore
  let user = req.user;
  let payload = req.body;

  try {
    payload = CreateRideSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({ error: e.errors });
  }

  try {
    const ride = await rideService.createRide(payload, user.id);
    return res.status(200).json({ data: ride });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};

export const endRide = async (req: Request, res: Response) => {
  let rideId = +req.params.rideId;

  try {
    if (!rideId) {
      return res.status(422).json({ error: "please send a valid rideId" });
    }

    const ride = await rideService.getRideById(rideId);

    if (!ride) {
      return res
        .status(404)
        .json({ error: `ride with rideId: ${rideId} does not exist` });
    }

    if (ride?.isTripEnded) {
      return res
        .status(500)
        .json({ error: `ride with rideId: ${rideId} already ended` });
    }

    const updatedRide = await rideService.endRide(rideId);
    return res.status(200).json({ data: updatedRide });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};
