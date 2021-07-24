import styled from "styled-components";

interface props {
  center?: boolean;
  bold?: boolean;
  size?: string;
  color?: string;
  padding?: string;
}

export const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  background-color: #f0f0f0;
  border-radius: 10px;
  outline: none;
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

export const Buttons = styled.div`
  width: 100%;
  padding: 30px 10px 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 320px) {
    gap: 10px;
  }
`;
