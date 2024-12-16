import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResidents } from "../../services/residents/getResidents";
import { createResident } from "../../services/residents/createResident";
import { deleteResident } from "../../services/residents/deleteResident";
import { getApartment } from "../../services/apartments/getApartment";
import Button from "@mui/material/Button";
import UserIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateResidentModal } from "../../components/CreateResidentModal";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import {
  Container,
  Header,
  Title,
  Content,
  EmptySpace,
  ResidentList,
  ResidentItem,
  ResidentInfo,
  ResidentDetails,
  DisabledButton,
} from "./Residents.styles";

interface Resident {
  id: number;
  name: string;
  cleaningOrder: number;
  apartmentId: number;
}

export const Residents = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [apartmentPeople, setApartmentPeople] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [residentToDelete, setResidentToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchResidents = async () => {
      const residents = await getResidents(Number(apartmentId));
      setResidents(residents);
    };

    const fetchApartment = async () => {
      const apartment = await getApartment(Number(apartmentId));
      setApartmentPeople(apartment.numberOfPeople);
    };

    fetchResidents();
    fetchApartment();
  }, [apartmentId]);

  const handleCreateResident = async (name: string, cleaningOrder: number) => {
    if (residents.length < apartmentPeople) {
      const newResident = await createResident(
        name,
        cleaningOrder,
        Number(apartmentId)
      );
      setResidents([...residents, newResident]);
    } else {
      alert("Cannot add more residents than the apartment capacity");
    }
  };

  const handleDeleteResident = async (id: number) => {
    await deleteResident(id);
    setResidents(residents.filter((resident) => resident.id !== id));
    setConfirmModalOpen(false);
  };

  const openConfirmModal = (id: number) => {
    setResidentToDelete(id);
    setConfirmModalOpen(true);
  };

  return (
    <Container>
      <Header>
        <Title>Lista de Residentes</Title>
        <DisabledButton
          variant="contained"
          onClick={() => setModalOpen(true)}
          disabled={residents.length >= apartmentPeople}
        >
          Adicionar Residente
        </DisabledButton>
      </Header>
      <Content>
        <EmptySpace />
        <ResidentList>
          {residents.map((resident) => (
            <ResidentItem key={resident.id}>
              <ResidentInfo>
                <UserIcon />
                <ResidentDetails>
                  <span>{resident.name}</span>
                  <span>Ordem de Limpeza: {resident.cleaningOrder}</span>
                </ResidentDetails>
              </ResidentInfo>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => openConfirmModal(resident.id)}
              >
                <DeleteIcon />
              </Button>
            </ResidentItem>
          ))}
        </ResidentList>
      </Content>
      <CreateResidentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateResident}
        maxCleaningOrder={apartmentPeople}
      />
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() =>
          residentToDelete !== null && handleDeleteResident(residentToDelete)
        }
        text="Tem certeza que deseja deletar este residente?"
      />
    </Container>
  );
};
