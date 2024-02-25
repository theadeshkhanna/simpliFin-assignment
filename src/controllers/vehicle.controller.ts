import { Request, Response } from "express";
import { CreateVehicleSchema } from "../validators/vehicle.validator";
import { vehicleService } from "../services/vehicle.service";

export const createVehicle = async (req: Request, res: Response) => {
  // @ts-ignore
  let user = req.user;
  let payload = req.body;

  try {
    payload = CreateVehicleSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({ error: e.errors });
  }

  try {
    const dbVehicle = await vehicleService.getVehicle(
      payload.registrationNumber
    );
    if (dbVehicle) {
      return res.status(200).json({ data: dbVehicle });
    }
    const vehicle = await vehicleService.createVehicle(payload, user.id);
    return res.status(200).json({ data: vehicle });
  } catch (e) {
    return res.status(500).json({ error: `something went wrong` });
  }
};
