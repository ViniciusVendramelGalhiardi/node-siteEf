import styled, { css } from "styled-components";
import loupe from "assets/icons/png/loupe.png";
import calendar from "assets/icons/png/calendar.png";
import grupoMscara from "assets/images/banners/grupoMscara.png";
import arrow from "assets/icons/png/arrow.png";
import search from "assets/icons/png/searchLarge.png";

interface props {
  width?: number;
  height?: number;
  padding?: string;
  center?: boolean;
  start?: boolean;
  color?: string;
  image?: string;
  notPaddingMobile?: boolean;
  fontSmall?: boolean;
  contain?: boolean;
  actived?: boolean;
  column?: boolean;
  open?: boolean;
  size?: string;
  gap?: string;
  noBoxShadow?: boolean;
  flex?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BannerContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  @media (max-width: 598px) {
    gap: 0px;
  }
`;

export const TitleBanner = styled.div`
  font-size: 40px;
  font-family: Open Sans;
  font-weight: 600;
  color: #fff;
  text-align: center;

  @media (max-width: 615px) {
    font-size: 30px;
  }

  @media (max-width: 320px) {
    font-size: 25px;
  }
`;

export const SubTitleBanner = styled.div`
  font-size: 25px;
  font-family: Open Sans;
  font-weight: 500;
  color: #fff;
  text-align: center;
  padding: 30px 0px;

  @media (max-width: 598px) {
    font-size: 15px;
    padding: 60px 0px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

export const InputBanner = styled.div`
  width: 689px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 410px) {
    width: 100%;
  }

  @media (max-width: 598px) {
    height: 42px;
  }
`;

export const InputContentBanner = styled.div`
  flex: 1;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 598px) {
    padding: 0px 10px;
  }

  @media (max-width: 468px) {
    padding: 0px 5px;
  }

  @media (max-width: 373px) {
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const InputTextBanner = styled.div`
  flex: 1;
  font-family: Muli;
  font-weight: 600;
  font-size: 16px;
  color: #464646;

  @media (max-width: 598px) {
    font-size: 14px;
  }

  @media (max-width: 468px) {
    font-size: 12px;
  }

  @media (max-width: 373px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const InputCalendarBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const InputCalendarIconBanner = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${calendar});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 25px 25px;
`;

export const InputCalendarTextBanner = styled.div`
  font-family: Muli;
  font-weight: 600;
  font-size: 15px;
  color: #959595;
`;

export const InputIconBanner = styled.div`
  width: 118px;
  height: 100%;
  padding: 10px 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8cc63f;

  background-image: url(${loupe});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px 36px;

  @media (max-width: 598px) {
    width: 77px;
    background-size: 24px 24px;
  }
`;

export const SectionContainer = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: ${({ column }) => (column ? "flex-start" : "space-between")};
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

export const SectionRow = styled.div<props>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 798px) {
    flex-wrap: wrap;
  }
`;

export const SectionContent = styled.div<props>`
  width: ${({ width }) => width + "%"};
  height: ${({ height }) => (height ? height : "100%")};
  padding: ${({ padding }) => (padding ? padding : "0px")};
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  gap: 5px;

  @media (max-width: 798px) {
    width: 100%;
  }
`;

export const SectionTitle = styled.div<props>`
  font-size: 35px;
  font-family: Montserrat;
  font-weight: 600;
  color: #12151d;
  text-align: left;
  text-transform: uppercase;

  @media (max-width: 970px) {
    font-size: 25px;
  }

  ${({ fontSmall }) =>
    fontSmall &&
    css`
      @media (max-width: 414px) {
        font-size: 17px;
      }
    `};
`;

export const SectionSubTitle = styled.div<props>`
  font-size: 23px;
  font-family: Muli;
  font-weight: 600;
  color: #12151d;
  text-align: left;
  padding: ${({ padding }) => (padding ? padding : "0px")};

  @media (max-width: 970px) {
    font-size: 20px;
    padding: 20px 0px;
  }
`;

export const SectionDescriptionIcon = styled.div<props>`
  flex: 1;
  display: flex;
  align-items: center;
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
  text-align: left;

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

export const Column = styled.div<props>`
  ${({ flex }) =>
    flex &&
    css`
      flex: 1;
    `}

  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "5px")};
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

export const SectionTitleSearch = styled.div<props>`
  font-size: ${({ size }) => size};
  font-family: Open Sans;
  font-weight: 600;
  color: #002464;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

export const SectionSubTitleSearch = styled.div<props>`
  font-size: 15px;
  font-family: Open Sans;
  font-weight: 400;
  color: #797979;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

export const DotGreen = styled.div<props>`
  width: 15px;
  height: 15px;
  background-color: #8cc63f;
  border-radius: 50%;
`;

export const Click = styled.div<props>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const ButtonSearchContainer = styled.div<props>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  gap: 20px;
  padding: ${({ padding }) => (padding ? padding : "0px")};

  @media (max-width: 798px) {
    gap: 10px;
  }
`;

export const ButtonSearchContent = styled.div<props>`
  width: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const ButtonSearchSelect = styled.div<props>`
  width: 96px;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  border: ${({ actived }) =>
    actived ? "2px solid #0878D3" : "1px solid #D8D8D8"};
  cursor: pointer;
`;

export const ButtonSearch = styled.div<props>`
  width: 276px;
  height: 64px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50px;
  background-color: #0878d3;
  cursor: pointer;

  @media (max-width: 798px) {
    border-radius: 5px;
  }
`;

export const ButtonSearchLabel = styled.div<props>`
  font-size: 16px;
  font-family: Open Sans;
  font-weight: 500;
  color: #fff;
  margin-right: 20px;
`;

export const IconSearch = styled.div<props>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${search});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  right: 5px;
  top: 18px;
`;

export const ButtonSearchIcon = styled.div<props>`
  width: 50px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ButtonSearchSelectLabel = styled.div<props>`
  text-align: center;
  font-size: 15px;
  font-family: Open Sans;
  font-weight: ${({ actived }) => (actived ? "600" : "400")};
  color: ${({ actived }) => (actived ? "#0878D3" : "#797979")};
`;

export const AdvancedSearch = styled.div<props>`
  text-align: center;
  font-size: 14px;
  font-family: Open Sans;
  font-weight: 400;
  color: #0878d3;
`;

export const SearchText = styled.div<props>`
  width: 100vw;
  text-align: center;
  font-size: 14px;
  font-family: Open Sans;
  font-weight: 600;
  color: #0878d3;
`;

export const AdvancedSearchTitle = styled.div<props>`
  font-size: 16px;
  font-family: Open Sans;
  font-weight: 600;
  color: #797979;

  @media (max-width: 498px) {
    font-size: 13px;
  }
`;

export const AdvancedSearchContainer = styled.div<props>`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AdvancedSearchContent = styled.div<props>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
  gap: 20px;
`;

export const AdvancedSearchRow = styled.div<props>`
  flex: 1;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ start }) => (start ? "flex-start" : "center")};
  gap: 20px;

  @media (max-width: 1112px) {
    flex-wrap: wrap;
  }
`;

export const Icon = styled.div<props>`
  width: 13px;
  height: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${arrow});
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

export const CalendarContainer = styled.div`
  margin-top: 10px;
`;

export const SliderContainer = styled.div`
  width: 300px;

  @media (max-width: 670px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
