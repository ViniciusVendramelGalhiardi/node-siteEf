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
  SubTitle,
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
  TermsAndConditions,
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

import { useNavigate } from "react-router-dom";

import Button from "components/button";
import Input from "components/input";

import checked from "assets/images/png/imageChecked.png";
import checkedMobile from "assets/images/png/imageCheckedMobile.png";
import imagePassword from "assets/images/png/imagePassword.png";
import imagePasswordMobile from "assets/images/png/imagePasswordMobile.png";
import successClient from "assets/images/png/successClient.png";
import Checkbox from "components/checkbox";
import InputSelect from "components/inputSelect";
import Cropper, { CroppedImage } from "components/cropper";
import useWindowSize from "hooks/useWindowSize";
import useForm from "hooks/useForm";
import Modal from "components/modais/modal";
import Popover from "components/popover";
import {
  calculateAge,
  days,
  months,
  quantitySons,
  civilStatus,
  genders,
  years,
  convertBlobToBase64,
  getAddress,
} from "helpers/utils";
import { removeMask } from "helpers/removeMasks";
import AlertSuccess from "components/alerts/alertSuccess";
import { api } from "services/api";
import { userTypes } from "config/contants";
import Loading from "components/loading";
import { useAuth } from "hooks/useAuth";

interface Props {
  open: boolean;
  close: () => void;
}

let dependentIndex: any = null;

