import api from "../api";
import { ApartmentType } from "../../types/apartmentTypes";

const getApartments = async (): Promise<ApartmentType[]> => {
  const response = await api.get("/apartments");
  return response.data;
};

export { getApartments };