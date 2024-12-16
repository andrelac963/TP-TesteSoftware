import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { deleteApartment } from "./deleteApartment";
import { prisma } from "../../../app";

jest.mock("../../../app", () => ({
  prisma: {
    apartment: {
      delete: jest.fn(),
    },
  },
}));

describe("DELETE /apartments/:id", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = fastify();
    await app.register(deleteApartment);
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("should delete an apartment by id", async () => {
    const mockApartment = {
      id: 1,
      name: "Apartment 1",
      numberOfPeople: 3,
      cleaningPeriod: 7,
    };
    (prisma.apartment.delete as jest.Mock).mockResolvedValue(mockApartment);

    const response = await app.inject({
      method: "DELETE",
      url: "/apartments/1",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockApartment);
  });

  test("should return a 404 error if apartment is not found", async () => {
    (prisma.apartment.delete as jest.Mock).mockRejectedValue(
      new Error("Apartment not found")
    );

    const response = await app.inject({
      method: "DELETE",
      url: "/apartments/1",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ error: "Apartment not found" });
  });
});
