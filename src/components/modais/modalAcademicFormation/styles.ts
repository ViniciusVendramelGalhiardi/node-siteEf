import styled from "styled-components";
import pdf from "assets/icons/png/pdf.png";
import pdfUpload from "assets/icons/png/pdfUpload.png";

interface props {
  flex?: number;
  center?: boolean;
}

export const Container = styled.div`
  width: 55%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
  overflow: scroll;

  @media (max-width: 1222px) {
    width: 70%;
  }

  @media (max-width: 968px) {
    width: 80%;
  }

  @media (max-width: 848px) {
    width: 90%;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 47px;
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #dedede;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-family: Open Sans;
  font-size: 15px;
  font-weight: 500;
  color: #343434;

  @media (max-width: 320px) {
    font-size: 13px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 47px);
  padding: 40px 30px;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
  }

  @media (max-width: 342px) {
    padding: 20px 10px;
  }
`;

export const Column = styled.div<props>`
  flex: ${({ flex }) => flex};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div<props>`
  display: flex;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  gap: 20px;
`;

export const Label = styled.div`
  flex: 1;
  display: flex;
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 300;
  color: #797979;
`;

export const Title = styled.div`
  width: 147px;
  padding: 0px 5px;
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  color: #0878d3;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubTitle = styled.div`
  font-family: Open Sans;
  font-size: 12px;
  font-weight: 300;
  color: #797979;
`;

export const Required = styled.div<props>`
  color: red;
`;

export const IconContainer = styled.div<props>`
  width: 147px;
  height: 147px;
  padding: 5px;
  border: 1px dashed #0878d3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

export const Icon = styled.div<props>`
  width: 43px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${pdf});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const IconMobile = styled.div<props>`
  width: 54px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${pdfUpload});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ButtonContainer = styled.div<props>`
  width: 100%;
  padding: 10px 10px 40px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
