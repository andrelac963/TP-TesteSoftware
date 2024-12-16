import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { getApartments } from "./getApartments";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    apartment: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /apartments", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(getApartments);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should return a list of apartments", async () => {
    const mockApartments = [
      {
        id: 1,
        name: "Apartment 1",
        numberOfPeople: 3,
        cleaningPeriod: 7,
        residents: [],
      },
      {
        id: 2,
        name: "Apartment 2",
        numberOfPeople: 4,
        cleaningPeriod: 10,
        residents: [],
      },
    ];
    (prisma.apartment.findMany as jest.Mock).mockResolvedValue(mockApartments);

    const response = await app.inject({
      method: "GET",
      url: "/apartments",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockApartments);
  });

  test("should return a 500 error if fetching apartments fails", async () => {
    (prisma.apartment.findMany as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch apartments")
    );

    const response = await app.inject({
      method: "GET",
      url: "/apartments",
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Failed to fetch apartments" });
  });
});
