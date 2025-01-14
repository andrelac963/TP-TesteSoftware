import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { apartmentsRoutes } from "../../routes/Apartments/apartmentsRoutes";
import { residentsRoutes } from "../../routes/Residents/residentsRoutes";

let app: FastifyInstance;
let prisma: PrismaClient;

beforeAll(async () => {
  app = fastify();
  prisma = new PrismaClient();
  await prisma.$connect();
  app.register(apartmentsRoutes);
  app.register(residentsRoutes);
  await app.ready();
});

afterAll(async () => {
  await prisma.$disconnect();
  await app.close();
});

describe("Apartments API", () => {
  test("should create a new apartment", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/apartments",
      payload: {
        name: "Apartment 1",
        numberOfPeople: 3,
        cleaningPeriod: 7,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      name: "Apartment 1",
      numberOfPeople: 3,
      cleaningPeriod: 7,
    });
  });

  test("should get all apartments", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/apartments",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeInstanceOf(Array);
  });

  test("should get an apartment by id", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/apartments",
      payload: {
        name: "Apartment 2",
        numberOfPeople: 4,
        cleaningPeriod: 10,
      },
    });

    const apartmentId = createResponse.json().id;

    const response = await app.inject({
      method: "GET",
      url: `/apartments/${apartmentId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      name: "Apartment 2",
      numberOfPeople: 4,
      cleaningPeriod: 10,
    });
  });

  test("should delete an apartment by id", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/apartments",
      payload: {
        name: "Apartment 3",
        numberOfPeople: 2,
        cleaningPeriod: 5,
      },
    });

    const apartmentId = createResponse.json().id;

    const response = await app.inject({
      method: "DELETE",
      url: `/apartments/${apartmentId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      name: "Apartment 3",
      numberOfPeople: 2,
      cleaningPeriod: 5,
    });
  });
});
