import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { deleteResident } from "./deleteResident";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    resident: {
      delete: jest.fn(),
    },
  },
}));

describe("DELETE /residents/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(deleteResident);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should delete a resident by id", async () => {
    const mockResident = {
      id: 1,
      name: "Resident 1",
      cleaningOrder: 1,
      apartmentId: 1,
    };
    (prisma.resident.delete as jest.Mock).mockResolvedValue(mockResident);

    const response = await app.inject({
      method: "DELETE",
      url: "/residents/1",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockResident);
  });

  test("should return a 404 error if resident is not found", async () => {
    (prisma.resident.delete as jest.Mock).mockRejectedValue(
      new Error("Resident not found")
    );

    const response = await app.inject({
      method: "DELETE",
      url: "/residents/1",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ error: "Resident not found" });
  });
});
