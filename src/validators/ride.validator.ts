import { z } from "zod";

export const CreateRideSchema = z.object({
  pickup: z.string(),
  destination: z.string(),
  totalFare: z.number(),
  driverId: z.number(),
});
