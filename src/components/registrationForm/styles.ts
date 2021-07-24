import styled from "styled-components";

interface props {}

export const Container = styled.div<props>`
  width: 453px;
  display: flex;
  position: relative;
`;

export const Content = styled.div<props>`
  width: 100%;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  gap: 30px;

  @media (max-width: 968px) {
    padding: 30px 20px;
    background-color: rgba(240, 240, 240, 0.9);
  }
`;
