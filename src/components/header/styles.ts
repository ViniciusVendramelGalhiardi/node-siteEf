import styled from "styled-components";
import gear from "assets/icons/png/gear.png";

interface props {
  right?: boolean;
  display?: boolean;
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  bold?: boolean;
  gap?: string;
}

export const Container = styled.div<props>`
  width: 100%;
  height: 87px;
  left: 0px;
  top: 0px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.235));
  overflow: visible;
  transform: matrix(1, 0, 0, 1, 0, 0);
  background-color: rgba(255, 255, 255, 1);
  display: ${({ display }) => (display ? "none" : "flex")};
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px 10%;
  align-items: center;
  justify-content: space-between;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const NavItem = styled.div<props>`
  cursor: pointer;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: rgba(8, 120, 211, 1);
  display: flex;
  align-items: center;
  text-align: ${({ right }) => (right ? "right" : "center")};
  gap: 10px;
`;

export const Text = styled.div<props>`
  font-family: Open Sans;
  font-weight: ${({ bold }) => (bold ? "600" : "400")};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
`;

export const Column = styled.div<props>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
  align-items: flex-end;
`;

export const NavItemIcon = styled.div<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgba(85, 96, 128, 1);
  border-radius: 50%;
  padding-top: 6px;
`;

export const Icon = styled.svg<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const IconPath = styled.path`
  fill: rgba(231, 236, 237, 1);
`;

export const IconGearContainer = styled.div<props>`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  bottom: -6px;
  right: -6px;
`;

export const IconGear = styled.div<props>`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${gear});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const NavMobile = styled.div`
  width: 250px;
  height: 300px;
  position: absolute;
  /* z-index: 9 !important; */
  /* top: 0; */
  top: 95px;
  right: 0;
  padding: 30px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: rgba(231, 236, 237, 0.8);
  border-radius: 40px;
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;

  @keyframes fadeInHeader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInHeader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInHeader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeInHeader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeInHeader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #797b7e;
`;

export const Click = styled.div`
  cursor: pointer;
`;
