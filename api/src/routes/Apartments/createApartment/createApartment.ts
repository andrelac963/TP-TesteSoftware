import { FastifyInstance } from "fastify";
import { prisma } from "../../../app";

export async function createApartment(fastify: FastifyInstance) {
  fastify.post("/apartments", async (request, reply) => {
    const { name, numberOfPeople, cleaningPeriod } = request.body as {
      name: string;
      numberOfPeople: number;
      cleaningPeriod: number;
    };
    try {
      const newApartment = await prisma.apartment.create({
        data: { name, numberOfPeople, cleaningPeriod },
      });
      reply.status(201).send(newApartment);
    } catch (error) {
      reply.status(500).send({ error: "Failed to create apartment" });
    }
  });
}
