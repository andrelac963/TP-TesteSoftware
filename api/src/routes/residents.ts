import { FastifyInstance } from "fastify";
import { prisma } from "../app";

export default async function residentRoutes(fastify: FastifyInstance) {
  fastify.get("/residents", async (request, reply) => {
    try {
      const residents = await prisma.resident.findMany();
      return residents;
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch residents" });
    }
  });

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
