import styled, { css } from "styled-components";
interface props {
  width?: string;
  height?: string;
  image?: string;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  margin?: string;
  gap?: string;
  pointer?: boolean;
  flex?: boolean;
  bold?: boolean;
  center?: boolean;
  size?: string;
  startMobile?: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div<props>`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
  cursor: ${({ pointer }) => (pointer ? "pointer" : "auto")};
  gap: ${({ gap }) => gap};

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

  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => gap};
  /* border: 1px solid black; */
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
  cursor: pointer;
`;

export const ImageProfile = styled.div<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
