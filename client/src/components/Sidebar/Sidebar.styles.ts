import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 32px;
  background: ${({ theme }) => theme.palette.background.paper};
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 150px;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  text-align: center;
`;

export const BottomContainer = styled.div`
  margin-top: auto;
`;