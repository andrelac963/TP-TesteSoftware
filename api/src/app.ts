import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { apartmentsRoutes } from "./routes/Apartments/apartmentsRoutes";
import { residentsRoutes } from "./routes/Residents/residentsRoutes";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors, {
  origin: "*",
});

fastify.register(apartmentsRoutes);
fastify.register(residentsRoutes);

export { fastify, prisma };