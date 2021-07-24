import styled, { css } from "styled-components";

interface props {
  fixedWidth?: boolean;
  width?: string;
  height?: string;
  color?: string;
  textColor?: string;
  type?: string;
  fontSmall?: boolean;
}

export const Container = styled.div<props>`
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => (color ? color : "#0878D3")};
  color: ${({ textColor }) => (textColor ? textColor : "#FFF")};
  border-radius: 30px;
  font-family: Open Sans;
  font-size: 14px;
  cursor: pointer;

  ${({ fixedWidth, type, width }) =>
    fixedWidth &&
    type !== "green" &&
    !width &&
    css`
      width: 180px;
      min-width: 180px;
      height: 46px;
    `};

  ${({ type }) =>
    type === "green" &&
    css`
      height: 50px;
      border-radius: 5px;
      font-family: Muli;
      font-size: 16px;
    `};

  ${({ fixedWidth, type, width }) =>
    fixedWidth &&
    type === "green" &&
    !width &&
    css`
      width: 303px;
      height: 50px;
    `};

  ${({ fontSmall }) =>
    fontSmall &&
    css`
      @media (max-width: 768px) {
        font-size: 14px;
      }

      @media (max-width: 396px) {
        font-size: 12px;
      }

      @media (max-width: 320px) {
        font-size: 10px;
      }
    `};

  @media (max-width: 440px) {
    border-radius: 5px;
  }
`;
