import { prisma } from "..";
import { CreateRideSchema } from "../schema/ride.schema";
import { userService } from "./user.service";

class RideService {
  static getInstance(): RideService {
    return new RideService();
  }

  async getRideById(id: number) {
    return await prisma.ride.findFirst({
      where: {
        id,
      },
    });
  }

  async createRide(data: CreateRideSchema, passengerId: number) {
    return await prisma.ride.create({
      data: {
        totalFare: data.totalFare,
        pickup: data.pickup,
        destination: data.destination,
        driverId: data.driverId,
        passengerId: passengerId,
      },
    });
  }

  async endRide(id: number) {
    await prisma.ride.update({
      where: {
        id,
      },
      data: {
        isTripEnded: true,
      },
    });

    return await this.getRideById(id);
  }

  async getAllRidesByUser(passengerId: number) {
    return await prisma.ride.findMany({
      where: {
        passengerId,
      },
      include: {
        driver: {
          include: {
            vehicle: true,
          },
        },
        passenger: true,
      },
    });
  }

  // In a real world application, it would be different drivers generating the rides,
  // which then can be accepted by passenger based on fare and differen parameters.
  async generateRandomRidesForGivenPickupAndDestination(data: {
    pickup: string;
    destination: string;
  }) {
    const driverIds = await userService.getAllDriverIds();
    const randomArrayLength = Math.floor(Math.random() * 3) + 3;
    return Array.from({ length: randomArrayLength }, (_, idx) => {
      const randomDriverId =
        driverIds[Math.floor(Math.random() * driverIds.length)].id;
      const randomTotalFare = Math.floor(Math.random() * 100) + 100;
      return {
        tempId: idx + 1,
        pickup: data.pickup,
        destination: data.destination,
        totalFare: randomTotalFare,
        driverId: randomDriverId,
      };
    });
  }
}

export const rideService = RideService.getInstance();
