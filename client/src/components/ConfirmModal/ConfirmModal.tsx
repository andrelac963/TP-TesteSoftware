import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ModalContent, ModalTitle } from "./ConfirmModal.styles";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  text,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <ModalTitle>{text}</ModalTitle>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          style={{ marginRight: "16px" }}
        >
          Confirmar
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </ModalContent>
    </Modal>
  );
};
