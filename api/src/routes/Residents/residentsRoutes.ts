import { FastifyInstance } from "fastify";
import { createResident } from "./createResident/createResident";
import { deleteResident } from "./deleteResident/deleteResident";
import { getResidents } from "./getResidents/getResidents";
import { getResidentById } from "./getResidentById/getResidentById";

export async function residentsRoutes(fastify: FastifyInstance) {
  await createResident(fastify);
  await deleteResident(fastify);
  await getResidents(fastify);
  await getResidentById(fastify);
}
