import styled from "styled-components";

interface props {
  height?: number;
}

export const Container = styled.div<props>`
  width: 100%;
  height: ${({ height }) => height + "px"};
`;
