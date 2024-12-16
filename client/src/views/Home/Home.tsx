import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Apartments } from "../Apartments";
import { Residents } from "../Residents";
import { Container, SidebarContainer, ContentContainer } from "./Home.styles";

export const Home = () => {
  return (
    <Router>
      <Container>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Apartments />} />
            <Route path="/apartments/:apartmentId" element={<Residents />} />
          </Routes>
        </ContentContainer>
      </Container>
    </Router>
  );
};
