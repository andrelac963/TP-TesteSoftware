import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { getResidentById } from "./getResidentById";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    resident: {
      findUnique: jest.fn(),
    },
  },
}));

describe("GET /residents/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(getResidentById);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should return a resident by id", async () => {
    const mockResident = {
      id: 1,
      name: "Resident 1",
      cleaningOrder: 1,
      apartmentId: 1,
    };
    (prisma.resident.findUnique as jest.Mock).mockResolvedValue(mockResident);

    const response = await app.inject({
      method: "GET",
      url: "/residents/1",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockResident);
  });

  test("should return a 404 error if resident is not found", async () => {
    (prisma.resident.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await app.inject({
      method: "GET",
      url: "/residents/1",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ error: "Resident not found" });
  });

  test("should return a 500 error if fetching resident fails", async () => {
    (prisma.resident.findUnique as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch resident")
    );

    const response = await app.inject({
      method: "GET",
      url: "/residents/1",
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Failed to fetch resident" });
  });
});
