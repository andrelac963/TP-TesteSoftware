import { useTheme } from "../../styles/ThemeProvider";
import {
  SidebarContainer,
  StyledLink,
  Logo,
  Title,
  BottomContainer,
} from "./Sidebar.styles";
import logo from "../../assets/logo.png";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Sidebar = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <SidebarContainer>
      <StyledLink to="/">
        <Logo src={logo} alt="Logo" />
        <Title>Organização de Fachina</Title>
      </StyledLink>
      <BottomContainer>
        <FormControlLabel
          control={<Switch checked={theme === "dark"} onChange={toggleTheme} />}
          label="Modo Escuro"
        />
      </BottomContainer>
    </SidebarContainer>
  );
};
