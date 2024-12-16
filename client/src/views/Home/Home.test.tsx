import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./Home";
import { ThemeProvider } from "../../styles/ThemeProvider";

describe("Home", () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider>
        <Router>{ui}</Router>
      </ThemeProvider>
    );
  };

  test("renders the Sidebar", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Organização de Fachina")).toBeInTheDocument();
  });

  test("renders the Apartments component by default", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Lista de Apartamentos")).toBeInTheDocument();
  });

  test("renders the Residents component when the route is /residents", () => {
    window.history.pushState({}, "Residents", "/residents");
    renderWithProviders(<Home />);
    expect(screen.getByText("Lista de Residentes")).toBeInTheDocument();
  });
});
