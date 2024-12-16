import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function getApartments(fastify: FastifyInstance) {
  fastify.get("/apartments", async (request, reply) => {
    try {
      const apartments = await prisma.apartment.findMany({
        include: { residents: true },
      });
      return apartments;
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch apartments" });
    }
  });
}
