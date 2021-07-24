import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import {
  Container,
  Content,
  Header,
  Title,
  Column,
  Row,
  ProfileImage,
  ImageProfile,
  ProfileImageIconUpload,
  IconSvg,
  IconPath,
  InputContainer,
  ButtonContainer,
  Required,
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

import Button from "components/button";
import Input from "components/input";
import InputSelect from "components/inputSelect";
import Cropper, { CroppedImage } from "components/cropper";

import useWindowSize from "hooks/useWindowSize";
import useForm from "hooks/useForm";

import {
  calculateAge,
  days,
  months,
  years,
  genders,
  convertBlobToBase64,
} from "helpers/utils";
import { removeMask } from "helpers/removeMasks";
import { api } from "services/api";
import { useAuth } from "hooks/useAuth";
import Loading from "components/loading";

interface Props {
  data?: any;
  edit: boolean;
  open: boolean;
  close: (e: any) => void;
}

const ModalDependent: FunctionComponent<Props> = ({
  data,
  edit = false,
  open,
  close,
}) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const [allYears, setAllYears] = useState<any>([]);
  const [blobImage, setBlobImage] = useState<any>({});
  const [dependentId, setDependentId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dependent = useForm({
    name: { type: "name", required: true },
    surname: { type: "name", required: false },
    birthdateDay: { type: "", required: true },
    birthdateMonth: { type: "", required: true },
    birthdateYear: { type: "", required: true },
    gender: { type: "", required: true },
    cellphone: { type: "phone", required: false },
    email: { type: "email", required: false },
    cpf: { type: "cpf", required: true },
    image: { type: "", required: false },
  });

  const formatParams = useCallback(async () => {
    let base64: any = "";

    if (blobImage && Object.keys(blobImage).length > 0) {
      base64 = await convertBlobToBase64(blobImage.blob);
    }

    return {
      Nome: dependent.form.name,
      Imagem: base64,
      Apelido: dependent.form.surname,
      DataNascimento: `${dependent.form.birthdateDay}-${dependent.form.birthdateMonth}-${dependent.form.birthdateYear}`,
      Genero: dependent.form.gender,
      Telefone: removeMask(dependent.form.cellphone, "phone"),
      Email: dependent.form.email,
      Cpf: removeMask(dependent.form.cpf, "cpf"),
      IdUsuario: user.id,
    };
  }, [dependent, blobImage, user]);

  const handleAddDependent = useCallback(async () => {
    try {
      const status = dependent.validateForm();

      if (!status) {
        return;
      }

      setLoading(true);

      const age = await calculateAge(
        parseInt(dependent.form.birthdateDay),
        parseInt(dependent.form.birthdateMonth),
        parseInt(dependent.form.birthdateYear)
      );

      const params = await formatParams();

      let id: any = null;

      if (edit) {
        const { data } = await api.put(
          `web/atualizaDependente/${dependentId}`,
          params
        );

        if (!data) {
          console.log("error data", data);
        }

        id = dependentId;
      } else {
        const { data } = await api.post(`web/cadastraDependente`, params);

        if (!data) {
          console.log("error data", data);
        }

        id = data;
      }

      const newDependent = {
        id,
        age,
        ...dependent.form,
      };

      setLoading(false);
      dependent.clearForm();
      setDependentId(null);
      close(newDependent);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [dependent, close, dependentId, formatParams, edit]);

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  const handleClose = () => {
    dependent.clearForm();
    close(false);
  };

  const init = useCallback(async () => {
    await getYears();

    if (edit) {
      setDependentId(data.id);

      dependent.setValueForm("image", data.image);
      dependent.setValueForm("name", data.name);
      dependent.setValueForm("surname", data.surname);
      dependent.setValueForm("birthdateDay", data.birthdateDay);
      dependent.setValueForm("birthdateMonth", data.birthdateMonth);
      dependent.setValueForm("birthdateYear", data.birthdateYear);
      dependent.setValueForm("gender", data.gender);
      dependent.setValueForm("cellphone", data.cellphone);
      dependent.setValueForm("email", data.email);
      dependent.setValueForm("cpf", data.cpf);
    }
  }, [edit, data, dependent]);

  useEffect(() => {
    init();

    return () => dependent.clearForm();
  }, [data]);

  return (
    <CustomModal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Container>
          <Header>Crie seu cadastro</Header>

          <Content>
            <Column width={"100%"} padding={"50px 20px"}>
              <Title center padding={"0px 20px 40px 20px"}>
                Informações do dependente menor de 18 anos
              </Title>

              <Cropper
                onCrop={(image: CroppedImage) => {
                  setBlobImage(image);
                  dependent.setValueForm("image", image.url);
                }}
              >
                <ProfileImage pointer marginBootom>
                  {dependent.form.image ? (
                    <ImageProfile image={dependent.form.image} />
                  ) : (
                    <IconSvg viewBox="9.437 8.001 16.794 22.21">
                      <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                    </IconSvg>
                  )}

                  <ProfileImageIconUpload />
                </ProfileImage>
              </Cropper>

              <Row>
                <Column
                  width={"50%"}
                  padding={
                    width > 768
                      ? "0px 10px 20px 20px"
                      : width > 630
                      ? "20px"
                      : "20px 20px 0px 20px"
                  }
                >
                  <InputContainer>
                    <Input
                      label={"Nome do Dependente"}
                      type={"text"}
                      value={dependent.form.name}
                      error={dependent.error.name}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dependent.onChange("name", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"Como prefere ser chamado?"}
                      type={"text"}
                      value={dependent.form.surname}
                      error={dependent.error.surname}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dependent.onChange("surname", e)
                      }
                    />
                  </InputContainer>

                  <Title width={"250px"} padding={"20px 0px 0px 0px"}>
                    Data de Nascimento &nbsp;<Required>*</Required>
                  </Title>

                  <InputContainer>
                    <InputSelect
                      label={"Dia"}
                      width={"70px"}
                      options={days}
                      error={dependent.error.birthdateDay}
                      value={dependent.form.birthdateDay}
                      onChange={(e) =>
                        dependent.setValueForm("birthdateDay", e)
                      }
                    />
                    <InputSelect
                      label={"Mês"}
                      width={"70px"}
                      options={months}
                      error={dependent.error.birthdateMonth}
                      value={dependent.form.birthdateMonth}
                      onChange={(e) =>
                        dependent.setValueForm("birthdateMonth", e)
                      }
                    />
                    <InputSelect
                      label={"Ano"}
                      width={"80px"}
                      options={allYears}
                      error={dependent.error.birthdateYear}
                      value={dependent.form.birthdateYear}
                      onChange={(e) =>
                        dependent.setValueForm("birthdateYear", e)
                      }
                    />
                  </InputContainer>
                </Column>

                <Column
                  width={"50%"}
                  padding={
                    width > 768
                      ? "0px 20px 20px 10px"
                      : width > 630
                      ? "20px"
                      : "0px 20px 20px 20px"
                  }
                >
                  <InputContainer>
                    <InputSelect
                      label={"Gênero"}
                      options={genders}
                      required
                      value={dependent.form.gender}
                      error={dependent.error.gender}
                      onChange={(e: any) => dependent.setValueForm("gender", e)}
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"Telefone"}
                      type={"text"}
                      maxLength={15}
                      value={dependent.form.cellphone}
                      error={dependent.error.cellphone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dependent.onChange("cellphone", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"E-mail"}
                      type={"text"}
                      value={dependent.form.email}
                      error={dependent.error.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dependent.onChange("email", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"CPF"}
                      type={"text"}
                      maxLength={14}
                      value={dependent.form.cpf}
                      error={dependent.error.cpf}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dependent.onChange("cpf", e)
                      }
                    />
                  </InputContainer>
                </Column>
              </Row>

              <ButtonContainer gap={"20px"} padding={"20px 0px 0px 0px"}>
                <Button
                  fixedWidth
                  text={"Concluir"}
                  handleButton={handleAddDependent}
                />
              </ButtonContainer>
            </Column>
          </Content>

          {loading && <Loading open={loading} />}
        </Container>
      </Fade>
    </CustomModal>
  );
};

export default ModalDependent;
