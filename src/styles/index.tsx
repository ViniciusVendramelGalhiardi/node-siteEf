import styled, { css } from "styled-components";
import { InputBase, Modal } from "@material-ui/core";
import grupoMscara from "assets/images/banners/grupoMscara.png";

interface props {
  textAlign?: string;
  contentAlign?: string;
  contentJustify?: string;
  padding?: string;
  color?: string;
  width?: number;
  center?: boolean;
  fontSmall?: boolean;
  image?: string;
  size?: string;
  gap?: string;
  height?: number;
  contain?: boolean;
  column?: boolean;
  start?: boolean;
  lineHeight?: string;
  forceColumn?: boolean;
  noBoxShadow?: boolean;
  vertical?: boolean;
}

export const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 36, 100, 0.8);
  overflow: scroll;
`;

export const BannerContent = styled.div<props>`
  width: 100%;
  height: 100%;
  padding: ${({ padding }) => (padding ? padding : "20px 100px")};
  display: flex;
  flex-direction: column;
  align-items: ${({ contentAlign }) => contentAlign};

  @media (max-width: 598px) {
    gap: 0px;
  }
`;

export const TitleBanner = styled.div<props>`
  font-size: ${({ size }) => (size ? size : "54px")};
  font-family: Montserrat;
  font-weight: 600;
  color: #fff;
  text-align: ${({ textAlign }) => textAlign};

  @media (max-width: 615px) {
    font-size: 30px;
  }

  @media (max-width: 320px) {
    font-size: 25px;
  }
`;

export const SubTitleBanner = styled.div<props>`
  font-size: ${({ size }) => (size ? size : "37px")};
  font-family: Montserrat;
  font-weight: 500;
  color: #fff;
  text-align: ${({ textAlign }) => textAlign};
  padding: ${({ padding }) => padding};

  @media (max-width: 598px) {
    font-size: 15px;
    padding: ${({ padding }) => (padding ? padding : "60px 0px")};
  }

  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

export const BasicInput = styled(InputBase)`
  width: 100%;
  height: 50px;
  padding: 5px 20px;
  background-color: #fbfbfb;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  font-family: Muli;
  font-size: 16px;
  color: #707070;
`;

export const SectionContainer = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: space-between;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  background-color: ${({ color }) => color};

  ${({ noBoxShadow }) =>
    !noBoxShadow &&
    css`
      filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
    `}

  @media (max-width: 798px) {
    flex-wrap: wrap;
  }
`;

export const SectionContent = styled.div<props>`
  width: ${({ width }) => width + "%"};
  height: ${({ height }) => (height ? height + "px" : "100%")};
  padding: ${({ padding }) => (padding ? padding : "0px")};
  display: flex;
  flex-direction: column;
  align-items: ${({ contentAlign }) =>
    contentAlign ? contentAlign : "flex-start"};
  justify-content: ${({ contentJustify }) =>
    contentJustify ? contentJustify : "flex-start"};
  gap: 5px;

  @media (max-width: 798px) {
    width: 100%;
  }
`;

export const SectionRow = styled.div<props>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${({ padding }) => (padding ? padding : "0px")};
  gap: ${({ gap }) => (gap ? gap : "0px")};

  ${({ forceColumn }) =>
    forceColumn &&
    css`
      @media (max-width: 968px) {
        flex-wrap: wrap;
        justify-content: center;
      }
    `}

  @media (max-width: 798px) {
    flex-wrap: wrap;
    justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  }
`;

export const SectionTitle = styled.div<props>`
  font-size: 35px;
  font-family: Montserrat;
  font-weight: 600;
  color: #12151d;
  text-align: ${({ center }) => (center ? "center" : "left")};
  text-transform: uppercase;
  padding: ${({ padding }) => (padding ? padding : "0px")};

  @media (max-width: 970px) {
    font-size: 25px;
  }

  ${({ fontSmall }) =>
    fontSmall &&
    css`
      @media (max-width: 360px) {
        font-size: 20px;
      }
    `};
`;

export const SectionSubTitle = styled.div<props>`
  font-size: 23px;
  font-family: Muli;
  font-weight: 500;
  color: #12151d;
  text-align: ${({ center }) => (center ? "center" : "left")};
  padding: ${({ padding }) => (padding ? padding : "0px")};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "32px")};

  @media (max-width: 970px) {
    font-size: 20px;
    padding: 20px 0px;
  }
`;

export const SectionDescriptionIcon = styled.div<props>`
  flex: 1;
  display: flex;
  align-items: ${({ start }) => (start ? "flex-start" : "center")};
  gap: 20px;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

export const SectionButtonContainer = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

export const SectionDescription = styled.div<props>`
  flex: 1;
  font-size: 17px;
  font-family: Muli;
  font-weight: 500;
  color: #12151d;
  text-align: ${({ center }) => (center ? "center" : "left")};
  display: flex;
  line-height: ${({ gap }) => gap};

  @media (max-width: 468px) {
    font-size: 13px;
  }
`;

export const SectionIcon = styled.div<props>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const SectionVideo = styled.div`
  width: 423px;
  height: 252px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-image: url(${grupoMscara});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 1130px) {
    width: 100%;
  }

  @media (max-width: 1024px) {
    height: 200px;
  }

  @media (max-width: 798px) {
    width: 50%;
    height: 252px;
    border-radius: 20px 20px 0px 0px;
  }

  @media (max-width: 698px) {
    width: 70%;
  }

  @media (max-width: 414px) {
    width: 80%;
  }

  @media (max-width: 390px) {
    height: 200px;
  }
`;

export const SectionImage = styled.div<props>`
  width: 100%;
  height: ${({ height }) => height + "px"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${({ contain }) => (contain ? "contain" : "cover")};

  @media (max-width: 798px) {
    height: 316px;
  }
`;

export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Separator = styled.div<props>`
  ${({ vertical, height }) =>
    vertical &&
    css`
      height: ${height ? height + "px" : "100%"};
      border-right: 1px solid #dedede;
    `}

  ${({ vertical }) =>
    !vertical &&
    css`
      width: 100%;
      border-bottom: 1px solid #dedede;
    `}
`;
