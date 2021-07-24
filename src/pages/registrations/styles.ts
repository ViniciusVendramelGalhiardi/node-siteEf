import styled, { css } from "styled-components";
import droplist from "assets/icons/png/droplist.png";
import upload from "assets/icons/png/upload.png";
import like from "assets/icons/png/like.png";

interface props {
  gap?: string;
  actived?: boolean;
  completed?: boolean;
  image?: string;
  padding?: string;
  pointer?: boolean;
  start?: boolean;
  width?: string;
  height?: string;
  bold?: boolean;
  margin?: string;
  addDependents?: boolean;
  center?: boolean;
  end?: boolean;
  flex?: boolean;
  size?: string;
  notMargin?: boolean;
  responsive?: boolean;
  verified?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding};
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 10px 0px 10px;

  font-family: Open Sans;
  font-weight: 600;
  font-size: 30px;
  color: #002464;
`;

export const SubTitle = styled.div<props>`
  ${({ flex }) =>
    !flex &&
    css`
      width: 100%;
    `}

  ${({ flex }) =>
    flex &&
    css`
      flex: 1;
    `}

  display: flex;
  align-items: center;
  justify-content: ${({ start }) => (start ? "flex-start" : "center")};
  padding: ${({ padding }) => padding};

  font-family: Open Sans;
  font-weight: 600;
  font-size: 15px;
  color: #797979;

  @media (max-width: 331px) {
    font-size: 13px;
  }
`;

export const SubTitleMobile = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ start }) => (start ? "flex-start" : "center")};
  padding: ${({ padding }) => padding};

  font-family: Open Sans;
  font-weight: 400;
  font-size: 13px;
  color: #797979;
  text-align: center;
`;

export const Label = styled.div<props>`
  width: ${({ width }) => (width ? width : "250px")};
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  padding: ${({ padding }) => padding};

  font-family: Open Sans;
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  font-size: ${({ bold, size }) => (size ? size : bold ? "15px" : "13px")};
  color: #797979;
`;

export const Required = styled.div<props>`
  color: red;
`;

export const Underlined = styled.div<props>`
  text-decoration: underline;
`;

export const Steps = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Step = styled.div<props>`
  width: ${({ actived }) => (actived ? "17px" : "13px")};
  height: ${({ actived }) => (actived ? "17px" : "13px")};
  border: 2px solid
    ${({ actived, completed }) =>
      actived || completed ? "#0878D3" : "#A2A2A2"};
  border-radius: 50%;
  background-color: ${({ completed }) => (completed ? "#0878D3" : "#FFF")};

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;
`;

export const Line = styled.div<props>`
  width: 29px;
  border-bottom: 2px solid
    ${({ completed }) => (completed ? "#0878D3" : "#A2A2A2")};

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;

  @media (max-width: 320px) {
    width: 20px;
  }
`;

export const ProfileImage = styled.div`
  width: 83px;
  height: 83px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: rgba(85, 96, 128, 1);
  border: 1px solid #fff;
  border-radius: 50%;
  padding-top: 15px;
  cursor: pointer;
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
  width: 83px;
  height: 83px;
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
  margin-top: ${({ notMargin }) => (notMargin ? "0px" : "20px")};
  display: flex;
  align-items: center;
  justify-content: ${({ start }) => (start ? "flex-start" : "center")};
  gap: 15px;
  padding: ${({ padding }) => padding};
`;

export const TextAreaContainer = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: ${({ padding }) => padding};
`;

export const LimitCharacters = styled.div<props>`
  margin-top: 10px;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 13px;
  color: #797979;
`;

export const ButtonContainer = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
`;

export const TermsAndConditions = styled.div<props>`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: ${({ padding }) => padding};
`;

export const Image = styled.div<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) => (margin ? margin : "0px")};

  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Row = styled.div<props>`
  width: ${({ width }) => (width ? width : "auto")};
  display: flex;
  align-items: ${({ start }) => (start ? "flex-start" : "center")};
  gap: ${({ gap }) => (gap ? gap : "0px")};
  padding: ${({ padding }) => padding};
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};

  @media (max-width: 843px) {
    ${({ responsive }) =>
      responsive &&
      css`
        flex-wrap: wrap;
        flex-direction: column;
      `}
  }
`;

export const Column = styled.div<props>`
  ${({ flex }) =>
    flex &&
    css`
      flex: 1;
    `}

  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "0px")};
  align-items: ${({ center, end }) =>
    center ? "center" : end ? "flex-end" : "flex-start"};

  @media (max-width: 843px) {
    ${({ responsive }) =>
      responsive &&
      css`
        width: 100%;
      `}
  }
`;

export const Scroll = styled.div<props>`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "0px")};
  padding: ${({ padding }) => padding};
  /* border: 1px solid red; */
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #9d9d9d;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0878d3;
    border-radius: 20px;
  }
`;

export const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 1px solid #b2b2b2;
`;

export const AddInfosContainer = styled.div<props>`
  width: 411px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  background-color: #f7f7f7;
  gap: 20px;

  @media (max-width: 630px) {
    width: 90%;
  }
`;

export const AddInfosContent = styled.div<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 20px;
  cursor: pointer;

  @media (max-width: 630px) {
    padding: 0px;
    gap: 10px;
  }
`;

export const IconAdd = styled.div<props>`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #0878d3;

  font-family: Open Sans;
  font-weight: 500;
  font-size: 30px;
  color: #fff;
`;

export const AddInfosLabel = styled.div<props>`
  flex: 1;
  font-family: Open Sans;
  font-weight: 500;
  font-size: 15px;
  color: #0878d3;
`;

export const AddInfosDescription = styled.div<props>`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 13px;
  color: #797979;

  @media (max-width: 394px) {
    font-size: 11px;
  }
`;

export const OptionPopover = styled.div<props>`
  padding: 10px;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 12px;
  color: #fff;
  cursor: pointer;

  @media (max-width: 394px) {
    font-size: 11px;
  }
`;

export const AddInfos = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border: 1px solid #0878d3;
  border-radius: 5px;
  gap: 5px;
`;

export const Icon = styled.div<props>`
  width: 29px;
  height: 7px;
  margin: ${({ margin }) => margin};
  display: flex;
  background-image: url(${droplist});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;

export const ButtonEpsi = styled.div<props>`
  width: 251px;
  height: 53px;
  padding: 10px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ verified }) => (verified ? "none" : "1px solid #0878d3")};
  border-radius: 1px;
  border-radius: 30px;
  background-color: ${({ verified }) => (verified ? "#8CC63F" : "#FFF")};

  font-family: Open Sans;
  font-weight: 600;
  font-size: 14px;
  color: ${({ verified }) => (verified ? "#FFF" : "#0878d3")};
  cursor: pointer;

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;

  @media (max-width: 768px) {
    border-radius: 5px;
  }
`;

export const IconEpsi = styled.div<props>`
  width: 32px;
  height: 32px;
  display: flex;
  background-image: url(${like});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
