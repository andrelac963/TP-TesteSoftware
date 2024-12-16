import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateApartmentModal } from "./CreateApartmentModal";
import { ThemeProvider } from "../../styles/ThemeProvider";
describe("CreateApartmentModal", () => {
  const onClose = jest.fn();
  const onCreate = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onCreate.mockClear();
  });

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test("renders the modal with the correct fields and default values", () => {
    renderWithTheme(
      <CreateApartmentModal open={true} onClose={onClose} onCreate={onCreate} />
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de Pessoas")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Período de Limpeza (dias)")
    ).toBeInTheDocument();
    expect(screen.getByText("Adicionar Novo Apartamento")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar apartamento/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Número de Pessoas")).toHaveValue(0);
    expect(screen.getByLabelText("Período de Limpeza (dias)")).toHaveValue(0);
  });

  test("calls onCreate with the correct values when the create button is clicked", async () => {
    renderWithTheme(
      <CreateApartmentModal open={true} onClose={onClose} onCreate={onCreate} />
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Apartment 1" },
    });
    fireEvent.change(screen.getByLabelText("Número de Pessoas"), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText("Período de Limpeza (dias)"), {
      target: { value: 7 },
    });
    fireEvent.click(screen.getByRole("button", { name: /criar apartamento/i }));

    expect(onCreate).toHaveBeenCalledWith("Apartment 1", 3, 7);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking outside the modal", () => {
    renderWithTheme(
      <CreateApartmentModal open={true} onClose={onClose} onCreate={onCreate} />
    );

    fireEvent.mouseDown(document);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("does not render the modal when open is false", () => {
    renderWithTheme(
      <CreateApartmentModal
        open={false}
        onClose={onClose}
        onCreate={onCreate}
      />
    );

    expect(
      screen.queryByText("Adicionar Novo Apartamento")
    ).not.toBeInTheDocument();
  });
});
