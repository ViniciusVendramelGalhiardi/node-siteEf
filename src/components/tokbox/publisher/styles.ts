import styled from "styled-components";

interface props {}

export const Container = styled.div<props>`
  width: 264px;
  height: 198px;
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 100;
  border: 3px solid #5c5c5c;
  border-radius: 5px;
  bottom: 0;
  left: 0;

  @media (max-width: 946px) {
    width: 198px;
    height: 264px;
  }

  @media (max-width: 736px) {
    width: 100px;
    height: 150px;
    bottom: 100px;
    left: 10px;
  }
`;
