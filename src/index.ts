import express, { Express } from "express";
import rootRouter from "./routes/index.route";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";

const app: Express = express();

app.use(express.json());
app.use("/api", rootRouter);

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.listen(PORT, () => {
  console.log(`app is running at port: ${PORT}`);
});
