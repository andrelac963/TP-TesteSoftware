import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "../../styles/ThemeProvider";

describe("Sidebar", () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test("renders the logo and title", () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Organização de Fachina")).toBeInTheDocument();
  });

  test("toggles the theme when the switch is clicked", () => {
    renderWithProviders(<Sidebar />);
    const switchElement = screen.getByLabelText("Modo Escuro");
    expect(switchElement).toBeInTheDocument();

    // Initial state should be light theme
    expect(switchElement).not.toBeChecked();

    // Toggle to dark theme
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    // Toggle back to light theme
    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });
});
