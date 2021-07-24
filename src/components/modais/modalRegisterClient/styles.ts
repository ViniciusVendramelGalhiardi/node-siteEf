import styled, { css } from "styled-components";
import droplist from "assets/icons/png/droplist.png";
import upload from "assets/icons/png/upload.png";

interface props {
  width?: string;
  padding?: string;
  margin?: string;
  color?: string;
  image?: string;
  actived?: boolean;
  completed?: boolean;
  center?: boolean;
  large?: boolean;
  step?: number;
  addDependents?: boolean;
}

export const Container = styled.div<props>`
  width: 730px;
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

  @media (max-width: 630px) {
    ${({ step, addDependents }) =>
      (step !== 4 || addDependents) &&
      css`
        height: 90%;
      `}
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

    ${({ step }) =>
      step === 0 &&
      css`
        padding-bottom: 700px;
      `}

    ${({ step }) =>
      step === 1 &&
      css`
        padding-bottom: 250px;

        @media (max-height: 568px) {
          padding-bottom: 600px;
        }
      `}
  }

  @media (max-width: 630px) and (min-height: 778px) {
    ${({ step }) =>
      step === 0 &&
      css`
        padding-bottom: 100px;
      `}

    ${({ step }) =>
      step === 1 &&
      css`
        padding-bottom: 230px;
      `}
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
  flex-direction: column;
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

export const SubTitle = styled.div<props>`
  width: 100%;
  padding: ${({ padding }) => padding};

  font-family: Open Sans;
  font-weight: 600;
  font-size: 13px;
  color: #343434;
`;

export const Column = styled.div<props>`
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 630px) {
    width: 100%;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
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
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: ${({ padding }) => padding};
`;

export const Image = styled.div<props>`
  width: 220px;
  height: 300px;
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 630px) {
    height: 180px;

    ${({ large }) =>
      large &&
      css`
        height: 250px;
      `}

    position: absolute;
    bottom: -80px;
  }
`;

export const StepsContainer = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Steps = styled.div`
  width: 150px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    width: 100%;
  }
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
`;

export const TermsAndConditions = styled.div<props>`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: ${({ padding }) => padding};
`;

export const ButtonContainer = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding};
`;

export const Description = styled.div<props>`
  width: ${({ width }) => (width ? width : "100%")};
  display: flex;
  padding: ${({ padding }) => padding};

  font-family: Open Sans;
  font-weight: 400;
  font-size: 13px;
  color: #797979;
`;

export const DependentsContainer = styled.div<props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-bottom: 40px;
  border-radius: 5px;
  background-color: #f7f7f7;
  gap: 20px;

  @media (max-width: 630px) {
    padding: 20px;
  }
`;

export const DependentsContent = styled.div<props>`
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

export const DependentsAdd = styled.div<props>`
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

export const DependentsDescription = styled.div<props>`
  flex: 1;
  font-family: Open Sans;
  font-weight: 500;
  font-size: 15px;
  color: #0878d3;
`;

export const DependentsInfo = styled.div<props>`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 13px;
  color: #797979;

  @media (max-width: 394px) {
    font-size: 11px;
  }
`;

export const OptionDependent = styled.div<props>`
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

export const Dependents = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border: 1px solid #0878d3;
  border-radius: 5px;
  gap: 5px;
`;

export const Row = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
