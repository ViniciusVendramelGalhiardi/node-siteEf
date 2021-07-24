import styled, { css } from "styled-components";

interface props {
  justifyContent?: string;
  image?: string;
  gap?: string;
  bold?: string;
  closed?: boolean;
}

export const Container = styled.div<props>`
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  z-index: 9999;
  top: 0;
  align-items: center;
  justify-content: center;
  background-color: #797979;
  border-bottom: 4px solid #ffffff;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  gap: 100px;

  @media (max-width: 876px) {
    gap: 30px;
  }

  @media (max-width: 796px) {
    height: auto;
    flex-direction: column;
    gap: 0px;
  }

  ${({ closed }) =>
    !closed &&
    css`
      animation-duration: 1s;
      animation-name: fadeIn;

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translate3d(0, -100%, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    `}

  ${({ closed }) =>
    closed &&
    css`
      animation-duration: 1s;
      animation-name: fadeOut;

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
          transform: translate3d(0, -100%, 0);
        }
      }
    `}
`;

export const Content = styled.div<props>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ gap }) => gap};
  padding: 10px;
`;

export const ProfileImage = styled.div<props>`
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgba(85, 96, 128, 1);
  border-radius: 50%;
  padding-top: 15px;
`;

export const ImageProfile = styled.div<props>`
  width: 56px;
  height: 56px;
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

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

export const Text = styled.div<props>`
  font-family: Open Sans;
  font-weight: ${({ bold }) => (bold ? bold : "300")};
  color: #fff;
  font-size: 15px;
`;

export const Click = styled.div<props>`
  cursor: pointer;
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
`;
