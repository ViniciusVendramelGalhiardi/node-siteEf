import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import {
  Container,
  Content,
  Row,
  Required,
  Label,
  Icon,
  Options,
  Option,
} from "./styles";

import Checkbox from "components/checkbox";

interface Props {
  width?: string;
  height?: string;
  value?: any;
  label?: string;
  error?: boolean;
  required?: boolean;
  checkOption?: boolean;
  options?: any;
  onChange: (e: any) => any;
}

const InputSelect: FunctionComponent<Props> = ({
  width,
  height,
  value,
  label,
  error,
  required,
  checkOption,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<boolean>(false);

  const handleSelect = useCallback(
    (option: any, update: boolean = true) => {
      if (checkOption) {
        option.checked = !option.checked;

        if (update) {
          onChange(option.value ? option.value : option.Id);
        }
      } else {
        setSelected(option.label ? option.label : option.Nome);
        onChange(option.value ? option.value : option.Id);
      }
    },
    [checkOption, onChange]
  );

  useEffect(() => {
    if (!label) {
      handleSelect(options[0]);
    }
  }, [label]);

  useEffect(() => {
    if (value && !checkOption) {
      options.map((option: any) => {
        const newValue = option.value ? option.value : option.Id;

        if (value === newValue) {
          handleSelect(option);
        }
      });
    }

    if (value && checkOption) {
      value.map((v: any) => {
        options.map((option: any) => {
          const newValue = option.value ? option.value : option.Id;

          if (v === newValue) {
            handleSelect(option, false);
          }
        });
      });
    }
  }, [value]);

  return (
    <Container
      onClick={() => setOpen(!open)}
      open={open}
      width={width}
      height={height}
      error={error}
    >
      <Content>
        <Label>
          {selected && !checkOption
            ? selected
            : label
            ? label
            : options[0].label
            ? options[0].label
            : options[0].Nome}
        </Label>

        <Row gap={"20px"}>
          {required && <Required>*</Required>}

          <Icon open={open} />
        </Row>
      </Content>

      <Options open={open}>
        {options &&
          options.map((option: any) => (
            <Row
              key={option.value ? option.value : option.Id}
              padding={checkOption ? "0px 10px" : "0px"}
              gap={"10px 0px 0px 0px"}
              onClick={() => handleSelect(option)}
            >
              {checkOption && (
                <Checkbox checked={option.checked} onChange={(e) => {}} />
              )}

              <Option>{option.label ? option.label : option.Nome}</Option>
            </Row>
          ))}
      </Options>
    </Container>
  );
};

export default InputSelect;
