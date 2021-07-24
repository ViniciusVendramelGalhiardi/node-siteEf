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

export const CardsContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  @media (max-width: 798px) {
    height: auto;
  }
`;

export const CardsBottom = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  padding: 50px;
  background-color: #fff;
`;

export const Cards = styled.div`
  width: 100%;
  padding: 0px 50px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: -72px;
  gap: 2px;
  overflow-x: scroll;

  @media (max-width: 798px) {
    position: relative;
    bottom: 0px;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media (max-width: 418px) {
    padding: 0px 20px;
  }
`;

export const Card = styled.div<props>`
  width: 315px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 418px) {
    width: 100%;
  }
`;
