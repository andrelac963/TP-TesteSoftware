import api from "../api";
import { ApartmentType } from "../../types/apartmentTypes";

const createApartment = async (
  name: string,
  numberOfPeople: number,
  cleaningPeriod: number
): Promise<ApartmentType> => {
  const response = await api.post("/apartments", {
    name,
    numberOfPeople,
    cleaningPeriod,
  });
  return response.data;
};

export { createApartment };
