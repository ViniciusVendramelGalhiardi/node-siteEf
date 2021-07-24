import styled, { css } from "styled-components";
import grupoMscara from "assets/images/banners/grupoMscara.png";

interface props {
  width?: number;
  height?: string;
  image?: string;
  padding?: string;
  center?: boolean;
  size?: string;
  bold?: boolean;
  color?: string;
  boxShadow?: boolean;
  fixed?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BannerContent = styled.div<props>`
  width: 100%;
  height: 100%;
  padding: ${({ padding }) => (padding ? padding : "20px 100px")};
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 598px) {
  }
`;

export const ProfileImage = styled.div<props>`
  width: 139px;
  height: 139px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

export const Text = styled.div<props>`
  text-align: ${({ center }) => (center ? "center" : "left")};
  font-family: Open Sans;
  font-size: ${({ size }) => size};
  font-weight: ${({ bold }) => (bold ? "600" : "300")};
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};

  @media (max-width: 598px) {
  }
`;

export const TimeContainer = styled.div<props>`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Section = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  padding: ${({ padding }) => padding};
  background-color: ${({ color }) => (color ? color : "#FFF")};

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
    `}
`;

export const Row = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ height }) =>
    height &&
    css`
      height: 438px;

      @media (max-width: 798px) {
        flex-wrap: wrap;
      }
    `}

  ${({ height }) =>
    !height &&
    css`
      @media (max-width: 968px) {
        flex-wrap: wrap;
      }
    `}
`;

export const Column = styled.div<props>`
  width: ${({ width }) => width + "%"};
  padding: ${({ padding }) => (padding ? padding : "0px")};
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  gap: 5px;

  @media (max-width: 798px) {
    width: 100%;
  }
`;

export const SectionVideo = styled.div`
  width: 442px;
  height: 296px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-image: url(${grupoMscara});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 946px) {
    width: 400px;
    height: 270px;
  }

  @media (max-width: 846px) {
    width: 375px;
    height: 245px;
  }

  @media (max-width: 798px) {
    width: 442px;
    height: 296px;
  }

  @media (max-width: 475px) {
    width: 350px;
    height: 235px;
  }

  @media (max-width: 360px) {
    width: 100%;
    height: 200px;
  }
`;

export const ScheduleContainer = styled.div<props>`
  width: 301px;
  display: flex;
  position: ${({ fixed }) => (fixed ? "fixed" : "relative")};
  flex-direction: column;
  z-index: 1;
  top: ${({ fixed }) => (fixed ? "10px" : "170px")};

  @media (max-width: 798px) {
    position: absolute;
    top: 40px;
  }

  @media (max-width: 360px) {
    width: 100%;
  }
`;

export const ScheduleContent = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  background-color: #f0f0f0;
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ProfileImageContainer = styled.div<props>`
  width: ${({ width }) => (width ? width : "139px")};
  height: ${({ height }) => (height ? height : "139px")};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(85, 96, 128, 1);
  border-radius: 50%;
`;

export const IconSvg = styled.svg`
  width: ${({ width }) => (width ? width : "120px")};
  height: ${({ height }) => (height ? height : "120px")};
`;

export const IconPath = styled.path`
  fill: rgba(231, 236, 237, 1);
`;
