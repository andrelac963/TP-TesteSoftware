import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function deleteApartment(fastify: FastifyInstance) {
  fastify.delete("/apartments/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const deletedApartment = await prisma.apartment.delete({
        where: { id: Number(id) },
      });
      reply.status(200).send(deletedApartment);
    } catch (error) {
      reply.status(404).send({ error: "Apartment not found" });
    }
  });
}
