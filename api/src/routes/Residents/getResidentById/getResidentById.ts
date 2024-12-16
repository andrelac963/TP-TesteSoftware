import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function getResidentById(fastify: FastifyInstance) {
  fastify.get("/residents/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const resident = await prisma.resident.findUnique({
        where: { id: Number(id) },
      });
      if (!resident) {
        reply.status(404).send({ error: "Resident not found" });
      } else {
        return resident;
      }
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch resident" });
    }
  });
}
