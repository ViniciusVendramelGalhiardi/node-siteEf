import styled from "styled-components";

interface props {
  color?: string;
  image?: string;
}

export const Container = styled.div`
  width: 731px;
  height: 500px;
  display: flex;
  border-radius: 20px;
  outline: none;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 668px) {
    width: 90%;
  }

  @media (max-width: 630px) {
    height: 90%;
    flex-wrap: wrap;
    gap: 40px;
  }
`;

export const Access = styled.div`
  width: 423px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  @media (max-width: 630px) {
    width: 100%;
    border-radius: 20px;
  }
`;

export const InputContainer = styled.div`
  margin-top: 20px;
`;

export const Card = styled.div`
  width: 308px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: #6d9af2;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (max-width: 630px) {
    width: 100%;
    height: 500px;
    border-radius: 20px;
  }
`;

export const CardImage = styled.div<props>`
  width: 245px;
  height: 260px;
  margin-top: 67px;
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
  border-bottom-right-radius: 20px;
  background-color: #dedede;

  @media (max-width: 630px) {
    border-bottom-left-radius: 20px;
  }
`;

export const Title = styled.div<props>`
  width: 100%;
  padding: 20px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
  font-family: Open Sans;
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 630px) {
    padding: 10px;
  }
`;

export const RecoverPassword = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0878d3;
  text-decoration: underline;
  font-family: Trebuchet MS;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
`;
