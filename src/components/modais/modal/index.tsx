import React, { FunctionComponent } from "react";

import { Container, Header, Wrapper, Content, Buttons } from "./styles";

import { CustomModal } from "styles";

import { Fade } from "@material-ui/core";

interface Props {
  title: string;
  open: boolean;
  close: () => void;
  content: JSX.Element | string;
  buttons: JSX.Element | string;
}

const Modal: FunctionComponent<Props> = ({
  title,
  open = false,
  close = () => {},
  content,
  buttons,
}) => {
  return (
    <CustomModal
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container>
          <Header>{title}</Header>

          <Wrapper>
            <Content>{content}</Content>

            <Buttons>{buttons}</Buttons>
          </Wrapper>
        </Container>
      </Fade>
    </CustomModal>
  );
};

export default Modal;
