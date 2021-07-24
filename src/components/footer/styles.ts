import styled, { css } from "styled-components";

interface props {
  bottom?: string;
  marginBottom?: boolean;
  pointer?: boolean;
  image?: string;
  width?: string;
  small?: boolean;
  topMobile?: boolean;
  invisibleMobile?: boolean;
  flex?: number;
  gap?: string;
  color?: string;
  display?: boolean;
}

export const Container = styled.div<props>`
  width: 100%;
  display: ${({ display }) => (display ? "none" : "flex")};
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 40px;
  align-items: flex-start;
  justify-content: space-between;
  background-color: rgba(15, 34, 77, 1);

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 468px) {
    padding: 20px;
  }
`;

export const WrapperTop = styled.div<props>`
  width: 100%;
  display: flex;
  padding: 40px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  background-color: ${({ color }) => color};

  @media (max-width: 968px) {
    flex-wrap: wrap;
    flex-direction: column;
    padding: 40px;
    gap: 40px;
  }

  @media (max-width: 468px) {
    padding: 20px;
  }
`;

export const ContentTop = styled.div<props>`
  flex: ${({ flex }) => flex};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ gap }) => gap};

  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const TextTop = styled.div`
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: #12151d;
  line-height: 2;
`;

export const BoxLinks = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: 50%;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Box = styled.div<props>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  ${({ topMobile }) =>
    topMobile &&
    css`
      @media (max-width: 1024px) {
        margin-top: 30px;
      }
    `};
`;

export const Title = styled.div<props>`
  font-family: Muli;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: rgba(220, 220, 220, 1);
  margin-bottom: ${({ bottom }) => bottom};
`;

export const SubTitle = styled.div<props>`
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: ${({ small }) => (small ? "14px" : "15px")};
  color: rgba(220, 220, 220, 1);
  margin-bottom: ${({ marginBottom }) => (marginBottom ? "20px" : "0px")};

  ${({ invisibleMobile }) =>
    invisibleMobile &&
    css`
      @media (max-width: 1024px) {
        display: none;
      }
    `};
`;

export const Line = styled.div`
  width: 70%;
  height: 1px;
  margin: 5px 0px;
  background-color: rgba(220, 220, 220, 1);

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const BoxSecurity = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Security = styled.div`
  width: 165px;
  height: 110px;
  background-color: #fff;

  @media (max-width: 480px) {
    height: 50px;
  }
`;

export const SecurityImage = styled.div<props>`
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 150px 90px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    background-size: contain;
  }
`;

export const PaymentMethod = styled.div`
  width: 95%;
  margin-top: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 468px) {
    margin-top: 15px;
    margin-bottom: 20px;
  }
`;

export const CopyrightWeb = styled.div`
  display: block;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const CopyrightMobile = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

export const Method = styled.div<props>`
  width: ${({ width }) => width};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TermsAndConditionsWeb = styled.div<props>`
  display: block;
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const TermsAndConditionsMobile = styled.div<props>`
  display: none;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 30px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const TermsAndConditionsText = styled.div<props>`
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: ${({ small }) => (small ? "12px" : "15px")};
  color: rgba(220, 220, 220, 1);
  margin-bottom: ${({ marginBottom }) => (marginBottom ? "20px" : "0px")};
`;
