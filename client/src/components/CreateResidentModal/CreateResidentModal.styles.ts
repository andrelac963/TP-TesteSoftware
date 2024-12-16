import styled from "styled-components";
import Box from "@mui/material/Box";

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 32px;
  box-shadow: 24px;
  border-radius: 8px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 16px;
`;