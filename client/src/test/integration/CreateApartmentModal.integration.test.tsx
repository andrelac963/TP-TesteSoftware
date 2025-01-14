import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateApartmentModal } from "../../components/CreateApartmentModal/CreateApartmentModal";
import { ThemeProvider } from "../../styles/ThemeProvider";

describe("CreateApartmentModal Integration", () => {
  const onClose = jest.fn();
  const onCreate = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onCreate.mockClear();
  });

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test("should render the modal with the correct fields and default values", () => {
    renderWithTheme(
      <CreateApartmentModal open={true} onClose={onClose} onCreate={onCreate} />
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de Pessoas")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Período de Limpeza (dias)")
    ).toBeInTheDocument();
    expect(screen.getByText("Adicionar Novo Apartamento")).toBeInTheDocument();
  });

  test("should call onCreate with the correct values when the create button is clicked", async () => {
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
  });

  test("should call onClose when clicking the close icon", () => {
    renderWithTheme(
      <CreateApartmentModal open={true} onClose={onClose} onCreate={onCreate} />
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("should not render the modal when open is false", () => {
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
