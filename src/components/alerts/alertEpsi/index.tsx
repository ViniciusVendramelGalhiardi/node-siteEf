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
import bad from "assets/icons/png/bad.png";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";
import useWindowSize from "hooks/useWindowSize";

interface Props {
  open?: boolean;
  error?: boolean;
  close: () => void;
}

const AlertEpsi: FunctionComponent<Props> = ({ open, error, close }) => {
  const { width } = useWindowSize();

  if (!open) {
    return null;
  } else {
    return (
      <CustomModal open={open} onClose={close}>
        <Fade in={open}>
          <Container>
            <MessageContainer>
              {!error ? (
                <>
                  <IconContainer>
                    <Icon image={like} />
                  </IconContainer>

                  {width > 414 ? (
                    <Message padding={"50px 0px 0px 0px"}>
                      Seu cadastro e-Psi já está ativo :)
                    </Message>
                  ) : (
                    <>
                      <Message padding={"50px 0px 0px 0px"}>
                        Seu cadastro e-Psi
                      </Message>
                      <Message>já está ativo :)</Message>
                    </>
                  )}
                </>
              ) : (
                <>
                  <IconContainer>
                    <Icon image={bad} />
                  </IconContainer>

                  {width > 414 ? (
                    <>
                      <Message padding={"50px 0px 30px 0px"}>
                        Ops, seu cadastro e-Psi ainda não existe.
                      </Message>

                      <SubMessage>Mas tudo bem!</SubMessage>
                      <SubMessage>
                        Acesse o site https://e-psi.cfp.org.br/ e faça seu
                        cadastro.
                      </SubMessage>
                      <SubMessage>
                        Continue preenchendo seu perfil profissional para não
                        perder tempo :)
                      </SubMessage>
                    </>
                  ) : (
                    <>
                      <Message padding={"50px 0px 0px 0px"}>
                        Ops, seu cadastro e-Psi
                      </Message>
                      <Message padding={"0px 0px 30px 0px"}>
                        ainda não existe.
                      </Message>

                      <SubMessage>Mas tudo bem!</SubMessage>
                      <SubMessage>
                        Acesse o site https://e-psi.cfp.org.br/
                      </SubMessage>
                      <SubMessage>e faça seu cadastro.</SubMessage>

                      <SubMessage bold padding={"30px 0px"}>
                        Continue preenchendo seu perfil profissional para não
                        perder tempo :)
                      </SubMessage>
                    </>
                  )}
                </>
              )}
            </MessageContainer>
          </Container>
        </Fade>
      </CustomModal>
    );
  }
};

export default AlertEpsi;
