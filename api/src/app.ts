import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import apartmentRoutes from './routes/apartments';
import residentRoutes from './routes/residents';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors, {
  origin: "*",
});

fastify.register(apartmentRoutes);
fastify.register(residentRoutes);

export { fastify, prisma };