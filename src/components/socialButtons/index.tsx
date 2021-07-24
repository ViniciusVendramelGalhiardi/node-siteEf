import React, { FunctionComponent } from "react";

import { Container, Button, Icon, Text } from "./styles";

import facebook from "assets/icons/png/facebook.png";
import google from "assets/icons/png/google.png";
import apple from "assets/icons/png/apple.png";

interface Props {}

const SocialButtons: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Button>
        <Icon image={facebook} />

        <Text>Acesse com o Facebook</Text>
      </Button>

      <Button>
        <Icon image={google} />

        <Text>Acesse com o Google</Text>
      </Button>

      <Button>
        <Icon image={apple} />

        <Text>Acesse com a Apple</Text>
      </Button>
    </Container>
  );
};

export default SocialButtons;
