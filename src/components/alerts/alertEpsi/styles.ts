import styled from "styled-components";

interface props {
  image?: string;
  padding?: string;
  bold?: boolean;
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
  padding: 20px;
`;

export const IconContainer = styled.div`
  width: 93px;
  height: 97px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div<props>`
  width: 93px;
  height: 97px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Message = styled.div<props>`
  text-align: center;
  font-family: Open Sans;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  padding: ${({ padding }) => padding};

  @media (max-width: 414px) {
    font-size: 20px;
  }
`;

export const SubMessage = styled.div<props>`
  text-align: center;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  color: #fff;
  padding: ${({ padding }) => padding};

  @media (max-width: 414px) {
    font-size: 13px;
  }
`;

export const IconText = styled.div<props>`
  font-family: Open Sans;
  font-size: 90px;
  font-weight: 600;
  color: #fff;
`;
