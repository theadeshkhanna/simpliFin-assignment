import { z } from "zod";
import { VehicleTypeEnum } from "../enums/vehicle.enum";

export const CreateVehicleSchema = z.object({
  companyName: z.string(),
  modelName: z.string(),
  registrationNumber: z.string(),
  vehicleType: z.enum([
    VehicleTypeEnum.AUTO,
    VehicleTypeEnum.BIKE,
    VehicleTypeEnum.CAR,
  ]),
});
