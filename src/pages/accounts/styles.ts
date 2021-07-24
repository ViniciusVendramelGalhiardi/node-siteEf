import styled, { css } from "styled-components";
import droplist from "assets/icons/png/droplist.png";
import upload from "assets/icons/png/upload.png";

interface props {
  alignItems?: string;
  justifyContent?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  gap?: string;
  align?: string;
  bold?: boolean;
  size?: string;
  color?: string;
  flex?: boolean;
  image?: string;
  startMobile?: string;
  table?: boolean;
  column?: boolean;
  right?: string;
  bottom?: string;
  minWidth?: string;
  maxWidth?: string;
  verified?: boolean;
  wrap?: boolean;
  pointer?: boolean;
  open?: boolean;
  center?: boolean;
  disabled?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

export const AccessData = styled.div<props>`
  width: ${({ width }) => width};
  border-radius: 5px;
`;

export const AccessDataContent = styled.div<props>`
  width: 100%;
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  margin: ${({ margin }) => margin};
`;

export const Row = styled.div<props>`
  width: 100%;
  max-width: 1200px;
  display: flex;
  position: relative;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
  gap: ${({ gap }) => gap};

  /* border: 1px solid red; */

  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: wrap;
    `}

  ${({ startMobile }) =>
    startMobile &&
    css`
      @media (max-width: ${startMobile}) {
        flex-direction: column;
      }
    `}
`;

export const Column = styled.div<props>`
  ${({ flex }) =>
    flex &&
    css`
      flex: 1;
    `}

  ${({ table }) =>
    table &&
    css`
      @media (max-width: 1200px) {
        min-width: 200px;
      }

      @media (max-width: 344px) {
        min-width: 100%;
      }
    `}

    min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};

  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
  /* border: 1px solid black; */
`;

export const Scroll = styled.div<props>`
  max-width: 100%;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  gap: ${({ gap }) => gap};
  overflow: scroll;
  white-space: nowrap;
`;

export const Text = styled.div<props>`
  display: flex;
  font-family: Open Sans;
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
  text-align: ${({ center }) => (center ? "center" : "left")};
`;

export const ButtonScheduling = styled.div<props>`
  width: ${({ width }) => width};
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 30px;
  padding: ${({ padding }) => padding};
  cursor: pointer;

  @media (max-width: 440px) {
    width: 100%;
    border-radius: 5px;
  }

  @media (max-width: 416px) {
    gap: 20px;
  }
`;

export const IconMore = styled.div<props>`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0878d3;
  border-radius: 50%;
`;

export const DependentsContainer = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 20px;
  background-color: #fff;
  border-radius: 5px;
  flex-wrap: wrap;
`;

export const Dependent = styled.div<props>`
  width: ${({ width }) => (width ? width : "340px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border: 1px solid #0878d3;
  border-radius: 5px;
  gap: 5px;

  @media (max-width: 482px) {
    width: 100%;
  }
`;

export const DependentTitle = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DependentIcon = styled.div<props>`
  width: 29px;
  height: 7px;
  display: flex;
  background-image: url(${droplist});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
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

export const NewDependentContainer = styled.div<props>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Click = styled.div<props>`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
  cursor: pointer;
`;

export const DependentAdd = styled.div<props>`
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

export const ProfileImage = styled.div<props>`
  width: ${({ width }) => (width ? width : "123px")};
  height: ${({ height }) => (height ? height : "123px")};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(85, 96, 128, 1);
  border-radius: 50%;
  cursor: pointer;
`;

export const ProfileImageIconUpload = styled.div<props>`
  width: 35px;
  height: 35px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #069ade;
  border-radius: 50%;
  padding: 5px;
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};

  background-image: url(${upload});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 15px 20px;
`;

export const ImageProfile = styled.div<props>`
  width: ${({ width }) => (width ? width : "123px")};
  height: ${({ height }) => (height ? height : "123px")};
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
  width: ${({ width }) => (width ? width : "79px")};
  height: ${({ height }) => (height ? height : "104px")};
`;

export const IconPath = styled.path`
  fill: rgba(231, 236, 237, 1);
`;

export const CompanyImage = styled.div<props>`
  width: 242px;
  height: 155px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(231, 236, 237, 1);
  border-radius: 10px;
  cursor: pointer;
`;

export const CompanyImageProfile = styled.div<props>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ProfileVideo = styled.div<props>`
  width: ${({ width }) => (width ? width : "328px")};
  height: ${({ height }) => (height ? height : "188px")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(231, 236, 237, 1);

  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 792px) {
    width: 250px;
  }
`;

export const InputContainer = styled.div<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
`;

export const Required = styled.div`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 14px;
  color: #ff3939;
`;

export const Icon = styled.div<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;

  ${({ open }) =>
    open &&
    css`
      transform: rotateX(180deg);
    `};
`;

export const PatientsContainer = styled.div<props>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  border-radius: 5px;
  flex-wrap: wrap;
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
  border-radius: 30px;
  background-color: ${({ verified }) => (verified ? "#23B49E" : "#FFF")};

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

export const ExperienceContainer = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const ScrollColumn = styled.div<props>`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "0px")};
  padding: ${({ padding }) => padding};
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

export const Plan = styled.div<props>`
  width: 349px;
  padding: 30px 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ disabled }) => (disabled ? "#b5b5b5" : "#0878d3")};
  border-radius: 20px;
  gap: 20px;

  @media (max-width: 395px) {
    width: 100%;
  }
`;

export const ButtonPlan = styled.div<props>`
  width: 247px;
  height: 63px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #0878d3;
  border-radius: 30px;

  font-family: Open Sans;
  font-weight: 400;
  font-size: 16px;
  color: #0878d3;
  cursor: pointer;

  @media (max-width: 768px) {
    border-radius: 5px;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;

export const PlanDisabled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const HeaderMedicalRecord = styled.div<props>`
  width: 100%;
  height: 47px;
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #dedede;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const ContentMedicalRecord = styled.div<props>`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const FilterCalendarContainer = styled.div<props>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: 0;
  right: 0;
  /* width: 100px;
  background-color: #000; */
`;
