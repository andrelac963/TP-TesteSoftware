import api from "../api";

const deleteResident = async (id: number): Promise<void> => {
  await api.delete(`/residents/${id}`);
};

export { deleteResident };
