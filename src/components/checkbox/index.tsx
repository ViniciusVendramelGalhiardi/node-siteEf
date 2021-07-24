import React, { FunctionComponent } from "react";

import { Container, Box, Content, Label } from "./styles";

interface Props {
  color?: string;
  labelColor?: string;
  label?: string;
  error?: boolean;
  labelDynamic?: () => void;
  checked: boolean;
  onChange: (e: any) => void;
}

const Checkbox: FunctionComponent<Props> = ({
  color,
  labelColor,
  label,
  error,
  labelDynamic,
  checked,
  onChange,
}) => {
  const handleClick = () => {
    checked = !checked;
    onChange(checked);
  };

  return (
    <Container onClick={handleClick}>
      <Box error={error} checked={checked}>
        <Content checked={checked} color={color} />
      </Box>

      {label && (
        <Label error={error} color={labelColor} onClick={labelDynamic}>
          {label}
        </Label>
      )}
    </Container>
  );
};

export default Checkbox;
