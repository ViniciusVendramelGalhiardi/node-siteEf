import styled, { css } from "styled-components";

interface props {
  image?: string;
  invisibleMobile?: boolean;
  fixed?: boolean;
  start?: boolean;
}

export const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 50px;

  @media (max-width: 468px) {
    padding: 20px 20px;
  }
`;

export const Wrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding-left: 47px;
  flex-wrap: wrap;

  @media (max-width: 1282px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding-left: 45px;
  }
`;

export const Card = styled.div`
  width: 45%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  gap: 20px;

  @media (max-width: 968px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 114px;
    padding: 20px 40px;
    margin-left: 0px;
    gap: 10px;
  }

  @media (max-width: 468px) {
    padding: 10px 10px 10px 65px;
    gap: 20px;
  }
`;

export const Image = styled.div<props>`
  width: 94px;
  height: 94px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: 47px;
  top: 66px;
  left: -47px;
  cursor: pointer;

  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 768px) {
    top: 10px;
  }
`;

export const EmptyImage = styled.div<props>`
  width: 94px;
  height: 94px;
  display: flex;
  position: absolute;
  align-items: flex-end;
  justify-content: center;
  border-radius: 47px;
  top: 66px;
  left: -47px;
  cursor: pointer;
  background-color: rgba(85, 96, 128, 1);

  @media (max-width: 768px) {
    top: 10px;
  }
`;

export const IconSvg = styled.svg`
  width: 84px;
  height: 84px;
`;

export const IconPath = styled.path`
  fill: rgba(231, 236, 237, 1);
`;

export const Content = styled.div<props>`
  width: 100%;
  height: ${({ fixed }) => (fixed ? "60px" : "auto")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  gap: 10px;

  ${({ invisibleMobile }) =>
    invisibleMobile &&
    css`
      @media (max-width: 768px) {
        display: none;
      }
    `};

  @media (max-width: 468px) {
    padding: 0px 0px;
  }
`;

export const TitleContainer = styled.div<props>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ start }) => (start ? "flex-start" : "flex-end")};

  ${({ invisibleMobile }) =>
    invisibleMobile &&
    css`
      @media (max-width: 768px) {
        display: none;
      }
    `};
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 25px;
  }

  @media (max-width: 468px) {
    padding-left: 0px;
  }
`;

export const TimeAndPrice = styled.div<props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const TimeAndPriceMobile = styled.div<props>`
  display: none;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Time = styled.div`
  margin-left: 10px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #23b49e;

  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

export const Title = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #0878d3;

  @media (max-width: 468px) {
    font-size: 18px;
  }
`;

export const SubTitle = styled.div<props>`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-left: 10px;
  color: #5c5c5c;

  overflow: ${({ fixed }) => (fixed ? "hidden" : "inherit")};
  text-overflow: ${({ fixed }) => (fixed ? "ellipsis" : "inherit")};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    margin-left: 0px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

export const Button = styled.div`
  width: 180px;
  height: 46px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0878d3;
  border-radius: 30px;
  cursor: pointer;

  @media (max-width: 1500px) {
    width: 50%;
  }

  @media (max-width: 968px) {
    width: 180px;
  }
`;

export const ButtonText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #fff;

  @media (max-width: 1500px) {
    font-size: 12px;
  }

  @media (max-width: 1080px) {
    font-size: 10px;
  }

  @media (max-width: 968px) {
    font-size: 14px;
  }
`;

export const Profile = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #0878d3;
  text-align: right;
  cursor: pointer;

  @media (max-width: 1500px) {
    width: 50%;
    font-size: 12px;
  }

  @media (max-width: 968px) {
    font-size: 15px;
  }
`;
