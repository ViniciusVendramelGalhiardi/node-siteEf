import React, { FunctionComponent } from "react";

import { CustomModal } from "styles";

import {
  Fade,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";

interface Props {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      color: "#FFF",
      outline: "none",
    },
  })
);

const Loading: FunctionComponent<Props> = ({ open }) => {
  const classes = useStyles();

  if (open) {
    return (
      <CustomModal open={open} onClose={() => {}}>
        <Fade in={open}>
          <CircularProgress className={classes.top} />
        </Fade>
      </CustomModal>
    );
  } else {
    return null;
  }
};

export default Loading;
