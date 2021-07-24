import styled from "styled-components";

interface props {
  center?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  padding?: string;
  margin?: string;
  checked?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 301px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  background-color: #f0f0f0;
  border-radius: 10px;
`;

export const Text = styled.div<props>`
  display: flex;
  font-family: Open Sans;
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
  text-align: ${({ center }) => (center ? "center" : "left")};
`;

export const Row = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: ${({ margin }) => margin};
`;

export const Column = styled.div<props>`
  flex: 1;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const Box = styled.div<props>`
  width: 37px;
  height: 37px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ checked }) => (checked ? "#0878D3" : "#A8A8A8")};
`;

export const BoxContent = styled.div<props>`
  width: 25px;
  height: 25px;
  border-radius: 7px;
  background-color: ${({ checked }) => (checked ? "#0878D3" : "transparent")};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const InputContainer = styled.div<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding};
`;
