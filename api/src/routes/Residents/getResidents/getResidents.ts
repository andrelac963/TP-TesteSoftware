import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function getResidents(fastify: FastifyInstance) {
  fastify.get("/residents", async (request, reply) => {
    try {
      const residents = await prisma.resident.findMany();
      return residents;
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch residents" });
    }
  });
}
