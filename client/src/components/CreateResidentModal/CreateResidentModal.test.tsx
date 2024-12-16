import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateResidentModal } from "./CreateResidentModal";
import { ThemeProvider } from "../../styles/ThemeProvider";

describe("CreateResidentModal", () => {
  const onClose = jest.fn();
  const onCreate = jest.fn();
  const maxCleaningOrder = 5;

  beforeEach(() => {
    onClose.mockClear();
    onCreate.mockClear();
  });

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test("renders the modal with the correct fields and default values", () => {
    renderWithTheme(
      <CreateResidentModal
        open={true}
        onClose={onClose}
        onCreate={onCreate}
        maxCleaningOrder={maxCleaningOrder}
      />
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Ordem de Limpeza")).toBeInTheDocument();
    expect(screen.getByText("Adicionar Novo Residente")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar residente/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Ordem de Limpeza")).toHaveValue(1);
  });

  test("calls onCreate with the correct values when the create button is clicked", () => {
    renderWithTheme(
      <CreateResidentModal
        open={true}
        onClose={onClose}
        onCreate={onCreate}
        maxCleaningOrder={maxCleaningOrder}
      />
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Ordem de Limpeza"), {
      target: { value: 3 },
    });
    fireEvent.click(screen.getByRole("button", { name: /criar residente/i }));

    expect(onCreate).toHaveBeenCalledWith("John Doe", 3);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking outside the modal", () => {
    renderWithTheme(
      <CreateResidentModal
        open={true}
        onClose={onClose}
        onCreate={onCreate}
        maxCleaningOrder={maxCleaningOrder}
      />
    );

    fireEvent.mouseDown(document);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("does not render the modal when open is false", () => {
    renderWithTheme(
      <CreateResidentModal
        open={false}
        onClose={onClose}
        onCreate={onCreate}
        maxCleaningOrder={maxCleaningOrder}
      />
    );

    expect(
      screen.queryByText("Adicionar Novo Residente")
    ).not.toBeInTheDocument();
  });
});
