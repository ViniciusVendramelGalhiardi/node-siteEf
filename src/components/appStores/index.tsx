import React, { FunctionComponent } from "react";

import { Container, Button, Icon, Text } from "./styles";

import apple from "assets/images/appStores/apple.png";
import googlePlay from "assets/images/appStores/googlePlay.png";

interface OwnProps {}

type Props = OwnProps;

const AppStores: FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <Button>
        <Icon image={apple} />

        <Text>Baixar na Apple Store</Text>
      </Button>

      <Button>
        <Icon image={googlePlay} />

        <Text>Disponível no Google Play</Text>
      </Button>
    </Container>
  );
};

export default AppStores;
