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
  ButtonContainer,
} from "./styles";

import { CustomModal } from "styles";

import { Fade } from "@material-ui/core";
import Input from "components/input";
import InputSelect from "components/inputSelect";
import TextArea from "components/textarea";
import Button from "components/button";
import useForm from "hooks/useForm";
import { Experience } from "interfaces/experience";
import { days, months, years } from "helpers/utils";
import { useAuth } from "hooks/useAuth";
import { api } from "services/api";

interface Props {
  data: Experience;
  edit: boolean;
  open: boolean;
  close: (e: any) => void;
}

const ModalExperiences: FunctionComponent<Props> = ({
  data,
  edit = false,
  open,
  close,
}) => {
  const { user } = useAuth();
  const [allYears, setAllYears] = useState<any>([]);
  const [experienceId, setExperienceId] = useState<any>(null);
  const { form, error, validateForm, setValueForm, clearForm, onChange } =
    useForm({
      location: { type: "name", required: true },
      activity: { type: "name", required: true },
      description: { type: "", required: false },
      startDay: { type: "", required: true },
      endDay: { type: "", required: false },
      startMonth: { type: "", required: true },
      endMonth: { type: "", required: false },
      startYear: { type: "", required: true },
      endYear: { type: "", required: false },
    });

  const formatParams = useCallback(() => {
    if (user) {
      return {
        IdUsuario: user.id,
        TipoExperiencia: form.location,
        AtividadePrincipal: form.activity,
        Descricao: form.description,
        DataInicio: `${form.startDay}/${form.startMonth}/${form.startYear}`,
        DataTermino: `${form.endDay}/${form.endMonth}/${form.endYear}`,
      };
    } else {
      return {
        TipoExperiencia: form.location,
        AtividadePrincipal: form.activity,
        Descricao: form.description,
        DataInicio: `${form.startDay}/${form.startMonth}/${form.startYear}`,
        DataTermino: `${form.endDay}/${form.endMonth}/${form.endYear}`,
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
          `web/atualizaExperienciaProf/${experienceId}`,
          params
        );

        if (!data) {
          console.log("error data", data);
        }

        id = experienceId;
      } else {
        const { data } = await api.post(`web/cadastraExperienciaProf`, params);

        if (!data) {
          console.log("error data", data);
        }

        id = data;
      }

      const newExperience = {
        id,
        ...form,
      };

      setExperienceId(null);
      close(newExperience);
      clearForm();
    } catch (error) {
      console.log("error", error);
    }
  }, [validateForm, form, clearForm, close, formatParams, experienceId, edit]);

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  const init = useCallback(async () => {
    await getYears();

    if (edit) {
      setExperienceId(data.id);

      setValueForm("location", data.location);
      setValueForm("activity", data.activity);
      setValueForm("description", data.description);
      setValueForm("startDay", data.startDay);
      setValueForm("endDay", data.endDay);
      setValueForm("startMonth", data.startMonth);
      setValueForm("endMonth", data.endMonth);
      setValueForm("startYear", data.startYear);
      setValueForm("endYear", data.endYear);
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
          <Header>Experiência Prática</Header>

          <Wrapper>
            <Column>
              <Input
                width={"100%"}
                label={"Consultório, Clínica ou Empresa"}
                type={"text"}
                value={form.location}
                error={error.location}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("location", e)
                }
              />

              <Input
                width={"100%"}
                label={"Atividade Principal"}
                type={"text"}
                value={form.activity}
                error={error.activity}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("activity", e)
                }
              />

              <TextArea
                placeholder={"Descrição"}
                minHeight={"116px"}
                maxHeight={"116px"}
                padding={"10px"}
                value={form.description}
                error={error.description}
                onChange={(e) => onChange("description", e)}
              />

              <Label>
                Data de Início &nbsp;&nbsp;<Required>*</Required>
              </Label>

              <Row>
                <InputSelect
                  label={"Dia"}
                  width={"87px"}
                  options={days}
                  value={form.startDay}
                  error={error.startDay}
                  onChange={(e) => setValueForm("startDay", e)}
                />

                <InputSelect
                  label={"Mês"}
                  width={"87px"}
                  options={months}
                  value={form.startMonth}
                  error={error.startMonth}
                  onChange={(e) => setValueForm("startMonth", e)}
                />

                <InputSelect
                  label={"Ano"}
                  width={"87px"}
                  options={allYears}
                  value={form.startYear}
                  error={error.startYear}
                  onChange={(e) => setValueForm("startYear", e)}
                />
              </Row>

              <Label>Data de Saída (não preencher, se atual)</Label>

              <Row>
                <InputSelect
                  label={"Dia"}
                  width={"87px"}
                  options={days}
                  value={form.endDay}
                  error={error.endDay}
                  onChange={(e) => setValueForm("endDay", e)}
                />

                <InputSelect
                  label={"Mês"}
                  width={"87px"}
                  options={months}
                  value={form.endMonth}
                  error={error.endMonth}
                  onChange={(e) => setValueForm("endMonth", e)}
                />

                <InputSelect
                  label={"Ano"}
                  width={"87px"}
                  options={allYears}
                  value={form.endYear}
                  error={error.endYear}
                  onChange={(e) => setValueForm("endYear", e)}
                />
              </Row>
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

export default ModalExperiences;
