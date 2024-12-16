import api from "../api";
import { ResidentType } from "../../types/residentTypes";

const createResident = async (
  name: string,
  cleaningOrder: number,
  apartmentId: number
): Promise<ResidentType> => {
  const response = await api.post("/residents", {
    name,
    cleaningOrder,
    apartmentId,
  });
  return response.data;
};

export { createResident };
