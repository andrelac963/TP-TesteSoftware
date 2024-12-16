import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function deleteResident(fastify: FastifyInstance) {
  fastify.delete("/residents/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const deletedResident = await prisma.resident.delete({
        where: { id: Number(id) },
      });
      reply.status(200).send(deletedResident);
    } catch (error) {
      reply.status(404).send({ error: "Resident not found" });
    }
  });
}
