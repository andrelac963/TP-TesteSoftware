import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function getApartmentById(fastify: FastifyInstance) {
  fastify.get("/apartments/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const apartment = await prisma.apartment.findUnique({
        where: { id: Number(id) },
        include: { residents: true },
      });
      if (!apartment) {
        reply.status(404).send({ error: "Apartment not found" });
      } else {
        return apartment;
      }
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch apartment" });
    }
  });
}
