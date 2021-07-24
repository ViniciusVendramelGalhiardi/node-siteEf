import React, { FunctionComponent } from "react";

import { Container } from "./styles";

interface Props {
  content?: JSX.Element | string;
  image: string;
}

const Banner: FunctionComponent<Props> = ({ content, image }) => {
  return <Container image={image}>{content}</Container>;
};

export default Banner;
