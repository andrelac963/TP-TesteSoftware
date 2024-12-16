import api from "../api";

const deleteApartment = async (id: number): Promise<void> => {
  await api.delete(`/apartments/${id}`);
};

export { deleteApartment };
