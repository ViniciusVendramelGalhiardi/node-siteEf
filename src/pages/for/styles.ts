import styled from "styled-components";

interface props {
  gap?: string;
  left?: boolean;
  right?: boolean;
  size?: string;
  bold?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 968px) {
    flex-wrap: wrap;
  }
`;

export const Column = styled.div<props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ gap }) => (gap ? gap : "0px")};

  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const RegistrationFormContainer = styled.div`
  width: 453px;
  display: flex;
  position: relative;
  margin-top: 40px;

  @media (max-width: 968px) {
    width: 100%;
    margin-top: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Span = styled.div<props>`
  color: #395785;
  margin-right: 5px;
  font-weight: 600;
`;

export const DotGreen = styled.div<props>`
  width: 15px;
  height: 15px;
  background-color: #8cc63f;
  border-radius: 50%;
`;

export const SectionCard = styled.div<props>`
  width: 400px;
  height: ${({ left, right }) => (left || right ? "800px" : "730px")};
  padding: 20px;
  border-radius: 10px;
  border-top-left-radius: ${({ left }) => (left ? "200px" : "10px")};
  border-bottom-right-radius: ${({ left }) => (left ? "200px" : "10px")};
  border-bottom-left-radius: ${({ right }) => (right ? "200px" : "10px")};
  border-top-right-radius: ${({ right }) => (right ? "200px" : "10px")};
  background-color: #fff;

  @media (max-width: 1260px) {
    height: auto;
    padding-right: ${({ left }) => (left ? "50px" : "20px")};
  }

  @media (max-width: 968px) {
    border-radius: 30px;
    padding-right: 30px;
  }
`;

export const SectionCardTitleContainer = styled.div<props>`
  width: 100%;
  height: 263px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-top-left-radius: ${({ left }) => (left ? "200px" : "10px")};
  border-top-right-radius: ${({ right }) => (right ? "200px" : "10px")};
  background-image: linear-gradient(#395785, #0f224d);
  color: #fff;
  gap: 10px;

  @media (max-width: 968px) {
    height: 154px;
    border-radius: 30px;
  }
`;

export const SectionCardTitle = styled.div<props>`
  margin-left: ${({ left }) => (left ? "20px" : "0px")};
  margin-right: ${({ right }) => (right ? "20px" : "0px")};
  color: #fff;
  font-family: Montserrat;
  font-weight: ${({ bold }) => (bold ? "600" : "400")};
  font-size: ${({ size }) => size};
  text-align: center;

  @media (max-width: 968px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

export const SectionCardDescription = styled.div<props>`
  flex: 1;
  color: #12151d;
  font-family: Muli;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;

  @media (max-width: 598px) {
    font-size: 13px;
  }
`;
