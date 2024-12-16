import { createContext, useState, ReactNode, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F2F4F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#2196f3",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1976d2",
          },
        },
        containedSecondary: {
          backgroundColor: "#f44336",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1C1C1D",
      paper: "#252728",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e88e5",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        },
        containedSecondary: {
          backgroundColor: "#f44336",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
