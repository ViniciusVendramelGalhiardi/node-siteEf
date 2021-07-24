import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import {
  Container,
  Header,
  Wrapper,
  Column,
  Row,
  Label,
  Required,
  IconContainer,
  Icon,
  IconMobile,
  Title,
  SubTitle,
  ButtonContainer,
} from "./styles";

import { CustomModal } from "styles";

import { Fade } from "@material-ui/core";
import Input from "components/input";
import InputSelect from "components/inputSelect";
import TextArea from "components/textarea";
import Button from "components/button";
import useForm from "hooks/useForm";
import { AcademicFormation } from "interfaces/academicFormation";
import { academicLevel, years } from "helpers/utils";
import useWindowSize from "hooks/useWindowSize";
import { useAuth } from "hooks/useAuth";
import { api } from "services/api";

interface Props {
  data: AcademicFormation;
  edit: boolean;
  open: boolean;
  close: (e: any) => void;
}

const ModalAcademicFormation: FunctionComponent<Props> = ({
  data,
  edit = false,
  open,
  close,
}) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const [allYears, setAllYears] = useState<any>([]);
  const [formationId, setFormationId] = useState<any>(null);
  const { form, error, validateForm, setValueForm, clearForm, onChange } =
    useForm({
      institution: { type: "name", required: true },
      course: { type: "name", required: true },
      level: { type: "name", required: false },
      startYear: { type: "", required: true },
      endYear: { type: "", required: true },
      description: { type: "", required: false },
      file: { type: "", required: false },
    });

  const formatParams = useCallback(() => {
    if (user) {
      return {
        IdUsuario: user.id,
        InstituicaoEnsino: form.institution,
        NomeCurso: form.course,
        NivelAcademico: form.level,
        AnoInicio: form.startYear,
        AnoTermino: form.endYear,
        DescricaoCurso: form.description,
        Anexo: form.file,
      };
    } else {
      return {
        InstituicaoEnsino: form.institution,
        NomeCurso: form.course,
        NivelAcademico: form.level,
        AnoInicio: form.startYear,
        AnoTermino: form.endYear,
        DescricaoCurso: form.description,
        Anexo: form.file,
      };
    }
  }, [user, form]);

  const handleAdd = useCallback(async () => {
    try {
      const validated = await validateForm();

      if (!validated) {
        return;
      }

      const params = await formatParams();

      let id: any = null;

      if (edit) {
        const { data } = await api.put(
          `web/atualizaFormacaoProf/${formationId}`,
          params
        );

        if (!data) {
          console.log("error data", data);
        }

        id = formationId;
      } else {
        const { data } = await api.post(`web/cadastraFormacaoProf`, params);

        if (!data) {
          console.log("error data", data);
        }

        id = data;
      }

      const newFormation = {
        id,
        ...form,
      };

      setFormationId(null);
      close(newFormation);
      clearForm();
    } catch (error) {
      console.log("error", error);
    }
  }, [validateForm, form, clearForm, close, formatParams, formationId, edit]);

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile: any = {
        name: e.target.files[0].name,
      };

      const reader = new FileReader();

      reader.addEventListener("load", () => {
        newFile.base64 = reader.result;
        setValueForm("file", newFile);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const selectFile = () => {
    const input = document.createElement("input");
    input.setAttribute("class", "input-image-class");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*,.pdf");
    input.onchange = onSelectFile;

    input.click();
  };

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  const init = useCallback(async () => {
    await getYears();

    if (edit) {
      setFormationId(data.id);

      setValueForm("institution", data.institution);
      setValueForm("course", data.course);
      setValueForm("level", data.level);
      setValueForm("startYear", data.startYear);
      setValueForm("endYear", data.endYear);
      setValueForm("description", data.description);
      setValueForm("file", data.file);
    }
  }, [edit, data, setValueForm]);

  useEffect(() => {
    init();

    return () => clearForm();
  }, [data]);

  return (
    <CustomModal
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container>
          <Header>Incluir Formação Acadêmica</Header>

          <Wrapper>
            <Column flex={1}>
              <Input
                width={width > 768 ? "" : "100%"}
                label={"Instituição de Ensino"}
                type={"text"}
                value={form.institution}
                error={error.institution}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("institution", e)
                }
              />

              <Input
                width={width > 768 ? "" : "100%"}
                label={"Nome do Curso"}
                type={"text"}
                value={form.course}
                error={error.course}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("course", e)
                }
              />

              <InputSelect
                width={width > 768 ? "" : "100%"}
                label={"Nível Acadêmico"}
                options={academicLevel}
                value={form.level}
                error={error.level}
                required
                onChange={(e) => setValueForm("level", e)}
              />

              <Row>
                <Column flex={1}>
                  <Label>
                    Ano de Início &nbsp;&nbsp;<Required>*</Required>
                  </Label>

                  <InputSelect
                    width={width > 411 ? "100px" : "100%"}
                    label={"Ano"}
                    options={allYears}
                    value={form.startYear}
                    error={error.startYear}
                    onChange={(e) => setValueForm("startYear", e)}
                  />
                </Column>

                <Column flex={1}>
                  <Label>
                    Ano de Término &nbsp;&nbsp;<Required>*</Required>
                  </Label>

                  <InputSelect
                    width={width > 411 ? "100px" : "100%"}
                    label={"Ano"}
                    options={allYears}
                    value={form.endYear}
                    error={error.endYear}
                    onChange={(e) => setValueForm("endYear", e)}
                  />
                </Column>
              </Row>
            </Column>

            <Column flex={2}>
              <TextArea
                placeholder={"Descrição do curso"}
                minHeight={width > 768 ? "100%" : "194px"}
                padding={"10px"}
                value={form.description}
                error={error.description}
                onChange={(e) => onChange("description", e)}
              />
            </Column>

            <Column flex={1}>
              {width > 768 ? (
                <>
                  <IconContainer
                    onClick={(e: any) => {
                      e.preventDefault();
                      selectFile();
                    }}
                  >
                    <Icon />

                    <Title>
                      {form.file ? form.file.name : "Anexar Arquivo"}
                    </Title>

                    <SubTitle>*.pdf *.jpg *.doc</SubTitle>
                  </IconContainer>

                  <Label>Diploma ou Certificado de Conclusão de Curso</Label>
                </>
              ) : (
                <Row
                  center
                  onClick={(e: any) => {
                    e.preventDefault();
                    selectFile();
                  }}
                >
                  <IconMobile />

                  <Label>
                    Carregar ou Fotografar | Diploma ou Certificado de Conclusão
                    de Curso
                  </Label>
                </Row>
              )}
            </Column>
          </Wrapper>

          <ButtonContainer>
            <Button fixedWidth text={"Concluir"} handleButton={handleAdd} />
          </ButtonContainer>
        </Container>
      </Fade>
    </CustomModal>
  );
};

export default ModalAcademicFormation;
