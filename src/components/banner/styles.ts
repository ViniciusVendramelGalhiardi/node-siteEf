import styled from "styled-components";

interface props {
  image?: string;
}

export const Container = styled.div<props>`
  width: 100%;
  height: 438px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      rgba(0, 36, 100, 0.6),
      rgba(0, 36, 100, 0.6)
    ),
    url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
