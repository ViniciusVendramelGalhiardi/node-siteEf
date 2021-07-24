import React, { FunctionComponent } from "react";

interface OwnProps {
  opened?: boolean;
}

type Props = OwnProps;

const BurguerMenu: FunctionComponent<Props> = ({ opened = false }) => {
  return (
    <svg
      id="Componente_10_1"
      data-name="Componente 10 – 1"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="20"
      viewBox="0 0 26 20"
    >
      <rect
        id="Retângulo_36"
        data-name="Retângulo 36"
        width={opened ? "20" : "26"}
        height="2"
        rx="1"
        fill="#0f224d"
      />
      <rect
        id="Retângulo_38"
        data-name="Retângulo 38"
        width={opened ? "20" : "26"}
        height="2"
        rx="1"
        transform="translate(0 18)"
        fill="#0f224d"
      />
      <rect
        id="Retângulo_166"
        data-name="Retângulo 166"
        width={opened ? "26" : "20"}
        height="2"
        rx="1"
        transform="translate(0 9)"
        fill="#0f224d"
      />
    </svg>
  );
};

export default BurguerMenu;
