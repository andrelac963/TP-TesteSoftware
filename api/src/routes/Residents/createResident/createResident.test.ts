import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { createResident } from "./createResident";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    resident: {
      create: jest.fn(),
    },
  },
}));

describe("POST /residents", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(createResident);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should create a new resident", async () => {
    const mockResident = {
      id: 1,
      name: "Resident 1",
      cleaningOrder: 1,
      apartmentId: 1,
    };
    (prisma.resident.create as jest.Mock).mockResolvedValue(mockResident);

    const response = await app.inject({
      method: "POST",
      url: "/residents",
      payload: {
        name: "Resident 1",
        cleaningOrder: 1,
        apartmentId: 1,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(mockResident);
  });

  test("should return a 500 error if creating resident fails", async () => {
    (prisma.resident.create as jest.Mock).mockRejectedValue(
      new Error("Failed to create resident")
    );

    const response = await app.inject({
      method: "POST",
      url: "/residents",
      payload: {
        name: "Resident 1",
        cleaningOrder: 1,
        apartmentId: 1,
      },
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ error: "Failed to create resident" });
  });
});
