import React, { useState, FunctionComponent } from "react";

import { Container, Content } from "./styles";

import contactCompany from "assets/images/png/contactCompany.png";

import Button from "components/button";
import { BasicInput } from "styles";
import ModalAccess from "components/modais/modalAccess";
import { userTypes } from "config/contants";
import AlertSuccess from "components/alerts/alertSuccess";

interface Props {
  type: number;
}

const RegistrationForm: FunctionComponent<Props> = ({ type }) => {
  const [modalAccess, setModalAccess] = useState<boolean>(false);
  const [alertContact, setAlertContact] = useState<boolean>(false);

  const handleAlertContact = () => {
    setAlertContact(true);

    setTimeout(() => {
      setAlertContact(false);
    }, 2000);
  };

  return (
    <Container>
      <Content>
        {type === userTypes.professional ? (
          <>
            <BasicInput placeholder="Nome" />
            <BasicInput placeholder="Telefone" />
            <BasicInput placeholder="E-mail" />
            <BasicInput placeholder="Selecione o estado" />
            <BasicInput placeholder="Selecione a cidade" />

            <Button
              width={"100%"}
              color={"#8CC63F"}
              type={"green"}
              text={"CADASTRE-SE AGORA"}
              handleButton={() => setModalAccess(true)}
            />
          </>
        ) : (
          <>
            <BasicInput placeholder="Nome" />
            <BasicInput placeholder="Telefone" />
            <BasicInput placeholder="E-mail" />
            <BasicInput placeholder="Empresa" />

            <Button
              width={"100%"}
              color={"#8CC63F"}
              type={"green"}
              text={"SOLICITE NOSSO CONTATO"}
              handleButton={handleAlertContact}
            />
          </>
        )}
      </Content>

      {modalAccess && (
        <ModalAccess
          type={type}
          open={modalAccess}
          close={() => setModalAccess(false)}
        />
      )}

      {alertContact && (
        <AlertSuccess
          open={alertContact}
          message={"Entraremos em contato na mais brevidade possível :)"}
          image={contactCompany}
          close={() => setAlertContact(false)}
        />
      )}
    </Container>
  );
};

export default RegistrationForm;
