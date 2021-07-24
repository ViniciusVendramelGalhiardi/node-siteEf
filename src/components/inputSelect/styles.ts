import styled, { css } from "styled-components";
import arrow from "assets/icons/png/arrow.png";

interface props {
  width?: string;
  height?: string;
  open?: boolean;
  error?: boolean;
  padding?: string;
  gap?: string;
}

export const Container = styled.div<props>`
  width: ${({ width }) => (width ? width : "250px")};
  height: ${({ height }) => (height ? height : "40px")};
  padding: 0px 10px;
  position: relative;
  display: flex;
  background-color: #f7f7f7;
  align-items: center;
  cursor: pointer;
  border-bottom: ${({ error }) => (error ? "2px solid red" : "none")};

  ${({ open }) =>
    open &&
    css`
      box-shadow: 2px 1px 2px #dedede, -2px 1px 2px #dedede;
    `};
`;

export const Label = styled.div`
  flex: 1;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 15px;
  color: #797979;
  margin-right: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Content = styled.div<props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Row = styled.div<props>`
  gap: ${({ gap }) => gap};
  display: flex;
  align-items: center;
  padding: ${({ padding }) => padding};
`;

export const Required = styled.div`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 14px;
  color: #ff3939;
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

export const Options = styled.div<props>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  width: 100%;
  background-color: #f7f7f7;
  outline: none;
  cursor: pointer;
  left: 0;
  top: 40px;
  z-index: 1;

  max-height: 200px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #9d9d9d;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0878d3;
    border-radius: 20px;
  }

  ${({ open }) =>
    open &&
    css`
      box-shadow: 2px 2px 2px #dedede, -2px 2px 2px #dedede;
      /* transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); */
    `};
`;

export const Option = styled.div<props>`
  padding: 10px;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 15px;
  color: #797979;
`;
