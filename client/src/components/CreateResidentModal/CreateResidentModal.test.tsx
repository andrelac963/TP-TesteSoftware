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

    const nameField = screen.getByLabelText("Nome");
    expect(nameField).toBeInTheDocument();
    expect(nameField).toHaveValue("");

    expect(screen.getByText("Adicionar Novo Residente")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /criar residente/i })
    ).toBeInTheDocument();

    const cleaningOrderSelect = screen.getByTestId("cleaning-order-select");
    expect(cleaningOrderSelect).toBeInTheDocument();
    expect(cleaningOrderSelect).toHaveValue("1");
  });

  test("calls onCreate with the correct values when the create button is clicked", async () => {
    renderWithTheme(
      <CreateResidentModal
        open={true}
        onClose={onClose}
        onCreate={onCreate}
        maxCleaningOrder={maxCleaningOrder}
      />
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Adicionar Novo Residente")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar residente/i })
    ).toBeInTheDocument();

    const cleaningOrderSelect = screen.getByTestId("cleaning-order-select");
    expect(cleaningOrderSelect).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(cleaningOrderSelect, { target: { value: "1" } });

    fireEvent.click(screen.getByRole("button", { name: /criar residente/i }));

    expect(onCreate).toHaveBeenCalledWith("John Doe", 1);
  });

  test("calls onClose when clicking the close icon", () => {
    renderWithTheme(
      <CreateResidentModal
        open={true}
        onClose={onClose}
        onCreate={onCreate}
        maxCleaningOrder={maxCleaningOrder}
      />
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

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
