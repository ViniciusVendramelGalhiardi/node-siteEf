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
  margin-top: 20px;
`;

export const Button = styled.div`
  width: 250px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b7b7b7;
  border-radius: 5px;
  padding: 0px 10px;
  gap: 10px;
  cursor: pointer;
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
  flex: 1;
  margin-left: 20px;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 13px;
  color: #797979;
`;
