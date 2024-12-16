import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmModal } from "./ConfirmModal";
import { ThemeProvider } from "../../styles/ThemeProvider";

describe("ConfirmModal", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const text = "Tem certeza que deseja deletar este item?";

  beforeEach(() => {
    onClose.mockClear();
    onConfirm.mockClear();
  });

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test("renders the modal with the correct text", () => {
    renderWithTheme(
      <ConfirmModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        text={text}
      />
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("calls onConfirm when the confirm button is clicked", () => {
    renderWithTheme(
      <ConfirmModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        text={text}
      />
    );
    fireEvent.click(screen.getByText("Confirmar"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when the cancel button is clicked", () => {
    renderWithTheme(
      <ConfirmModal
        open={true}
        onClose={onClose}
        onConfirm={onConfirm}
        text={text}
      />
    );
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("does not render the modal when open is false", () => {
    renderWithTheme(
      <ConfirmModal
        open={false}
        onClose={onClose}
        onConfirm={onConfirm}
        text={text}
      />
    );
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
});
