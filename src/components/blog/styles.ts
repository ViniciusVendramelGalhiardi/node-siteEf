import styled from "styled-components";

interface props {
  width?: number;
  image?: string;
  padding?: string;
  center?: boolean;
  size?: string;
  bold?: boolean;
  color?: string;
  family?: string;
  lineHeight?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div<props>`
  text-align: ${({ center }) => (center ? "center" : "left")};
  font-family: ${({ family }) => family};
  font-size: ${({ size }) => size};
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
  line-height: ${({ lineHeight }) => (lineHeight ? "32px" : "")};
`;

export const Section = styled.div<props>`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  padding: ${({ padding }) => padding};
  background-color: ${({ color }) => (color ? color : "#FFF")};
`;

export const Row = styled.div`
  flex: 1;
  display: flex;

  @media (max-width: 798px) {
    flex-wrap: wrap;
  }
`;

export const Column = styled.div<props>`
  width: ${({ width }) => width + "%"};
  padding: ${({ padding }) => (padding ? padding : "0px")};
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  gap: 5px;

  @media (max-width: 798px) {
    width: 100%;
  }
`;