const ModalRegisterClient: FunctionComponent<Props> = ({
  open = false,
  close = () => {},
}) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const [codeSms, setCodeSms] = useState<any>(null);

  const [metUs, setMetUs] = useState<any>([]);
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
    image: { type: "", required: false },
    name: { type: "name", required: true },
    cellphone: { type: "phone", required: true },
    email: { type: "email", required: true },
    cep: { type: "cep", required: true },
    number: { type: "number", required: true },
    idMet: { type: "", required: false },
  });

  const clientStage2 = useForm({
    code: { type: "", required: true },
    password: { type: "password", required: true },
    confirmPassword: { type: "password", required: true },
    termAndCondition: { type: "", required: true },
    privacyPolicy: { type: "", required: true },
  });

  const clientStage3 = useForm({
    surname: { type: "name", required: false },
    civilStatus: { type: "", required: false },
    sons: { type: "", required: false },
    hobbies: { type: "", required: false },
    birthdateDay: { type: "", required: true },
    birthdateMonth: { type: "", required: true },
    birthdateYear: { type: "", required: true },
    gender: { type: "", required: true },
    profession: { type: "", required: false },
    workSchedule: { type: "", required: false },
    healthPlan: { type: "", required: false },
    cpf: { type: "cpf", required: true },
  });

  const clientStage4 = useForm({
    termDependents: { type: "", required: true },
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

  const handleSuccess = useCallback(() => {
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      handleClose();

      navigate("/minha-conta", { state: userTypes.client });
    }, 2000);
  }, [navigate]);

  const clearForm = useCallback(() => {
    clientStage1.clearForm();
    clientStage2.clearForm();
    clientStage3.clearForm();
    clientStage4.clearForm();
    dependent.clearForm();
    setDependents([]);
    setStep(0);
    setCodeSms(null);
    dependentIndex = null;
  }, [clientStage1, clientStage2, clientStage3, clientStage4, dependent]);

  const sendSms = useCallback(async () => {
    try {
      const phone = removeMask(clientStage1.form.cellphone, "phone");

      const { data } = await api.post(
        `web/EnviarSMS/${phone}/${clientStage1.form.name}`
      );

      setCodeSms(data.value);
    } catch (error) {
      console.log("error", error);
    }
  }, [clientStage1]);

  const getZipcode = useCallback(async () => {
    try {
      const zipcodeClean = clientStage1.form.cep.replace("-", "");

      const newAddress: any = await getAddress(
        zipcodeClean,
        clientStage1.form.cep
      );

      if (!newAddress) {
        return;
      }

      return newAddress;
    } catch (e) {
      console.log("error", e);
    }
  }, [clientStage1]);

  const formatData = useCallback(async () => {
    const newAddress: any = await getZipcode();

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
          DataNascimento: `${element.birthdateDay}-${element.birthdateMonth}-${element.birthdateYear}`,
          Genero: element.gender,
          Telefone: removeMask(element.cellphone, "phone"),
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
      BaseImage: base64,
      Nome: clientStage1.form.name,
      Telefone: removeMask(clientStage1.form.cellphone, "phone"),
      Email: clientStage1.form.email,
      Cidade: newAddress.cidade,
      Estado: newAddress.estado,
      Cep: clientStage1.form.cep.replace("-", ""),
      Endereco: `${newAddress.logradouro}, ${clientStage1.form.number}`,
      IdConheceu: clientStage1.form.idMet
        ? parseInt(clientStage1.form.idMet)
        : null,
      Senha: clientStage2.form.password,
      Senha_Confirmar: clientStage2.form.confirmPassword,
      TermosCondicoes: clientStage2.form.termAndCondition,
      PoliticaPrivacidade: clientStage2.form.privacyPolicy,
      Apelido: clientStage3.form.surname,
      EstadoCivil: clientStage3.form.civilStatus,
      PossuiFilhosQtd: clientStage3.form.sons
        ? parseInt(clientStage3.form.sons)
        : 0,
      IdHobbie: clientStage3.form.hobbies,
      DataNascimento: `${clientStage3.form.birthdateDay}/${clientStage3.form.birthdateMonth}/${clientStage3.form.birthdateYear}`,
      Genero: clientStage3.form.gender,
      IdProfissao: clientStage3.form.profession,
      Cpf: removeMask(clientStage3.form.cpf, "cpf"),
      Dependente: true,
    };
  }, [
    clientStage1,
    clientStage2,
    clientStage3,
    dependents,
    blobImage,
    blobImageDependent,
  ]);

  const handleRegistration = useCallback(async () => {
    try {
      setLoading(true);

      const dataFormated = await formatData();

      const { data } = await api.post("web/cadastrarUsuario/1", dataFormated);

      if (data) {
        const paramsLogin = {
          email: clientStage1.form.email,
          password: clientStage2.form.password,
          type: 1,
        };

        const success = await signIn(paramsLogin);

        if (success) {
          handleSuccess();
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [formatData, clientStage1, clientStage2, handleSuccess, signIn]);

  const handleNext = useCallback(async () => {
    switch (step) {
      case 0:
        const stage1 = clientStage1.validateForm();

        if (!stage1) {
          return;
        }

        await sendSms();

        break;

      case 1:
        const stage2 = clientStage2.validateForm();

        if (!stage2) {
          return;
        }

        if (clientStage2.form.code != codeSms) {
          clientStage2.setError({
            ...clientStage2.error,
            code: "Código inválido!",
          });

          return;
        }

        if (clientStage2.form.password !== clientStage2.form.confirmPassword) {
          clientStage2.setError({
            ...clientStage2.error,
            confirmPassword: "As senhas devem ser iguais!",
          });

          return;
        }

        break;

      case 2:
        const stage3 = clientStage3.validateForm();

        if (!stage3) {
          return;
        }
        break;

      case 3:
        const stage4 = clientStage4.validateForm();

        if (!stage4) {
          return;
        }

        await handleRegistration();

        return;

        break;

      default:
        break;
    }

    const newStep = step + 1;

    setStep(newStep);
  }, [step, clientStage1, clientStage2, clientStage3, clientStage4, codeSms]);

  const handleSelectHobbies = useCallback(
    (value: any) => {
      const hobbies = [...clientStage3.form.hobbies];

      console.log("clientStage3.form.hobbies", clientStage3.form.hobbies);
      console.log("hobbies", hobbies);

      const existHobbie = hobbies.includes(value);

      console.log("existHobbie", existHobbie);

      let newHobbies: any = [];

      if (existHobbie) {
        newHobbies = hobbies.filter((hobbie: any) => {
          return hobbie !== value;
        });
      } else {
        hobbies.push(value);
        newHobbies = hobbies;
      }

      console.log("hobbies depois", hobbies);
      console.log("newHobbies", newHobbies);

      clientStage3.setValueForm("hobbies", newHobbies);
    },
    [clientStage3]
  );

  const handleSelectBirthdate = useCallback(
    (type: string, value: any) => {
      switch (type) {
        case "day":
          if (addDependents) {
            dependent.setValueForm("birthdateDay", value);
          } else {
            clientStage3.setValueForm("birthdateDay", value);
          }

          break;

        case "month":
          if (addDependents) {
            dependent.setValueForm("birthdateMonth", value);
          } else {
            clientStage3.setValueForm("birthdateMonth", value);
          }

          break;

        case "year":
          if (addDependents) {
            dependent.setValueForm("birthdateYear", value);
          } else {
            clientStage3.setValueForm("birthdateYear", value);
          }

          break;

        default:
          break;
      }
    },
    [addDependents, clientStage3, dependent]
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
  }, [dependents, dependent]);

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
    } else if (step === 1) {
      if (width > 630) {
        return imagePassword;
      } else {
        return imagePasswordMobile;
      }
    }
    return "";
  }, [step, width]);

  const renderTitle = useMemo(() => {
    if (step === 0 || step === 3) {
      return "Crie seu cadastro";
    } else if (step === 1) {
      if (width <= 630) {
        return "Crie sua senha";
      } else {
        return "Crie sua senha. Leia os Termos, as Condições e a Política de Privacidade :)";
      }
    } else if (step === 2) {
      return "Informações Opcionais";
    }
  }, [step, width]);

  const handleClose = () => {
    close();
    clearForm();
  };

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

  const getMet = async () => {
    try {
      const { data } = await api.get("web/ListaNosConheceu");
      setMetUs(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  async function init() {
    await getMet();
    await getHobbies();
    await getProfession();
    await getPlans();
    await getWorkSchedule();
    await getYears();
  }

  useEffect(() => {
    init();

    return () => handleClose();
  }, []);

  const renderSteps = useMemo(() => {
    return (
      <Steps>
        <Step actived={step === 0} completed={step > 0} />
        <Line completed={step > 0} />

        <Step actived={step === 1} completed={step > 1} />
        <Line completed={step > 1} />

        <Step actived={step === 2} completed={step > 2} />
        <Line completed={step > 2} />

        <Step actived={step === 3} completed={step > 3} />
      </Steps>
    );
  }, [step]);

  const renderContent = useMemo(() => {
    if (step === 0) {
      return (
        <>
          <Column
            width={"50%"}
            padding={
              width > 768
                ? "40px 10px 40px 50px"
                : width > 630
                ? "40px 20px"
                : "0px 20px"
            }
          >
            <Cropper
              onCrop={(image: CroppedImage) => {
                setBlobImage(image);
                clientStage1.setValueForm("image", image.url);
              }}
            >
              <ProfileImage>
                {clientStage1.form.image ? (
                  <ImageProfile image={clientStage1.form.image} />
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
                label={"CEP"}
                type={"text"}
                maxLength={9}
                value={clientStage1.form.cep}
                error={clientStage1.error.cep}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage1.onChange("cep", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Número"}
                type={"text"}
                maxLength={11}
                value={clientStage1.form.number}
                error={clientStage1.error.number}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage1.onChange("number", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Como nos conheceu?"}
                options={metUs}
                value={clientStage1.form.idMet}
                onChange={(e: any) => clientStage1.setValueForm("idMet", e)}
              />
            </InputContainer>
          </Column>

          <Column
            width={"50%"}
            padding={width > 630 ? "40px 50px 40px 10px" : "40px 0px"}
          >
            {width > 630 && renderSteps}

            {width <= 630 && (
              <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
            )}

            <Image
              image={renderImage}
              margin={width > 630 ? "40px 0px" : "40px 0px 0px 0px"}
            />

            {width > 630 && (
              <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
            )}
          </Column>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <Column
            width={"50%"}
            padding={width > 768 ? "0px 10px 40px 50px" : "0px 20px"}
          >
            <Title center padding={"0px 0px 10px 0px"}>
              Dados de Acesso
            </Title>

            <InputContainer>
              <Input
                label={"Código Recebido"}
                type={"text"}
                value={clientStage2.form.code}
                error={clientStage2.error.code}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage2.onChange("code", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Senha"}
                type={"password"}
                value={clientStage2.form.password}
                error={clientStage2.error.password}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage2.onChange("password", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Confirme a senha"}
                type={"password"}
                value={clientStage2.form.confirmPassword}
                error={clientStage2.error.confirmPassword}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage2.onChange("confirmPassword", e)
                }
              />
            </InputContainer>

            <TermsAndConditions padding={"20px 0px 10px 0px"}>
              <Checkbox
                checked={clientStage2.form.termAndCondition}
                error={clientStage2.error.termAndCondition}
                label={"Termos e Condições"}
                onChange={(e: any) => {
                  clientStage2.setValueForm("termAndCondition", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            <TermsAndConditions>
              <Checkbox
                checked={clientStage2.form.privacyPolicy}
                error={clientStage2.error.privacyPolicy}
                label={"Política de Privacidade"}
                onChange={(e: any) => {
                  clientStage2.setValueForm("privacyPolicy", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>
          </Column>

          <Column
            width={"50%"}
            padding={
              width > 768
                ? "0px 50px 40px 10px"
                : width > 630
                ? "0px 20px 20px 20px"
                : "40px 0px 0px 0px"
            }
          >
            <Image
              image={renderImage}
              large
              margin={width > 630 ? "0px 10px 40px 10px" : "40px 0px 0px 0px"}
            />

            <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
          </Column>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <Column
            width={"50%"}
            padding={width > 768 ? "20px 10px 20px 80px" : "0px 20px"}
          >
            <InputContainer>
              <Input
                label={"Como prefere ser chamado?"}
                type={"text"}
                value={clientStage3.form.surname}
                error={clientStage3.error.surname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage3.onChange("surname", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Estado Civil"}
                options={civilStatus}
                value={clientStage3.form.civilStatus}
                onChange={(e) => {
                  clientStage3.setValueForm("civilStatus", e);
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Possui filhos?"}
                options={quantitySons}
                value={clientStage3.form.sons}
                onChange={(e) => clientStage3.setValueForm("sons", e)}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Hobbies"}
                // checkOption
                options={hobbies}
                value={clientStage3.form.hobbies}
                // onChange={(e) => handleSelectHobbies(e)}
                onChange={(e) => clientStage3.setValueForm("hobbies", e)}
              />
            </InputContainer>

            <Title width={"250px"} padding={"20px 0px 0px 0px"}>
              Data de Nascimento
            </Title>

            <InputContainer>
              <InputSelect
                label={"Dia"}
                width={"70px"}
                options={days}
                error={clientStage3.error.birthdateDay}
                value={clientStage3.form.birthdateDay}
                onChange={(e) => handleSelectBirthdate("day", e)}
              />
              <InputSelect
                label={"Mês"}
                width={"73px"}
                options={months}
                error={clientStage3.error.birthdateMonth}
                value={clientStage3.form.birthdateMonth}
                onChange={(e) => handleSelectBirthdate("month", e)}
              />
              <InputSelect
                label={"Ano"}
                width={"80px"}
                options={allYears}
                error={clientStage3.error.birthdateYear}
                value={clientStage3.form.birthdateYear}
                onChange={(e) => handleSelectBirthdate("year", e)}
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
            <InputContainer>
              <InputSelect
                label={"Gênero"}
                options={genders}
                required
                value={clientStage3.form.gender}
                error={clientStage3.error.gender}
                onChange={(e) => {
                  clientStage3.setValueForm("gender", e);
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Profissão"}
                options={profession}
                required
                error={clientStage3.error.profession}
                onChange={(e: any) =>
                  clientStage3.setValueForm("profession", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Horário de trabalho"}
                options={workSchedule}
                value={clientStage3.form.workSchedule}
                onChange={(e: any) =>
                  clientStage3.setValueForm("profession", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"CPF"}
                type={"text"}
                maxLength={14}
                value={clientStage3.form.cpf}
                error={clientStage3.error.cpf}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  clientStage3.onChange("cpf", e)
                }
              />
            </InputContainer>

            {width <= 630 && (
              <Description width={"250px"} padding={"10px 0px 0px 0px"}>
                * Necessário para o profissional emitir seu Recibo de Pagamento
                de Autônomo ou sua Nota Fiscal de Serviço
              </Description>
            )}

            <Title width={"250px"} padding={"20px 0px 0px 0px"}>
              Possui Plano de Saúde?
            </Title>

            <InputContainer padding={"0px 0px 20px 0px"}>
              <InputSelect
                options={healthPlan}
                value={clientStage3.form.healthPlan}
                onChange={(e: any) =>
                  clientStage3.setValueForm("healthPlan", e)
                }
              />
            </InputContainer>

            {width <= 630 && (
              <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
            )}
          </Column>
        </>
      );
    } else if (step === 3) {
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
                  width={"70px"}
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
                  onChange={(e) => dependent.setValueForm("gender", e)}
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

            <Checkbox
              checked={clientStage4.form.termDependents}
              error={clientStage4.error.termDependents}
              label={
                "Concordo com os Termo de Consentimento para atendimento de menor de 18 anos"
              }
              onChange={(e: any) => {
                clientStage4.setValueForm("termDependents", e);
              }}
            />

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
    clientStage3,
    dependents,
    dependent,
    metUs,
    hobbies,
    profession,
    workSchedule,
    healthPlan,
  ]);

  return (
    <>
      <CustomModal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Container step={step} addDependents={addDependents}>
            <Header>{renderTitle}</Header>

            {step === 1 && width <= 630 && (
              <>
                <SubTitle padding={"20px 0px 0px 20px"}>
                  Leia os Termos, as Condições e a
                </SubTitle>
                <SubTitle padding={"0px 0px 0px 20px"}>
                  Política de Privacidade :)
                </SubTitle>
              </>
            )}

            {(step > 0 || width <= 630) && (
              <StepsContainer>{renderSteps}</StepsContainer>
            )}

            {step === 2 &&
              (width > 630 ? (
                <>
                  <Title center padding={"0px 20px"}>
                    Nenhuma dessas informações são obrigatórias para o cadastro,
                  </Title>
                  <Title center padding={"0px"}>
                    mas se possível, gostaríamos de saber mais sobre você :)
                  </Title>
                </>
              ) : (
                <>
                  <Title center padding={"0px 20px"}>
                    Nenhuma dessas informações são obrigatórias para o cadastro,
                    mas se possível, gostaríamos de saber mais sobre você :)
                  </Title>
                </>
              ))}

            {step === 3 &&
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

            {step === 2 && width > 630 && (
              <Description
                padding={width > 768 ? "0px 100px 0px 90px" : "0px 20px"}
              >
                * Necessário para o profissional emitir seu Recibo de Pagamento
                de Autônomo ou sua Nota Fiscal de Serviço
              </Description>
            )}

            {step > 1 && width > 630 && (
              <ButtonContainer padding={"20px 10px 40px 10px"}>
                <Button
                  fixedWidth
                  text={
                    step === 3 && !addDependents
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

      <Modal
        title={"Termos de Uso e Prestação de Serviço"}
        open={openModalTermAndCondition}
        close={() => setOpenModalTermAndCondition(false)}
        content={<div>Coloque o conteudo aqui</div>}
        buttons={
          <Button
            fixedWidth
            text={"Fechar"}
            handleButton={() => setOpenModalTermAndCondition(false)}
          />
        }
      />

      <AlertSuccess
        open={success}
        message={"Cadastro concluído :)"}
        image={successClient}
        close={() => setSuccess(false)}
      />
    </>
  );
};

export default ModalRegisterClient;
