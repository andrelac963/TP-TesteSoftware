import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { createApartment } from "./createApartment";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    apartment: {
      create: jest.fn(),
    },
  },
}));

describe("POST /apartments", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(createApartment);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should create a new apartment", async () => {
    const mockApartment = {
      id: 1,
      name: "Apartment 1",
      numberOfPeople: 3,
      cleaningPeriod: 7,
    };
    (prisma.apartment.create as jest.Mock).mockResolvedValue(mockApartment);

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
    expect(response.json()).toEqual(mockApartment);
  });

  test("should return a 500 error if creating apartment fails", async () => {
    (prisma.apartment.create as jest.Mock).mockRejectedValue(
      new Error("Failed to create apartment")
    );

    const response = await app.inject({
      method: "POST",
      url: "/apartments",
      payload: {
        name: "Apartment 1",
        numberOfPeople: 3,
        cleaningPeriod: 7,
      },
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Failed to create apartment" });
  });
});
