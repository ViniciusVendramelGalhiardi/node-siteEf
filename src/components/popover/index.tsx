import React, { FunctionComponent } from "react";

import { Container } from "./styles";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface Props {
  noBackgroundColor?: boolean;
  open: boolean;
  close: () => void;
  anchorEl?: any;
  content: JSX.Element | string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 10,
      margin: 10,
      backgroundColor: "rgba(121, 121, 121, 0.9)",
    },
    paperNoBackgroundColor: {
      padding: 10,
      margin: 10,
      backgroundColor: "#f0f0f0",
      outline: "none",
      border: 0,
      borderRadius: 10,
    },
  })
);

const Popover: FunctionComponent<Props> = ({
  noBackgroundColor,
  open,
  close,
  anchorEl,
  content,
}) => {
  const classes = useStyles();

  return (
    <Container
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={close}
      classes={{
        paper: noBackgroundColor
          ? classes.paperNoBackgroundColor
          : classes.paper,
      }}
    >
      {content}
    </Container>
  );
};

export default Popover;
