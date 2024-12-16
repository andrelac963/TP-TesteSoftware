import api from "../api";
import { ApartmentType } from "../../types/apartmentTypes";

const getApartment = async (id: number): Promise<ApartmentType> => {
  const response = await api.get(`/apartments/${id}`);
  return response.data;
};

export { getApartment };
