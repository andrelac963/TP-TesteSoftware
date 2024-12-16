import { FastifyInstance } from "fastify";
import { createApartment } from "./createApartment/createApartment";
import { deleteApartment } from "./deleteApartment/deleteApartment";
import { getApartments } from "./getApartments/getApartments";
import { getApartmentById } from "./getApartmentById/getApartmentById";

export async function apartmentsRoutes(fastify: FastifyInstance) {
  await createApartment(fastify);
  await deleteApartment(fastify);
  await getApartments(fastify);
  await getApartmentById(fastify);
}
