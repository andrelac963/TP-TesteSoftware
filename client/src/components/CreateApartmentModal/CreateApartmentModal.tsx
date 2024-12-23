import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ModalContent,
  Header,
  ModalTitle,
} from "./CreateApartmentModal.styles";

interface CreateApartmentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (
    name: string,
    numberOfPeople: number,
    cleaningPeriod: number
  ) => void;
}
export const CreateApartmentModal: React.FC<CreateApartmentModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [cleaningPeriod, setCleaningPeriod] = useState(0);

  const handleCreate = () => {
    onCreate(name, numberOfPeople, cleaningPeriod);
    setName("");
    setNumberOfPeople(0);
    setCleaningPeriod(0);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Header>
          <IconButton onClick={onClose} data-testid="close-button" style={{ alignSelf: "flex-end", padding: 0, marginTop: "-16px", marginRight: "-16px" }}>
            <CloseIcon />
          </IconButton>
          <ModalTitle>Adicionar Novo Apartamento</ModalTitle>
        </Header>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número de Pessoas"
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Período de Limpeza (dias)"
          type="number"
          value={cleaningPeriod}
          onChange={(e) => setCleaningPeriod(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleCreate}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Criar Apartamento
        </Button>
      </ModalContent>
    </Modal>
  );
};
