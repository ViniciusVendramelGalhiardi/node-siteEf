import styled from "styled-components";
import grupoMscara from "assets/images/banners/grupoMscara.png";

interface props {
  width?: number;
  image?: string;
  padding?: string;
  center?: boolean;
  size?: string;
  bold?: boolean;
  color?: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
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
  width: 205px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 5px;
  background-color: #fff;

  @media (max-width: 598px) {
    position: absolute;
    bottom: -100px;
  }
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

export const Section = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  padding: ${({ padding }) => padding};
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 598px) {
    margin-top: 150px;
  }

  @media (max-width: 968px) {
    flex-wrap: wrap;
  }
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
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-image: url(${grupoMscara});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  top: -86px;
  right: 100px;

  @media (max-width: 1130px) {
    right: 50px;
  }

  @media (max-width: 1024px) {
    right: 20px;
  }

  @media (max-width: 946px) {
    width: 400px;
    height: 270px;
    right: 10px;
  }

  @media (max-width: 846px) {
    width: 375px;
    height: 245px;
  }

  @media (max-width: 798px) {
    width: 442px;
    height: 296px;
    position: relative;
    top: 0px;
    right: 0px;
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
