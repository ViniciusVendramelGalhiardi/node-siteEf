import React, { FunctionComponent } from "react";

import {
  Container,
  MessageContainer,
  IconContainer,
  Icon,
  Message,
  SubMessage,
} from "./styles";

import like from "assets/icons/png/likeLarge.png";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";
import useWindowSize from "hooks/useWindowSize";

interface Props {
  open?: boolean;
  close: () => void;
}

const AlertCertificate: FunctionComponent<Props> = ({ open, close }) => {
  const { width } = useWindowSize();

  if (!open) {
    return null;
  } else {
    return (
      <CustomModal open={open} onClose={close}>
        <Fade in={open}>
          <Container>
            <MessageContainer>
              <IconContainer>
                <Icon image={like} />
              </IconContainer>

              {width > 414 ? (
                <>
                  <Message padding={"30px 0px 30px 0px"}>
                    Olá, a Efetiva Saúde verificará seus diplomas e certificados
                  </Message>

                  <SubMessage>
                    Dependendo da instituição de ensino, isso poderá levar
                    alguns dias.
                  </SubMessage>
                  <SubMessage padding={"30px 0px"}>
                    Mas não se preocupe, você já terá acesso à plataforma e
                    poderá começar à atender!
                  </SubMessage>
                  <SubMessage>
                    Continue preenchendo seu perfil profissional para não perder
                    tempo :)
                  </SubMessage>
                </>
              ) : (
                <>
                  <Message padding={"30px 0px 0px 0px"}>
                    Olá, a Efetiva Saúde verificará
                  </Message>
                  <Message padding={"0px 0px 30px 0px"}>
                    seus diplomas e certificados
                  </Message>

                  <SubMessage>Dependendo da instituição de ensino,</SubMessage>
                  <SubMessage>isso poderá levar alguns dias.</SubMessage>

                  <SubMessage padding={"30px 0px 0px 0px"}>
                    Mas não se preocupe,
                  </SubMessage>
                  <SubMessage>você já terá acesso imediato</SubMessage>
                  <SubMessage padding={"0px 0px 30px 0px"}>
                    e poderá começar à atender!
                  </SubMessage>

                  <SubMessage>Continue preenchendo seu</SubMessage>
                  <SubMessage>
                    perfil profissional para não perder tempo :)
                  </SubMessage>
                </>
              )}
            </MessageContainer>
          </Container>
        </Fade>
      </CustomModal>
    );
  }
};

export default AlertCertificate;
