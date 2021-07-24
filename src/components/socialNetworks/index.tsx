import React, { FunctionComponent } from "react";

import { Container, Icon } from "./styles";

import linkedin from "assets/images/socialNetworks/linkedin.png";
import facebook from "assets/images/socialNetworks/facebook.png";
import instagram from "assets/images/socialNetworks/instagram.png";

interface OwnProps {}

type Props = OwnProps;

const SocialNetworks: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Icon image={linkedin} />
      <Icon image={facebook} />
      <Icon image={instagram} />
    </Container>
  );
};

export default SocialNetworks;
