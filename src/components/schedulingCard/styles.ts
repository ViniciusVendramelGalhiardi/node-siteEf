import { userTypes } from "config/contants";
import styled, { css } from "styled-components";

interface props {
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  gap?: string;
  bold?: boolean;
  size?: string;
  color?: string;
  nextAppointment?: boolean;
  scheduledAppointments?: boolean;
  image?: string;
  width?: string;
  height?: string;
  pointer?: boolean;
  userType?: number;
  client?: boolean;
}

export const Container = styled.div`
  width: 352px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  margin-bottom: 25px;

  @media (max-width: 382px) {
    width: 310px;
  }

  @media (max-width: 320px) {
    width: 290px;
  }
`;

export const Header = styled.div<props>`
  width: 100%;
  height: 47px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ nextAppointment, scheduledAppointments }) =>
    nextAppointment
      ? "#ABFF9B"
      : scheduledAppointments
      ? "#5FD5D9"
      : "#DEDEDE"};
`;

export const Content = styled.div<props>`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  ${({ nextAppointment, userType }) =>
    (!nextAppointment || userType === userTypes.company) &&
    css`
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    `}

  @media (max-width: 382px) {
    padding: 20px;
  }
`;

export const Row = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
`;

export const Column = styled.div<props>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
`;

export const Text = styled.div<props>`
  font-family: Open Sans;
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
`;

export const ProfileImage = styled.div<props>`
  width: 88px;
  height: 88px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgba(85, 96, 128, 1);
  border: 1px solid #fff;
  border-radius: 50%;
  padding-top: 15px;
`;

export const ImageProfile = styled.div<props>`
  width: 88px;
  height: 88px;
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

export const Icon = styled.div<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
`;

export const Footer = styled.div<props>`
  width: 100%;
  padding: ${({ client }) => (client ? "20px" : "20px 40px 40px 40px")};
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media (max-width: 320px) {
    padding: 20px 20px 40px 20px;
  }
`;

export const ButtonContainer = styled.div<props>`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ client }) =>
    !client &&
    css`
      position: absolute;
      bottom: -35px;
    `}
`;
