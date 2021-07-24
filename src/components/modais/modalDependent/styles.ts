import styled, { css } from "styled-components";
import upload from "assets/icons/png/upload.png";

interface props {
  width?: string;
  height?: string;
  size?: string;
  padding?: string;
  gap?: string;
  margin?: string;
  color?: string;
  image?: string;
  actived?: boolean;
  completed?: boolean;
  center?: boolean;
  large?: boolean;
  step?: number;
  addDependents?: boolean;
  pointer?: boolean;
  left?: boolean;
  vertical?: boolean;
  marginBootom?: boolean;
  noWrap?: boolean;
}

export const Container = styled.div<props>`
  width: 730px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-radius: 5px;
  outline: none;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const Content = styled.div<props>`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  border-radius: 5px;

  @media (max-width: 630px) {
    position: relative;
    flex-wrap: wrap;
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
  font-weight: 600;
  color: #343434;

  @media (max-width: 320px) {
    font-size: 13px;
  }
`;

export const Title = styled.div<props>`
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) => padding};
  display: flex;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};

  font-family: Open Sans;
  font-weight: 600;
  font-size: 15px;
  color: #797979;

  @media (max-width: 630px) {
    ${({ center }) =>
      center &&
      css`
        text-align: center;
      `}
  }
`;

export const Column = styled.div<props>`
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 630px) {
    width: 100%;
  }
`;

export const Row = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: space-between;
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};

  @media (max-width: 630px) {
    ${({ noWrap }) =>
      !noWrap &&
      css`
        flex-wrap: wrap;
      `}
  }
`;

export const ProfileImage = styled.div<props>`
  width: ${({ width }) => (width ? width : "83px")};
  height: ${({ height }) => (height ? height : "83px")};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ marginBootom }) => (marginBootom ? "10px" : "0px")};
  background-color: rgba(85, 96, 128, 1);
  border: 1px solid #fff;
  border-radius: 50%;
  padding-top: 15px;
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
`;

export const ProfileImageIconUpload = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #069ade;
  border-radius: 50%;
  padding: 5px;
  right: -2px;
  bottom: -2px;

  background-image: url(${upload});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 15px 20px;
`;

export const ImageProfile = styled.div<props>`
  width: ${({ width }) => (width ? width : "83px")};
  height: ${({ height }) => (height ? height : "83px")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-top: -15px;
  margin-left: 0px;

  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const IconSvg = styled.svg`
  width: 55px;
  height: 70px;
`;

export const IconPath = styled.path`
  fill: rgba(231, 236, 237, 1);
`;

export const InputContainer = styled.div<props>`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: ${({ padding }) => padding};
`;

export const ButtonContainer = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
`;

export const Required = styled.div<props>`
  color: red;
`;
