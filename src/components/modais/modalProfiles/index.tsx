import React, { useState, FunctionComponent } from "react";

import { Container, Card, CardTitle, CardImage, CardFooter } from "./styles";

import { CustomModal } from "styles";

import { Fade } from "@material-ui/core";
import Button from "components/button";
import ModalAccess from "components/modais/modalAccess";

import modalClient from "assets/images/png/modalClient.png";
import modalProfessional from "assets/images/png/modalProfessional.png";
import modalCompany from "assets/images/png/modalCompany.png";

interface Props {
  open: boolean;
  close: () => void;
}

const ModalProfiles: FunctionComponent<Props> = ({
  open = false,
  close = () => {},
}) => {
  const [typeSelected, setTypeSelected] = useState<any>(null);
  const [modalAccess, setModalAccess] = useState<boolean>(false);
  const [types, setTypes] = useState<any>([
    { id: 1, title: "Para Você", image: modalClient },
    { id: 2, title: "Para Profissionais", image: modalProfessional },
    { id: 3, title: "Para Empresas", image: modalCompany },
  ]);

  const handleOpenModal = (id: number) => {
    setTypeSelected(id);
    setModalAccess(true);
    close();
  };

  return (
    <>
      <CustomModal open={open} onClose={close}>
        <Fade in={open}>
          <Container>
            {types.map((type: any) => (
              <Card key={type.id}>
                <CardTitle color={type.id === 1 ? "#fff" : "#002464"}>
                  {type.title}
                </CardTitle>

                <CardImage image={type.image} />

                <CardFooter>
                  <Button
                    fixedWidth
                    text={"Acessar"}
                    handleButton={() => handleOpenModal(type.id)}
                  />
                </CardFooter>
              </Card>
            ))}
          </Container>
        </Fade>
      </CustomModal>

      <ModalAccess
        type={typeSelected}
        open={modalAccess}
        close={() => setModalAccess(false)}
      />
    </>
  );
};

export default ModalProfiles;
