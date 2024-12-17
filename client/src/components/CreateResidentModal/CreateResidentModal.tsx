import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContent, Header, ModalTitle } from "./CreateResidentModal.styles";
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
        <Header>
          <IconButton
            onClick={onClose}
            data-testid="close-button"
            style={{
              alignSelf: "flex-end",
              padding: 0,
              marginTop: "-16px",
              marginRight: "-16px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <ModalTitle>Adicionar Novo Residente</ModalTitle>
        </Header>

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
          inputProps={{ "data-testid": "cleaning-order-select" }}
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
