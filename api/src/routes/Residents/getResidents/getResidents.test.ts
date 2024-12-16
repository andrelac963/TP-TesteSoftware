import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { getResidents } from "./getResidents";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    resident: {
      findMany: jest.fn(),
    },
  },
}));

describe("GET /residents", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(getResidents);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should return a list of residents", async () => {
    const mockResidents = [
      { id: 1, name: "Resident 1", cleaningOrder: 1, apartmentId: 1 },
      { id: 2, name: "Resident 2", cleaningOrder: 2, apartmentId: 1 },
    ];
    (prisma.resident.findMany as jest.Mock).mockResolvedValue(mockResidents);

    const response = await app.inject({
      method: "GET",
      url: "/residents",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockResidents);
  });

  test("should return a 500 error if fetching residents fails", async () => {
    (prisma.resident.findMany as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch residents")
    );

    const response = await app.inject({
      method: "GET",
      url: "/residents",
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Failed to fetch residents" });
  });
});
