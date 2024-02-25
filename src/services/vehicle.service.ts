import { prisma } from "..";
import { createVehicleSchema } from "../schema/vehicle.schema";

class VehicleService {
  static getInstance(): VehicleService {
    return new VehicleService();
  }

  async getVehicle(registrationNumber: string) {
    return await prisma.vehicle.findFirst({
      where: {
        registrationNumber,
      },
    });
  }

  async createVehicle(data: createVehicleSchema, driverId: number) {
    return await prisma.vehicle.create({
      data: {
        companyName: data.companyName,
        modelName: data.modelName,
        registrationNumber: data.registrationNumber,
        vehicleType: data.vehicleType,
        driverId: driverId,
      },
    });
  }
}

export const vehicleService = new VehicleService();
