import styled from "styled-components";

interface props {
  image?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 325px) {
    width: 100%;
  }
`;

export const Button = styled.div`
  width: 290px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f224d;
  border-radius: 5px;
  gap: 10px;
  cursor: pointer;

  @media (max-width: 325px) {
    width: 100%;
  }
`;

export const Icon = styled.div<props>`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Text = styled.div`
  font-family: Muli;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`;
