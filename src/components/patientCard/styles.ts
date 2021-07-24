import styled from "styled-components";

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
}

export const Container = styled.div`
  width: 352px;
  height: 104px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  background-color: #fff;

  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -webkit-appearance: none;

  @media (max-width: 416px) {
    width: 100%;
  }

  .content-card {
    display: none;
  }

  :hover {
    height: 220px;

    @media (max-width: 382px) {
      height: 240px;
    }

    @media (max-width: 326px) {
      height: 250px;
    }

    .content-card {
      display: flex;
      animation-duration: 1s;
      animation-name: fadeInPatient;

      @keyframes fadeInPatient {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    }
  }
`;

export const Content = styled.div<props>`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(85, 96, 128, 1);
  border-radius: 50%;
`;

export const ImageProfile = styled.div<props>`
  width: 74px;
  height: 74px;
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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
  padding: 20px 40px 40px 40px;
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
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: -35px;
`;
