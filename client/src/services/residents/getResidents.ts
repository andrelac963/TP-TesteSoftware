import api from "../api";
import { ResidentType } from "../../types/residentTypes";

const getResidents = async (apartmentId: number): Promise<ResidentType[]> => {
  const response = await api.get(`/residents?apartmentId=${apartmentId}`);
  return response.data;
};

export { getResidents };
