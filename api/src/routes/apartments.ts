import { FastifyInstance } from "fastify";
import { prisma } from "../app";

export default async function apartmentRoutes(fastify: FastifyInstance) {
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
