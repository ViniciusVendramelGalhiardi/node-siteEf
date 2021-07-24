import React, { FunctionComponent } from "react";

import {
  Container,
  MessageContainer,
  IconContainer,
  Icon,
  Message,
  Image,
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

interface Props {
  message?: string;
  open?: boolean;
  image?: string;
  closeAlertTime?: number;
  close: () => void;
}

const AlertSuccess: FunctionComponent<Props> = ({
  message,
  open,
  image,
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

              <Message>{message}</Message>
            </MessageContainer>

            <Image image={image} />
          </Container>
        </Fade>
      </CustomModal>
    );
  }
};

export default AlertSuccess;
