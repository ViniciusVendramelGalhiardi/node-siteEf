import React, { FunctionComponent } from "react";

import { Container, Required } from "./styles";

interface Props {
  width?: string;
  label?: string;
  type?: string;
  maxLength?: number;
  value?: any;
  error?: boolean;
  required?: boolean;
  onChange?: (e: any) => any;
}

const Input: FunctionComponent<Props> = ({
  width,
  label,
  type,
  maxLength,
  value,
  error,
  required,
  onChange,
}) => {
  return (
    <Container width={width} error={error}>
      <input
        type={type}
        placeholder=" "
        onChange={onChange}
        value={value}
        maxLength={maxLength}
      />

      <label>{label}</label>

      {required && <Required>*</Required>}
    </Container>
  );
};

export default Input;
