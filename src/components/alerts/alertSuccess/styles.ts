import styled from "styled-components";
import checked from "assets/icons/png/checked.png";

interface props {
  image?: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  outline: none;
  gap: 20px;
`;

export const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const IconContainer = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 45px;
  border: 4px solid #fff;
`;

export const Icon = styled.div`
  width: 40px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${checked});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Message = styled.div`
  font-family: Open Sans;
  font-size: 30px;
  font-weight: 600;
  color: #fff;

  @media (max-width: 492px) {
    font-size: 20px;
    padding-top: 10%;
  }
`;

export const Image = styled.div<props>`
  width: 492px;
  height: 406px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 492px) {
    width: 100%;
    height: 280px;
  }

  @media (max-width: 340px) {
    width: 100%;
    height: 250px;
  }
`;
