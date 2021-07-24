import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import { Container, Content, Label } from "./styles";

interface Props {
  checked: boolean;
  labelChecked?: string;
  labelUnchecked?: string;
  onChange: (e: any) => void;
}

const Switch: FunctionComponent<Props> = ({
  checked,
  labelChecked,
  labelUnchecked,
  onChange,
}) => {
  const [newChecked, setNewChecked] = useState<boolean>(checked);

  const handleClick = useCallback(() => {
    const newCheck = !newChecked;

    setNewChecked(newCheck);
    onChange(newCheck);
  }, [newChecked]);

  useEffect(() => {
    setNewChecked(checked);
  }, [checked]);

  return (
    <Container>
      <Content>
        <input type="checkbox" onChange={handleClick} checked={newChecked} />
        <span className="slider" />
      </Content>

      <Label checked={newChecked}>
        {newChecked ? labelChecked : labelUnchecked}
      </Label>
    </Container>
  );
};

export default Switch;
