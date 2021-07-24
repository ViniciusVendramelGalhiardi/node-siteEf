import React, { FunctionComponent } from "react";

import { Container } from "./styles";

interface Props {
  placeholder?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  padding?: string;
  value?: any;
  error?: boolean;
  maxLength?: number;
  onChange: (e: any) => void;
}

const TextArea: FunctionComponent<Props> = ({
  placeholder,
  maxWidth,
  maxHeight,
  minHeight,
  padding,
  value,
  error,
  maxLength,
  onChange,
}) => {
  return (
    <Container
      placeholder={placeholder}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      minHeight={minHeight}
      padding={padding}
      value={value}
      error={error}
      maxLength={maxLength}
      onChange={onChange}
    />
  );
};

export default TextArea;
