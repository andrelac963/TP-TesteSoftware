import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Apartments } from "./Apartments";
import { ThemeProvider } from "../../styles/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { createApartment } from "../../services/apartments/createApartment";
import { deleteApartment } from "../../services/apartments/deleteApartment";
import { getApartments } from "../../services/apartments/getApartments";

jest.mock("../../services/apartments");

const mockApartments = [
  { id: 1, name: "Apartment 1", numberOfPeople: 3, cleaningPeriod: 7 },
  { id: 2, name: "Apartment 2", numberOfPeople: 4, cleaningPeriod: 10 },
];

describe("Apartments", () => {
  beforeEach(() => {
    (getApartments as jest.Mock).mockResolvedValue(mockApartments);
    (createApartment as jest.Mock).mockResolvedValue({
      id: 3,
      name: "Apartment 3",
      numberOfPeople: 2,
      cleaningPeriod: 5,
    });
    (deleteApartment as jest.Mock).mockResolvedValue({});
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider>
        <Router>{ui}</Router>
      </ThemeProvider>
    );
  };

  test("renders the list of apartments", async () => {
    renderWithProviders(<Apartments />);
    expect(await screen.findByText("Apartment 1")).toBeInTheDocument();
    expect(await screen.findByText("Apartment 2")).toBeInTheDocument();
  });

  test("opens the create apartment modal when the button is clicked", () => {
    renderWithProviders(<Apartments />);
    fireEvent.click(screen.getByText("Adicionar Apartamento"));
    expect(screen.getByText("Adicionar Novo Apartamento")).toBeInTheDocument();
  });

  test("calls createApartment and updates the list when a new apartment is created", async () => {
    renderWithProviders(<Apartments />);
    fireEvent.click(screen.getByText("Adicionar Apartamento"));

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Apartment 3" },
    });
    fireEvent.change(screen.getByLabelText("Número de Pessoas"), {
      target: { value: 2 },
    });
    fireEvent.change(screen.getByLabelText("Período de Limpeza (dias)"), {
      target: { value: 5 },
    });
    fireEvent.click(screen.getByRole("button", { name: /criar apartamento/i }));

    expect(await screen.findByText("Apartment 3")).toBeInTheDocument();
  });

  test("calls deleteApartment and updates the list when an apartment is deleted", async () => {
    renderWithProviders(<Apartments />);
    expect(await screen.findByText("Apartment 1")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(await screen.queryByText("Apartment 1")).not.toBeInTheDocument();
  });
});
