import styled from "styled-components";
interface props {
  color?: string;
  image?: string;
}

export const Container = styled.div<props>`
  width: 100%;
  min-height: 100%;
  position: relative;
  padding: 0px 100px;
  background-color: #0b0b0b;

  @media (max-width: 736px) {
    padding: 0px;
  }
`;

export const ControlsContainer = styled.div<props>`
  width: 100%;
  height: 100px;
  display: flex;
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 0px 100px;

  @media (max-width: 946px) {
    gap: 20px;
  }

  @media (max-width: 736px) {
    padding: 0px;
  }
`;

export const Control = styled.div<props>`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid ${({ color }) => color};
  cursor: pointer;

  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 736px) {
    width: 50px;
    height: 50px;
    background-size: 10px 20px;
  }
`;
