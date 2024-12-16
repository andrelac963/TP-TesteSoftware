import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function createResident(fastify: FastifyInstance) {
  fastify.post("/residents", async (request, reply) => {
    const { name, cleaningOrder, apartmentId } = request.body as {
      name: string;
      cleaningOrder: number;
      apartmentId: number;
    };
    try {
      const newResident = await prisma.resident.create({
        data: { name, cleaningOrder, apartmentId },
      });
      reply.status(201).send(newResident);
    } catch (error) {
      reply.status(500).send({ error: "Failed to create resident" });
    }
  });
}
