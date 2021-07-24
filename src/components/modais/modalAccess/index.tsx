import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";

import {
  Container,
  Title,
  Access,
  InputContainer,
  Card,
  CardImage,
  CardFooter,
  RecoverPassword,
} from "./styles";

import { CustomModal } from "styles";

import { Fade } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import modalClient from "assets/images/png/modalClient.png";
import modalProfessional from "assets/images/png/modalProfessional.png";
import modalCompany from "assets/images/png/modalCompany.png";
import { userTypes } from "config/contants";
import Button from "components/button";
import Input from "components/input";
import SocialButtons from "components/socialButtons";
import ModalRegisterClient from "components/modais/modalRegisterClient";
import useForm from "hooks/useForm";
import { useAuth } from "hooks/useAuth";
import Loading from "components/loading";

interface Props {
  noRedirect?: boolean;
  type: number;
  open: boolean;
  close: () => void;
}

const ModalAccess: FunctionComponent<Props> = ({
  noRedirect = false,
  type,
  open = false,
  close = () => {},
}) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalRegisterClient, setModalRegisterClient] =
    useState<boolean>(false);

  const { form, error, validateForm, onChange, clearForm } = useForm({
    email: { type: "email", required: true },
    password: { type: "password", required: true },
  });

  const handleRegister = useCallback(() => {
    if (type === userTypes.client) {
      setModalRegisterClient(true);
    } else if (type === userTypes.professional) {
      navigate("/cadastro-profissionais");
    } else {
      navigate("/cadastro-empresas");
    }

    close();
  }, [type, navigate, close]);

  const handleSignin = useCallback(async () => {
    const validated = validateForm();

    if (!validated) {
      return;
    }

    setLoading(true);

    const params = {
      email: form.email,
      password: form.password,
      type,
    };

    const success = await signIn(params);

    setLoading(false);

    if (!success) {
      return;
    }

    if (!noRedirect) {
      const profile: any = type;

      if (type === userTypes.client) {
        navigate("/minha-conta", { state: profile });
      } else if (type === userTypes.professional) {
        navigate("/minha-conta", { state: profile });
      } else {
        navigate("/minha-conta", { state: profile });
      }
    }

    close();
  }, [type, navigate, close, validateForm, signIn, form, noRedirect]);

  const renderImage = useMemo(() => {
    if (type === userTypes.client) {
      return modalClient;
    } else if (type === userTypes.professional) {
      return modalProfessional;
    } else {
      return modalCompany;
    }
  }, [type]);

  const renderTitle = useMemo(() => {
    if (type === userTypes.client) {
      return "Novo por aqui?";
    } else if (type === userTypes.professional) {
      return "Para Profissionais";
    } else {
      return "Para Empresas";
    }
  }, [type]);

  useEffect(() => {
    return () => clearForm();
  }, []);

  return (
    <>
      <CustomModal open={open} onClose={close}>
        <Fade in={open}>
          <Container>
            <Access>
              <Title color={"#002464"}>Acessar conta</Title>

              <InputContainer>
                <Input
                  label={"E-mail"}
                  type={"text"}
                  value={form.email}
                  error={error.email}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange("email", e)
                  }
                />
              </InputContainer>

              <InputContainer>
                <Input
                  label={"Senha"}
                  type={"password"}
                  value={form.password}
                  error={error.password}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange("password", e)
                  }
                />
              </InputContainer>

              <RecoverPassword>Esqueceu sua senha?</RecoverPassword>

              <Button fixedWidth text={"Acessar"} handleButton={handleSignin} />

              <SocialButtons />
            </Access>

            <Card>
              <Title color={type === userTypes.client ? "#FFF" : "#002464"}>
                {renderTitle}
              </Title>

              <CardImage image={renderImage} />

              <CardFooter>
                <Button
                  fixedWidth={type !== userTypes.company}
                  height={"46px"}
                  text={
                    type === userTypes.company
                      ? "Cadastre sua Empresa"
                      : "Cadastre-se"
                  }
                  handleButton={handleRegister}
                />
              </CardFooter>
            </Card>

            {loading && <Loading open={loading} />}
          </Container>
        </Fade>
      </CustomModal>

      {modalRegisterClient && (
        <ModalRegisterClient
          open={modalRegisterClient}
          close={() => setModalRegisterClient(false)}
        />
      )}
    </>
  );
};

export default ModalAccess;
