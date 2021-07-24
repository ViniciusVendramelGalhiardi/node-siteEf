import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";

import {
  Container,
  Content,
  Header,
  Title,
  Column,
  ProfileImage,
  ImageProfile,
  ProfileImageIconUpload,
  IconSvg,
  IconPath,
  InputContainer,
  Image,
  StepsContainer,
  Steps,
  Step,
  Line,
  ButtonContainer,
  Description,
  DependentsContainer,
  DependentsContent,
  DependentsAdd,
  DependentsDescription,
  Dependents,
  Row,
  Icon,
  DependentsInfo,
  OptionDependent,
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

import Button from "components/button";
import Input from "components/input";

import checked from "assets/images/png/imageChecked.png";
import checkedMobile from "assets/images/png/imageCheckedMobile.png";
import successClient from "assets/images/png/successClient.png";
import InputSelect from "components/inputSelect";
import Cropper, { CroppedImage } from "components/cropper";
import useWindowSize from "hooks/useWindowSize";
import useForm from "hooks/useForm";
import Popover from "components/popover";
import {
  calculateAge,
  civilStatus,
  convertBlobToBase64,
  days,
  genders,
  months,
  quantitySons,
  years,
} from "helpers/utils";
import { removeMask } from "helpers/removeMasks";
import AlertSuccess from "components/alerts/alertSuccess";
import { api } from "services/api";
import Loading from "components/loading";

interface Props {
  professionalId: any;
  open: boolean;
  close: (e: any) => void;
}

let dependentIndex: any = null;

const ModalRegisterClientClinic: FunctionComponent<Props> = ({
  professionalId,
  open,
  close,
}) => {
  const { width } = useWindowSize();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const [hobbies, setHobbies] = useState<any>([]);
  const [allYears, setAllYears] = useState<any>([]);
  const [profession, setProfession] = useState<any>([]);
  const [workSchedule, setWorkSchedule] = useState<any>([]);
  const [healthPlan, setHealthPlan] = useState<any>([]);

  const [blobImage, setBlobImage] = useState<any>({});
  const [blobImageDependent, setBlobImageDependent] = useState<any>({});

  const [addDependents, setAddDependents] = useState<boolean>(false);
  const [dependents, setDependents] = useState<any>([]);
  const [openModalTermAndCondition, setOpenModalTermAndCondition] =
    useState<boolean>(false);

  const clientStage1 = useForm({
    name: { type: "name", required: true },
    cellphone: { type: "phone", required: true },
    email: { type: "email", required: true },
    cpf: { type: "cpf", required: false },
  });

  const clientStage2 = useForm({
    image: { type: "", required: false },
    surname: { type: "name", required: false },
    civilStatus: { type: "", required: false },
    sons: { type: "", required: false },
    hobbies: { type: "", required: false },
    birthdateDay: { type: "", required: false },
    birthdateMonth: { type: "", required: false },
    birthdateYear: { type: "", required: false },
    gender: { type: "", required: false },
    profession: { type: "", required: false },
    workSchedule: { type: "", required: false },
    healthPlan: { type: "", required: false },
  });

  const dependent = useForm({
    name: { type: "name", required: true },
    surname: { type: "name", required: false },
    birthdateDay: { type: "", required: false },
    birthdateMonth: { type: "", required: false },
    birthdateYear: { type: "", required: false },
    gender: { type: "", required: true },
    cellphone: { type: "phone", required: false },
    email: { type: "email", required: false },
    cpf: { type: "cpf", required: true },
    image: { type: "", required: false },
  });

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    dependentIndex = index;
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSuccess = () => {
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      handleClose(4);
    }, 2000);
  };

  const clearForm = useCallback(() => {
    clientStage1.clearForm();
    clientStage2.clearForm();
    dependent.clearForm();
    setDependents([]);
    setStep(0);
    dependentIndex = null;
  }, [clientStage1, clientStage2, dependent]);

  const formatData = useCallback(async () => {
    const allDependents: any = [];

    if (dependents.length > 0) {
      for (let i = 0; i < dependents.length; i++) {
        const element = dependents[i];

        let base64Dependent: any = "";

        if (blobImageDependent && Object.keys(blobImageDependent).length > 0) {
          base64Dependent = await convertBlobToBase64(blobImageDependent.blob);
        }

        const newDependent = {
          BaseImage: base64Dependent,
          Nome: element.name,
          Apelido: element.surname,
          DataNascimento: element.birthdateDay
            ? `${element.birthdateDay}/${element.birthdateMonth}/${element.birthdateYear}`
            : "",
          Genero: element.gender,
          Telefone: element.cellphone
            ? removeMask(element.cellphone, "phone")
            : "",
          Email: element.email,
          Cpf: removeMask(element.cpf, "cpf"),
        };

        allDependents.push(newDependent);
      }
    }

    let base64: any = "";

    if (blobImage && Object.keys(blobImage).length > 0) {
      base64 = await convertBlobToBase64(blobImage.blob);
    }

    return {
      IdProfissional: professionalId,
      BaseImage: base64,
      Nome: clientStage1.form.name,
      Telefone: removeMask(clientStage1.form.cellphone, "phone"),
      Email: clientStage1.form.email,
      Cpf: clientStage1.form.cpf
        ? removeMask(clientStage1.form.cpf, "cpf")
        : "",
      Apelido: clientStage2.form.surname,
      EstadoCivil: clientStage2.form.civilStatus,
      PossuiFilhosQtd: clientStage2.form.sons
        ? parseInt(clientStage2.form.sons)
        : 0,
      IdHobbie: clientStage2.form.hobbies
        ? parseInt(clientStage2.form.hobbies)
        : null,
      DataNascimento: clientStage2.form.birthdateDay
        ? `${clientStage2.form.birthdateDay}/${clientStage2.form.birthdateMonth}/${clientStage2.form.birthdateYear}`
        : "",
      Genero: clientStage2.form.gender,
      IdProfissao: clientStage2.form.profession
        ? parseInt(clientStage2.form.profession)
        : null,
      Dependente: allDependents.length > 0 ? allDependents : false,
    };
  }, [clientStage1, clientStage2, dependents, blobImage, blobImageDependent]);

  const handleRegistration = useCallback(async () => {
    try {
      setLoading(true);

      const dataFormated = await formatData();

      console.log("dataFormated", dataFormated);

      setLoading(false);

      // handleSuccess();
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [formatData, clearForm]);

  const handleNext = useCallback(async () => {
    switch (step) {
      case 0:
        const stage1 = clientStage1.validateForm();

        if (!stage1) {
          return;
        }

        break;

      case 1:
        const stage2 = clientStage2.validateForm();

        if (!stage2) {
          return;
        }

        break;

      case 2:
        await handleRegistration();

        return;

        break;

      default:
        break;
    }

    const newStep = step + 1;

    setStep(newStep);
  }, [step, clientStage1, clientStage2]);

  const handleSelectHobbies = useCallback(
    (value: any) => {
      const hobbies: any = [...clientStage2.form.hobbies];

      const existHobbie = hobbies.includes(value);

      let newHobbies = [];

      if (existHobbie) {
        newHobbies = hobbies.filter((hobbie: any) => {
          return hobbie !== value;
        });
      } else {
        hobbies.push(value);
        newHobbies = hobbies;
      }

      clientStage2.setValueForm("hobbies", newHobbies);
    },
    [clientStage2]
  );

  const handleSelectBirthdate = useCallback(
    (type: string, value: any) => {
      switch (type) {
        case "day":
          if (addDependents) {
            dependent.setValueForm("birthdateDay", value);
          } else {
            clientStage2.setValueForm("birthdateDay", value);
          }

          break;

        case "month":
          if (addDependents) {
            dependent.setValueForm("birthdateMonth", value);
          } else {
            clientStage2.setValueForm("birthdateMonth", value);
          }

          break;

        case "year":
          if (addDependents) {
            dependent.setValueForm("birthdateYear", value);
          } else {
            clientStage2.setValueForm("birthdateYear", value);
          }

          break;

        default:
          break;
      }
    },
    [addDependents, clientStage2, dependent]
  );

  const handleAddDependent = useCallback(async () => {
    const status = dependent.validateForm();

    if (!status) {
      return;
    }

    const newDependents = [...dependents];
    const age = await calculateAge(
      parseInt(dependent.form.birthdateDay),
      parseInt(dependent.form.birthdateMonth),
      parseInt(dependent.form.birthdateYear)
    );

    const newDependent = {
      age,
      ...dependent.form,
    };

    if (dependentIndex !== null) {
      newDependents[dependentIndex] = newDependent;
    } else {
      newDependents.push(newDependent);
    }

    setDependents(newDependents);

    setAddDependents(false);
    dependent.clearForm();
    dependentIndex = null;
  }, [addDependents, dependents, dependent]);

  const handleSelectDependent = useCallback(
    (type: string) => {
      handlePopoverClose();

      const newDependents = [...dependents];

      switch (type) {
        case "edit":
          dependent.setValueForm("name", newDependents[dependentIndex].name);
          dependent.setValueForm(
            "surname",
            newDependents[dependentIndex].surname
          );
          dependent.setValueForm(
            "birthdateDay",
            newDependents[dependentIndex].birthdateDay
          );
          dependent.setValueForm(
            "birthdateMonth",
            newDependents[dependentIndex].birthdateMonth
          );
          dependent.setValueForm(
            "birthdateYear",
            newDependents[dependentIndex].birthdateYear
          );
          dependent.setValueForm(
            "gender",
            newDependents[dependentIndex].gender
          );
          dependent.setValueForm(
            "cellphone",
            newDependents[dependentIndex].cellphone
          );
          dependent.setValueForm("email", newDependents[dependentIndex].email);
          dependent.setValueForm("cpf", newDependents[dependentIndex].cpf);
          dependent.setValueForm("image", newDependents[dependentIndex].image);

          setAddDependents(true);
          break;

        case "delete":
          newDependents.splice(dependentIndex, 1);
          setDependents(newDependents);
          break;
      }
    },
    [dependents, dependent]
  );

  const renderImage = useMemo(() => {
    if (step === 0) {
      if (width > 630) {
        return checked;
      } else {
        return checkedMobile;
      }
    }
  }, [step, width]);

  const handleClose = useCallback(
    (id: any = null) => {
      if (id) {
        const newPatient = {
          id,
          name: clientStage1.form.name,
          image: clientStage2.form.image,
          patientTime: "01/02/2020",
        };

        close(newPatient);
      } else {
        close(null);
      }

      clearForm();
    },
    [clientStage1, clientStage2, clearForm]
  );

  const getWorkSchedule = async () => {
    try {
      const { data } = await api.get("web/ListaHorarioTrabalho");
      setWorkSchedule(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPlans = async () => {
    try {
      const { data } = await api.get("web/ListaPlanos");
      setHealthPlan(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfession = async () => {
    try {
      const { data } = await api.get("web/ListaProfissao");
      setProfession(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getHobbies = async () => {
    try {
      const { data } = await api.get("web/ListaHobbies");
      setHobbies(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  async function init() {
    await getYears();
    await getHobbies();
    await getProfession();
    await getPlans();
    await getWorkSchedule();
  }

  useEffect(() => {
    init();

    return () => handleClose(null);
  }, []);

  const renderSteps = useMemo(() => {
    return (
      <Steps>
        <Step actived={step === 0} completed={step > 0} />
        <Line completed={step > 0} />

        <Step actived={step === 1} completed={step > 1} />
        <Line completed={step > 1} />

        <Step actived={step === 2} completed={step > 2} />
      </Steps>
    );
  }, [step]);

  const renderContent = useMemo(() => {
    if (step === 0) {
      return (
        <>
          <Column
            width={"50%"}
            padding={width > 768 ? "0px 10px 0px 50px" : "0px 20px"}
          >
            <Title width={"250px"}>Informações Pessoais</Title>

            <InputContainer>
              <Input
                label={"Nome Completo"}
                type={"text"}
                value={clientStage1.form.name}
                error={clientStage1.error.name}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage1.onChange("name", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Telefone"}
                type={"text"}
                maxLength={15}
                value={clientStage1.form.cellphone}
                error={clientStage1.error.cellphone}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage1.onChange("cellphone", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"E-mail"}
                type={"text"}
                maxLength={100}
                value={clientStage1.form.email}
                error={clientStage1.error.email}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage1.onChange("email", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"CPF"}
                type={"text"}
                maxLength={14}
                value={clientStage1.form.cpf}
                error={clientStage1.error.cpf}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage1.onChange("cpf", e)
                }
              />
            </InputContainer>

            <Description padding={width > 768 ? "20px" : "20px 0px"}>
              * Necessário para o profissional emitir seu Recibo de Pagamento de
              Autônomo ou sua Nota Fiscal de Serviço
            </Description>
          </Column>

          <Column
            width={"50%"}
            padding={width > 630 ? "0px 50px 0px 10px" : "40px 0px 0px 0px"}
          >
            {width <= 630 && (
              <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
            )}

            <Image
              image={renderImage}
              margin={width > 630 ? "40px 0px" : "40px 0px 0px 0px"}
            />
          </Column>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <Column
            width={"50%"}
            padding={
              width > 768
                ? "20px 10px 20px 80px"
                : width > 630
                ? "0px 20px"
                : "20px 20px 0px 20px"
            }
          >
            <Cropper
              onCrop={(image: CroppedImage) => {
                setBlobImage(image);
                clientStage2.setValueForm("image", image.url);
              }}
            >
              <ProfileImage>
                {clientStage2.form.image ? (
                  <ImageProfile image={clientStage2.form.image} />
                ) : (
                  <IconSvg viewBox="9.437 8.001 16.794 22.21">
                    <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                  </IconSvg>
                )}

                <ProfileImageIconUpload />
              </ProfileImage>
            </Cropper>

            <InputContainer>
              <Input
                label={"Como prefere ser chamado?"}
                type={"text"}
                value={clientStage2.form.surname}
                error={clientStage2.error.surname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage2.onChange("surname", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Estado Civil"}
                options={civilStatus}
                value={clientStage2.form.civilStatus}
                onChange={(e: any) =>
                  clientStage2.setValueForm("civilStatus", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Possui filhos?"}
                options={quantitySons}
                value={clientStage2.form.sons}
                onChange={(e: any) => clientStage2.setValueForm("sons", e)}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Hobbies"}
                // checkOption
                options={hobbies}
                value={clientStage2.form.hobbies}
                // onChange={(e) => handleSelectHobbies(e)}
                onChange={(e: any) => clientStage2.setValueForm("hobbies", e)}
              />
            </InputContainer>
          </Column>

          <Column
            width={"50%"}
            padding={
              width > 768
                ? "20px 80px 20px 10px"
                : width > 630
                ? "0px"
                : "0px 20px 20px 20px"
            }
          >
            <Title
              width={"250px"}
              padding={width > 630 ? "0px" : "20px 0px 0px 0px"}
            >
              Data de Nascimento
            </Title>

            <InputContainer>
              <InputSelect
                label={"Dia"}
                width={"68px"}
                options={days}
                error={clientStage2.error.birthdateDay}
                value={clientStage2.form.birthdateDay}
                onChange={(e) => handleSelectBirthdate("day", e)}
              />
              <InputSelect
                label={"Mês"}
                width={"73px"}
                options={months}
                error={clientStage2.error.birthdateMonth}
                value={clientStage2.form.birthdateMonth}
                onChange={(e) => handleSelectBirthdate("month", e)}
              />
              <InputSelect
                label={"Ano"}
                width={"80px"}
                options={allYears}
                error={clientStage2.error.birthdateYear}
                value={clientStage2.form.birthdateYear}
                onChange={(e) => handleSelectBirthdate("year", e)}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Gênero"}
                options={genders}
                value={clientStage2.form.gender}
                error={clientStage2.error.gender}
                onChange={(e: any) => clientStage2.setValueForm("gender", e)}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Profissão"}
                options={profession}
                value={clientStage2.form.profession}
                error={clientStage2.error.profession}
                onChange={(e: any) =>
                  clientStage2.setValueForm("profession", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Horário de trabalho"}
                options={workSchedule}
                value={clientStage2.form.workSchedule}
                error={clientStage2.error.workSchedule}
                onChange={(e: any) =>
                  clientStage2.setValueForm("workSchedule", e)
                }
              />
            </InputContainer>

            <Title width={"250px"} padding={"20px 0px 0px 0px"}>
              Possui Plano de Saúde?
            </Title>

            <InputContainer padding={"0px 0px 20px 0px"}>
              <InputSelect
                label={"Selecione..."}
                options={healthPlan}
                value={clientStage2.form.healthPlan}
                error={clientStage2.error.healthPlan}
                onChange={(e: any) =>
                  clientStage2.setValueForm("healthPlan", e)
                }
              />
            </InputContainer>

            {width <= 630 && (
              <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
            )}
          </Column>
        </>
      );
    } else if (step === 2) {
      if (addDependents) {
        return (
          <>
            <Column
              width={"50%"}
              padding={
                width > 768
                  ? "10px 10px 20px 80px"
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
                Data de Nascimento
              </Title>

              <InputContainer>
                <InputSelect
                  label={"Dia"}
                  width={"68px"}
                  options={days}
                  error={dependent.error.birthdateDay}
                  value={dependent.form.birthdateDay}
                  onChange={(e) => handleSelectBirthdate("day", e)}
                />
                <InputSelect
                  label={"Mês"}
                  width={"73px"}
                  options={months}
                  error={dependent.error.birthdateMonth}
                  value={dependent.form.birthdateMonth}
                  onChange={(e) => handleSelectBirthdate("month", e)}
                />
                <InputSelect
                  label={"Ano"}
                  width={"80px"}
                  options={allYears}
                  error={dependent.error.birthdateYear}
                  value={dependent.form.birthdateYear}
                  onChange={(e) => handleSelectBirthdate("year", e)}
                />
              </InputContainer>
            </Column>

            <Column
              width={"50%"}
              padding={
                width > 768
                  ? "10px 80px 20px 10px"
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

              {width <= 630 && (
                <ButtonContainer padding={"40px 0px 0px 0px"}>
                  <Button
                    fixedWidth
                    text={"Concluir"}
                    handleButton={handleAddDependent}
                  />
                </ButtonContainer>
              )}
            </Column>
          </>
        );
      } else {
        return (
          <Column width={"100%"} padding={"40px 20px"}>
            <DependentsContainer>
              {dependents.map((dependent: any, index: number) => (
                <Dependents key={index}>
                  <Row>
                    <DependentsDescription>
                      {dependent.name}
                    </DependentsDescription>

                    <Icon onClick={(e) => handlePopoverOpen(e, index)} />

                    <Popover
                      anchorEl={anchorEl}
                      open={openPopover}
                      close={handlePopoverClose}
                      content={
                        <>
                          <OptionDependent
                            onClick={() => handleSelectDependent("edit")}
                          >
                            Editar dependente
                          </OptionDependent>

                          <OptionDependent
                            onClick={() => handleSelectDependent("delete")}
                          >
                            Excluir
                          </OptionDependent>
                        </>
                      }
                    />
                  </Row>

                  <DependentsInfo>
                    {dependent.gender} | {dependent.age} anos | CPF{" "}
                    {dependent.cpf}
                  </DependentsInfo>
                </Dependents>
              ))}

              <DependentsContent
                onClick={() => {
                  dependentIndex = null;
                  setAddDependents(true);
                }}
              >
                <DependentsAdd>+</DependentsAdd>

                <DependentsDescription>
                  Adicionar Dependente menor de 18 anos
                </DependentsDescription>
              </DependentsContent>
            </DependentsContainer>

            {width <= 630 && (
              <ButtonContainer padding={"40px 0px 0px 0px"}>
                <Button
                  fixedWidth
                  text={"Concluir"}
                  handleButton={handleNext}
                />
              </ButtonContainer>
            )}
          </Column>
        );
      }
    }
  }, [
    step,
    addDependents,
    width,
    clientStage1,
    clientStage2,
    dependents,
    dependent,
    hobbies,
    profession,
    healthPlan,
    workSchedule,
  ]);

  return (
    <>
      <CustomModal open={open} onClose={() => handleClose(null)}>
        <Fade in={open}>
          <Container step={step} addDependents={addDependents}>
            <Header>Cadastro de Cliente do Consultório</Header>

            <StepsContainer>{renderSteps}</StepsContainer>

            {step === 1 &&
              (width > 630 ? (
                <>
                  <Title center padding={"0px 20px"}>
                    Nenhuma dessas informações são obrigatórias para o cadastro
                    de
                  </Title>
                  <Title center padding={"0px 0px 20px 0px"}>
                    pacientes do consultório. Podem ser muito úteis em uma
                    consulta futura :)
                  </Title>
                </>
              ) : (
                <>
                  <Title center padding={"0px 20px"}>
                    Nenhuma dessas informações são obrigatórias para o cadastro
                    de pacientes do consultório. Podem ser muito úteis em uma
                    consulta futura :)
                  </Title>
                </>
              ))}

            {step === 2 &&
              (addDependents ? (
                <>
                  <Title center padding={"0px 20px 40px 20px"}>
                    Informações do dependente menor de 18 anos
                  </Title>

                  <Cropper
                    onCrop={(image: CroppedImage) => {
                      setBlobImageDependent(image);
                      dependent.setValueForm("image", image.url);
                    }}
                  >
                    <ProfileImage>
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
                </>
              ) : (
                <Title center padding={"0px 20px"}>
                  Deseja adicionar dependentes ao cadastro?
                </Title>
              ))}

            <Content step={step}>{renderContent}</Content>

            {width > 630 && (
              <ButtonContainer padding={"20px 10px 40px 10px"}>
                <Button
                  fixedWidth
                  text={
                    step === 2 && !addDependents
                      ? "Concluir Cadastro"
                      : "Continuar"
                  }
                  handleButton={addDependents ? handleAddDependent : handleNext}
                />
              </ButtonContainer>
            )}

            {loading && <Loading open={loading} />}
          </Container>
        </Fade>
      </CustomModal>

      {success && (
        <AlertSuccess
          open={success}
          message={"Cadastro concluído :)"}
          image={successClient}
          close={() => setSuccess(false)}
        />
      )}
    </>
  );
};

export default ModalRegisterClientClinic;
