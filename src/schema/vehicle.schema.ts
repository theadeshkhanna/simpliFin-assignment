import { VehicleTypeEnum } from "../enums/vehicle.enum";

export interface createVehicleSchema {
  companyName: string;
  modelName: string;
  registrationNumber: string;
  vehicleType: VehicleTypeEnum;
}
