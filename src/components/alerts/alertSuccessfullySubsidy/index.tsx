import React, { FunctionComponent } from "react";

import {
  Container,
  MessageContainer,
  IconContainer,
  Icon,
  Message,
  Image,
  SubMessageContainer,
  IconWarning,
  SubMessage,
  Column,
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

import scheduling from "assets/images/png/scheduling.png";
import useWindowSize from "hooks/useWindowSize";

interface Props {
  open?: boolean;
  close: () => void;
}

const AlertSuccessfullySubsidy: FunctionComponent<Props> = ({
  open,
  close,
}) => {
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
                <Icon />
              </IconContainer>

              <Message>Seu pagamento foi registrado com sucesso :)</Message>

              <SubMessageContainer>
                <IconWarning />

                <Column>
                  {width > 538 ? (
                    <>
                      <SubMessage>
                        Você pode verificar, acrescentar ou cancelar subsídios
                        no painel
                      </SubMessage>
                      <SubMessage bold>
                        Minha Conta / Colaboradores &nbsp;
                        <SubMessage>da sua empresa</SubMessage>
                      </SubMessage>
                    </>
                  ) : (
                    <>
                      <SubMessage>
                        Você pode verificar, acrescentar ou cancelar subsídios
                        no painel da sua empresa
                      </SubMessage>
                      <SubMessage bold>Minha Conta / Colaboradores</SubMessage>
                    </>
                  )}
                </Column>
              </SubMessageContainer>
            </MessageContainer>

            <Image image={scheduling} />
          </Container>
        </Fade>
      </CustomModal>
    );
  }
};

export default AlertSuccessfullySubsidy;
