import React, { FunctionComponent } from "react";

import { Container } from "./styles";

interface Props {
  fixedWidth?: boolean;
  width?: string;
  height?: string;
  color?: string;
  textColor?: string;
  text: string;
  type?: string;
  fontSmall?: boolean;
  handleButton: () => void;
}

const Button: FunctionComponent<Props> = ({
  fixedWidth,
  width,
  height,
  color,
  textColor,
  text,
  type,
  fontSmall,
  handleButton,
}) => {
  return (
    <Container
      fixedWidth={fixedWidth}
      width={width}
      height={height}
      color={color}
      textColor={textColor}
      type={type}
      fontSmall={fontSmall}
      onClick={handleButton}
    >
      {text}
    </Container>
  );
};

export default Button;
