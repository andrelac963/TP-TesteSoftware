import { useEffect, useState } from "react";
import { createApartment } from "../../services/apartments/createApartment";
import { deleteApartment } from "../../services/apartments/deleteApartment";
import { getApartments } from "../../services/apartments/getApartments";
import { CreateApartmentModal } from "../../components/CreateApartmentModal";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Header,
  Title,
  ApartmentList,
  ApartmentItem,
  ApartmentInfo,
  ApartmentDetails,
} from "./Apartments.styles";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

interface Apartment {
  id: number;
  name: string;
  numberOfPeople: number;
  cleaningPeriod: number;
}

export const Apartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchApartments = async () => {
      const apartments = await getApartments();
      setApartments(apartments);
    };

    fetchApartments();
  }, []);

  const handleCreateApartment = async (
    name: string,
    numberOfPeople: number,
    cleaningPeriod: number
  ) => {
    const newApartment = await createApartment(
      name,
      numberOfPeople,
      cleaningPeriod
    );
    setApartments([...apartments, newApartment]);
  };

  const handleDeleteApartment = async (id: number) => {
    await deleteApartment(id);
    setApartments(apartments.filter((apartment) => apartment.id !== id));
    setConfirmModalOpen(false);
  };

  const openConfirmModal = (id: number) => {
    setApartmentToDelete(id);
    setConfirmModalOpen(true);
  };

  return (
    <Container>
      <Header>
        <Title>Lista de Apartamentos</Title>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Adicionar Apartamento
        </Button>
      </Header>
      <ApartmentList>
        {apartments.map((apartment) => (
          <ApartmentItem key={apartment.id}>
            <ApartmentInfo to={`/apartments/${apartment.id}`}>
              <ApartmentIcon />
              <ApartmentDetails>
                {apartment.name}
                <p>Número de Pessoas: {apartment.numberOfPeople}</p>
                <p>Período de Limpeza: {apartment.cleaningPeriod} dias</p>
              </ApartmentDetails>
            </ApartmentInfo>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => openConfirmModal(apartment.id)}
            >
              <DeleteIcon />
            </Button>
          </ApartmentItem>
        ))}
      </ApartmentList>
      <CreateApartmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateApartment}
      />
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() =>
          apartmentToDelete !== null && handleDeleteApartment(apartmentToDelete)
        }
        text="Tem certeza que deseja deletar este apartamento?"
      />
    </Container>
  );
};
