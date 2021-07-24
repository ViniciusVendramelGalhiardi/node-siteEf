import styled from "styled-components";

interface props {
  color?: string;
  image?: string;
}

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  outline: none;

  @media (max-width: 1330px) {
    width: 90%;
  }

  @media (max-width: 1130px) {
    overflow: auto;
    white-space: nowrap;
    gap: 20px;
  }
`;

export const Card = styled.div`
  width: 310px;
  min-width: 310px;
  height: 488px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-radius: 20px;
  background-color: #6d9af2;
`;

export const CardTitle = styled.div<props>`
  width: 100%;
  padding: 50px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
`;

export const CardImage = styled.div<props>`
  width: 245px;
  height: 258px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const CardFooter = styled.div`
  width: 100%;
  height: 126px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #dedede;
`;
