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

describe("Residents API", () => {
  let apartmentId: number;

  beforeAll(async () => {
    const createApartmentResponse = await app.inject({
      method: "POST",
      url: "/apartments",
      payload: {
        name: "Apartment for Residents",
        numberOfPeople: 3,
        cleaningPeriod: 7,
      },
    });

    apartmentId = createApartmentResponse.json().id;
  });

  test("should create a new resident", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/residents",
      payload: {
        name: "Resident 1",
        cleaningOrder: 1,
        apartmentId,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      name: "Resident 1",
      cleaningOrder: 1,
      apartmentId,
    });
  });

  test("should get all residents", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/residents",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeInstanceOf(Array);
  });

  test("should get a resident by id", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/residents",
      payload: {
        name: "Resident 2",
        cleaningOrder: 2,
        apartmentId,
      },
    });

    const residentId = createResponse.json().id;

    const response = await app.inject({
      method: "GET",
      url: `/residents/${residentId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      name: "Resident 2",
      cleaningOrder: 2,
      apartmentId,
    });
  });

  test("should delete a resident by id", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/residents",
      payload: {
        name: "Resident 3",
        cleaningOrder: 3,
        apartmentId,
      },
    });

    const residentId = createResponse.json().id;

    const response = await app.inject({
      method: "DELETE",
      url: `/residents/${residentId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      name: "Resident 3",
      cleaningOrder: 3,
      apartmentId,
    });
  });
});
