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
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

import scheduling from "assets/images/png/scheduling.png";

interface Props {
  open?: boolean;
  close: () => void;
}

const AlertSuccessfullyScheduled: FunctionComponent<Props> = ({
  open,
  close,
}) => {
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

              <Message>Sua consulta foi agendada com sucesso :)</Message>

              <SubMessageContainer>
                <IconWarning />

                <SubMessage>
                  Você pode reagendar ou cancelar o seu atendimento sem custos
                  com até 12 horas de antecedência.
                </SubMessage>
              </SubMessageContainer>
            </MessageContainer>

            <Image image={scheduling} />
          </Container>
        </Fade>
      </CustomModal>
    );
  }
};

export default AlertSuccessfullyScheduled;
