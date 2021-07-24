import styled from "styled-components";

interface props {
  checked?: boolean;
  error?: boolean;
  color?: string;
}

export const Container = styled.div<props>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Box = styled.div<props>`
  width: 18px;
  height: 18px;
  border: 1px solid
    ${({ checked, error }) =>
      checked && !error ? "#FAFAFA" : !checked && error ? "red" : "#B2B2B2"};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;
`;

export const Content = styled.div<props>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: ${({ checked, color }) =>
    checked && color ? color : checked && !color ? "#0878D3" : "#FFF"};

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;
`;

export const Label = styled.div<props>`
  flex: 1;
  color: ${({ error, color }) => (error ? "red" : color ? color : "#0878d3")};
  font-family: Open Sans;
  font-weight: 400;
  font-size: 14px;
`;
