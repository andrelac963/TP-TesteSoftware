import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ModalContent, ModalTitle } from "./CreateResidentModal.styles";
import { MenuItem, Select } from "@mui/material";

interface CreateResidentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, cleaningOrder: number) => void;
  maxCleaningOrder: number;
}

export const CreateResidentModal: React.FC<CreateResidentModalProps> = ({
  open,
  onClose,
  onCreate,
  maxCleaningOrder,
}) => {
  const [name, setName] = useState("");
  const [cleaningOrder, setCleaningOrder] = useState<number | string>(1);

  useEffect(() => {
    if (open) {
      setCleaningOrder(1);
    }
  }, [open]);

  const handleCreate = () => {
    onCreate(name, Number(cleaningOrder));
    setName("");
    setCleaningOrder(1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <ModalTitle>Adicionar Novo Residente</ModalTitle>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Select
          label="Ordem de Limpeza"
          value={cleaningOrder}
          onChange={(e) => setCleaningOrder(e.target.value as number)}
          fullWidth
        >
          {Array.from({ length: maxCleaningOrder }, (_, i) => i + 1).map(
            (option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          )}
        </Select>
        <Button
          variant="contained"
          onClick={handleCreate}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Criar Residente
        </Button>
      </ModalContent>
    </Modal>
  );
};
