import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { getApartmentById } from "./getApartmentById";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    apartment: {
      findUnique: jest.fn(),
    },
  },
}));

describe("GET /apartments/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(getApartmentById);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should return an apartment by id", async () => {
    const mockApartment = {
      id: 1,
      name: "Apartment 1",
      numberOfPeople: 3,
      cleaningPeriod: 7,
      residents: [],
    };
    (prisma.apartment.findUnique as jest.Mock).mockResolvedValue(mockApartment);

    const response = await app.inject({
      method: "GET",
      url: "/apartments/1",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockApartment);
  });

  test("should return a 404 error if apartment is not found", async () => {
    (prisma.apartment.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await app.inject({
      method: "GET",
      url: "/apartments/1",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ error: "Apartment not found" });
  });

  test("should return a 500 error if fetching apartment fails", async () => {
    (prisma.apartment.findUnique as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch apartment")
    );

    const response = await app.inject({
      method: "GET",
      url: "/apartments/1",
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Failed to fetch apartment" });
  });
});
