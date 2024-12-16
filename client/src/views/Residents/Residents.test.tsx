import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Residents } from "./Residents";
import { ThemeProvider } from "../../styles/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { createResident } from "../../services/residents/createResident";
import { deleteResident } from "../../services/residents/deleteResident";
import { getResidents } from "../../services/residents/getResidents";
import { getApartment } from "../../services/apartments/getApartment";

jest.mock("../../services/residents");
jest.mock("../../services/apartments");

const mockResidents = [
  { id: 1, name: "Resident 1", cleaningOrder: 1, apartmentId: 1 },
  { id: 2, name: "Resident 2", cleaningOrder: 2, apartmentId: 1 },
];

const mockApartment = { id: 1, numberOfPeople: 3 };

describe("Residents", () => {
  beforeEach(() => {
    (getResidents as jest.Mock).mockResolvedValue(mockResidents);
    (createResident as jest.Mock).mockResolvedValue({
      id: 3,
      name: "Resident 3",
      cleaningOrder: 3,
      apartmentId: 1,
    });
    (deleteResident as jest.Mock).mockResolvedValue({});
    (getApartment as jest.Mock).mockResolvedValue(mockApartment);
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider>
        <Router>{ui}</Router>
      </ThemeProvider>
    );
  };

  test("renders the list of residents", async () => {
    renderWithProviders(<Residents />);
    expect(await screen.findByText("Resident 1")).toBeInTheDocument();
    expect(await screen.findByText("Resident 2")).toBeInTheDocument();
  });

  test("opens the create resident modal when the button is clicked", () => {
    renderWithProviders(<Residents />);
    fireEvent.click(screen.getByText("Adicionar Residente"));
    expect(screen.getByText("Adicionar Novo Residente")).toBeInTheDocument();
  });

  test("calls createResident and updates the list when a new resident is created", async () => {
    renderWithProviders(<Residents />);
    fireEvent.click(screen.getByText("Adicionar Residente"));

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Resident 3" },
    });
    fireEvent.change(screen.getByLabelText("Ordem de Limpeza"), {
      target: { value: 3 },
    });
    fireEvent.click(screen.getByRole("button", { name: /criar residente/i }));

    expect(await screen.findByText("Resident 3")).toBeInTheDocument();
  });

  test("calls deleteResident and updates the list when a resident is deleted", async () => {
    renderWithProviders(<Residents />);
    expect(await screen.findByText("Resident 1")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

    await waitFor(() => {
      expect(screen.queryByText("Resident 1")).not.toBeInTheDocument();
    });
  });
});
