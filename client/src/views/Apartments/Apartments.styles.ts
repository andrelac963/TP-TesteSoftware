import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const ApartmentList = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
    border: 3px solid #f0f0f0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const ApartmentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const ApartmentInfo = styled(Link)`
  display: flex;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: inherit;
`;

export const ApartmentDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin-left: 32px;
  margin-right: 16px;
`;
