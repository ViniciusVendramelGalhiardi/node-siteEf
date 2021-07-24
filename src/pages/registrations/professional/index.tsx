import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";

import {
  Container,
  Title,
  SubTitle,
  SubTitleMobile,
  Steps,
  Step,
  Line,
  Content,
  ProfileImage,
  ImageProfile,
  ProfileImageIconUpload,
  IconSvg,
  IconPath,
  InputContainer,
  TextAreaContainer,
  LimitCharacters,
  ButtonContainer,
  ButtonEpsi,
  IconEpsi,
  TermsAndConditions,
  Underlined,
  Image,
  Row,
  Column,
  Circle,
  Label,
  Required,
  AddInfosContainer,
  AddInfos,
  AddInfosLabel,
  Icon,
  OptionPopover,
  AddInfosDescription,
  AddInfosContent,
  IconAdd,
  Scroll,
} from "../styles";

import successClient from "assets/images/png/successClient.png";
import usePlatform from "assets/images/png/usePlatform.png";

import Button from "components/button";
import Cropper, { CroppedImage } from "components/cropper";
import Input from "components/input";
import InputSelect from "components/inputSelect";
import Checkbox from "components/checkbox";
import Modal from "components/modais/modal";
import AlertSuccess from "components/alerts/alertSuccess";
import {
  banks,
  weekend,
  allServiceHours,
  publics,
  days,
  months,
  years,
  presentationLetter,
  genders,
  professionPsychologistId,
  durationOfCare,
  convertBlobToBase64,
  getAddress,
} from "helpers/utils";
import Switch from "components/switch";
import Popover from "components/popover";
import TextArea from "components/textarea";
import ModalAcademicFormation from "components/modais/modalAcademicFormation";
import ModalExperiences from "components/modais/modalExperiences";
import useWindowSize from "hooks/useWindowSize";
import AlertEpsi from "components/alerts/alertEpsi";
import useForm from "hooks/useForm";
import AlertCertificate from "components/alerts/alertCertificate";
import { api } from "services/api";
import { removeMask } from "helpers/removeMasks";
import Loading from "components/loading";
import { useAuth } from "hooks/useAuth";
import { userTypes } from "config/contants";
import { useNavigate } from "react-router-dom";

interface Props {}

let activeIndex: any = null;

const ProfessionalRegistration: FunctionComponent<Props> = ({}) => {
  const { signIn } = useAuth();
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [allYears, setAllYears] = useState<any>([]);
  const [metUs, setMetUs] = useState<any>([]);
  const [profession, setProfession] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const [codeSms, setCodeSms] = useState<any>(null);
  const [blobImage, setBlobImage] = useState<any>({});

  const [completeRegistration, setCompleteRegistration] =
    useState<boolean>(false);

  // Lista de Sintomas
  const [symptomsColumn1, setSymptomsColumn1] = useState<any>([]);
  const [symptomsColumn2, setSymptomsColumn2] = useState<any>([]);
  const [symptomsColumn3, setSymptomsColumn3] = useState<any>([]);
  const [symptomsColumn4, setSymptomsColumn4] = useState<any>([]);

  const [approachTaken, setApproachTaken] = useState<any>([]);
  const [languagesServiced, setLanguagesServiced] = useState<any>([]);
  const [publicServiced, setPublicServiced] = useState<any>(publics);
  const [serviceHours, setServiceHours] = useState<any>(allServiceHours);
  const [serviceWeekend, setServiceWeekend] = useState<any>(weekend);

  const [academicFormation, setAcademicFormation] = useState<any>({});
  const [academicTraining, setAcademicTraining] = useState<any>([]);

  const [experience, setExperience] = useState<any>({});
  const [experiences, setExperiences] = useState<any>([]);

  const [openModalAcademicTraining, setOpenModalAcademicTraining] =
    useState<boolean>(false);
  const [openModalExperience, setOpenModalExperience] =
    useState<boolean>(false);
  const [openModalTermAndCondition, setOpenModalTermAndCondition] =
    useState<boolean>(false);

  const [alertEpsi, setAlertEpsi] = useState<boolean>(false);
  const [alertCertificate, setAlertCertificate] = useState<boolean>(false);

  const formStage1 = useForm({
    image: { type: "", required: false },
    name: { type: "name", required: true },
    cellphone: { type: "phone", required: true },
    email: { type: "email", required: true },
    cep: { type: "cep", required: true },
    number: { type: "number", required: true },
    state: { type: "", required: false },
    city: { type: "", required: false },
    idMet: { type: "", required: false },
  });

  const formStage2 = useForm({
    code: { type: "", required: true },
    password: { type: "password", required: true },
    confirmPassword: { type: "password", required: true },
    termAndCondition: { type: "", required: true },
    privacyPolicy: { type: "", required: true },
  });

  const formStage3 = useForm({
    profession: { type: "", required: true },
    cpf: { type: "cpf", required: true },
    birthdateDay: { type: "", required: true },
    birthdateMonth: { type: "", required: true },
    birthdateYear: { type: "", required: true },
    gender: { type: "", required: false },
  });

  const formStage4 = useForm({
    profession: { type: "", required: true },
    hasCnpj: { type: "", required: false },
  });

  const formPsychologistStage4: any = useForm({
    profession: { type: "", required: true },
    registerCrp: { type: "", required: true },
    ePsi: { type: "", required: false },
    hasCnpj: { type: "", required: false },
  });

  const formStage5 = useForm({
    presentationLetter: { type: "", required: false },
  });

  const formStage6 = useForm({
    anotherApproach: { type: "", required: false },
    otherAudience: { type: "", required: false },
    anotherLanguage: { type: "", required: false },
    reimbursementByHealthPlan: { type: "", required: false },
    attendHealthPlan: { type: "", required: false },
    serviceDuration: { type: "", required: true },
    personalAssistance: { type: "", required: false },
  });

  const formStage8 = useForm({
    sessionPrice: { type: "currency", required: true },
    freeFirstService: { type: "", required: false },
    newFixedValueCustomer: { type: "", required: false },
    partnerCompanies: { type: "", required: false },
    bank: { type: "", required: true },
    agency: { type: "", required: true },
    account: { type: "", required: true },
    digit: { type: "", required: true },
    creditCardNumber: { type: "", required: false },
    creditCardHolder: { type: "", required: false },
    creditCardValidity: { type: "", required: false },
    creditCardCode: { type: "", required: false },
  });

  const handleVerifyEpsi = useCallback(() => {
    formPsychologistStage4.setValueForm("ePsi", true);
    setAlertEpsi(!alertEpsi);
    handleCloseAlertEpsi();
  }, [alertEpsi, formPsychologistStage4]);

  const handleCloseAlertEpsi = () => {
    setTimeout(() => {
      setAlertEpsi(false);
    }, 2500);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    activeIndex = index;
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
      navigate("/minha-conta", { state: userTypes.professional });
    }, 2000);
  };

  const sendSms = useCallback(async () => {
    try {
      const phone = removeMask(formStage1.form.cellphone, "phone");

      const { data } = await api.post(
        `web/EnviarSMS/${phone}/${formStage1.form.name}`
      );

      setCodeSms(data.value);
    } catch (error) {
      console.log("error", error);
    }
  }, [formStage1]);

  const getZipcode = useCallback(async () => {
    try {
      const zipcodeClean = formStage1.form.cep.replace("-", "");

      const newAddress: any = await getAddress(
        zipcodeClean,
        formStage1.form.cep
      );

      if (!newAddress) {
        return;
      }

      return newAddress;
    } catch (e) {
      console.log("error", e);
    }
  }, [formStage1]);

  const formatData = useCallback(async () => {
    const newAddress: any = await getZipcode();

    const languagesFiltered = languagesServiced.filter((language: any) => {
      return language.checked;
    });

    const languages: any = [];

    for (let i = 0; i < languagesFiltered.length; i++) {
      const element = languagesFiltered[i];

      const newLanguage = { Ididioma: element.Id };

      languages.push(newLanguage);
    }

    const publicServicedFiltered = publicServiced.filter((publicSer: any) => {
      return publicSer.checked;
    });

    const servicePublic: any = [];

    for (let i = 0; i < publicServicedFiltered.length; i++) {
      const element = publicServicedFiltered[i];

      const newElement = { IdPublicoAtendido: element.id };

      servicePublic.push(newElement);
    }

    const approachFiltered = approachTaken.filter((appr: any) => {
      return appr.checked;
    });

    const approach: any = [];

    for (let i = 0; i < approachFiltered.length; i++) {
      const element = approachFiltered[i];

      const newApproach = { IdAbordagemAdotada: element.Id };

      approach.push(newApproach);
    }

    const academic: any = [];

    if (academicTraining && academicTraining.length > 0) {
      for (let i = 0; i < academicTraining.length; i++) {
        const element = academicTraining[i];

        const newAcademicTraining = {
          InstituicaoEnsino: element.institution,
          NomeCurso: element.course,
          NivelAcademico: element.level,
          AnoInicio: element.startYear.toString(),
          AnoTermino: element.endYear.toString(),
          DescricaoCurso: element.description,
          Anexo: element.file,
        };

        academic.push(newAcademicTraining);
      }
    }

    const newExperiences: any = [];

    if (experiences && experiences.length > 0) {
      for (let i = 0; i < experiences.length; i++) {
        const element = experiences[i];

        const newElement = {
          TipoExperiencia: element.location,
          AtividadePrincipal: element.activity,
          Descricao: element.description,
          DataInicio: `${element.startDay}/${element.startMonth}/${element.startYear}`,
          DataTermino: `${element.endDay}/${element.endMonth}/${element.endYear}`,
        };

        newExperiences.push(newElement);
      }
    }

    let base64: any = "";

    if (blobImage && Object.keys(blobImage).length > 0) {
      base64 = await convertBlobToBase64(blobImage.blob);
    }

    return {
      BaseImage: base64,
      Nome: formStage1.form.name,
      Telefone: removeMask(formStage1.form.cellphone, "phone"),
      Email: formStage1.form.email,
      Cidade: newAddress.cidade,
      Estado: newAddress.estado,
      Cep: formStage1.form.cep.replace("-", ""),
      Endereco: `${newAddress.logradouro}, ${formStage1.form.number}`,
      IdConheceu: formStage1.form.idMet
        ? parseInt(formStage1.form.idMet)
        : null,
      Senha: formStage2.form.password,
      Senha_Confirmar: formStage2.form.confirmPassword,
      TermosCondicoes: formStage2.form.termAndCondition,
      PoliticaPrivacidade: formStage2.form.privacyPolicy,
      Apelido: "",
      EstadoCivil: "",
      PossuiFilhosQtd: 0,
      IdHobbie: 1,
      DataNascimento: `${formStage3.form.birthdateDay}/${formStage3.form.birthdateMonth}/${formStage3.form.birthdateYear}`,
      Genero: formStage3.form.gender,
      IdProfissao: formStage3.form.profession,
      Cpf: removeMask(formStage3.form.cpf, "cpf"),
      Dependente: false,
      Dependentes: [],
      IdHorarioTrabalhoProf: 1,
      IdUsarPlataformaProf: 1,
      IdConselhoRegionalProf: 1,
      PossuiCNPJProf:
        formStage3.form.profession === professionPsychologistId
          ? formPsychologistStage4.form.hasCnpj
            ? true
            : false
          : formStage4.form.hasCnpj
          ? true
          : false,
      TrabalharComCNPJProf: false,
      Cnpj: "",
      CartaApresentacaoProf: formStage5.form.presentationLetter,
      IdAbordagemProf: approach,
      OutraAbordagemProf: formStage6.form.anotherApproach,
      IdsPublicoAtendido: servicePublic,
      OutroPublicoProf: formStage6.form.otherAudience,
      DuracaoAtendimentoProf: formStage6.form.serviceDuration,
      AtendePlanoDeSaudeProf: formStage6.form.attendHealthPlan ? true : false,
      ReciboReembolsavelProf: formStage6.form.reimbursementByHealthPlan
        ? true
        : false,
      AtendePresencialmenteProf: formStage6.form.personalAssistance
        ? true
        : false,
      PrimeiroClienteCobraProf: formStage8.form.freeFirstService ? true : false,
      PrimeiroClienteValorFixoProf: formStage8.form.newFixedValueCustomer
        ? true
        : false,
      EmpresasParceirasDescontoProf: formStage8.form.partnerCompanies
        ? true
        : false,
      ValorPorSessaoProf: removeMask(formStage8.form.sessionPrice, "price"),
      ExperienciasPraticaProf: newExperiences,
      FormacoesProf: academic,
      IdiomasAtendidosProf: languages,
      OutroIdiomaProf: formStage6.form.anotherLanguage,
      RegistroCRPePsi: formPsychologistStage4.form.registerCrp,
      RegistroePsiValidado: formPsychologistStage4.form.ePsi ? true : false,
      AtendimentoPresencialProf: [],
      ContasCorrente: [
        {
          Banco: formStage8.form.bank,
          Agencia: formStage8.form.agency,
          ContaCorrente: formStage8.form.account,
          DigitoVerificador: formStage8.form.digit,
        },
      ],
    };
  }, [
    formStage1,
    formStage2,
    formStage3,
    formStage4,
    formPsychologistStage4,
    formStage5,
    formStage6,
    formStage8,
    approachTaken,
    languagesServiced,
    publicServiced,
    academicTraining,
    experiences,
    blobImage,
  ]);

  const sendAccounVerificationtIugu = async (
    dataAccount: any,
    userId: number,
    userIdIugu: string
  ) => {
    try {
      const { data } = await api.get(
        `pgtoIugu/BuscarSubContaUsuario/${userIdIugu}`
      );

      if (data) {
        const response = await api.get(
          `pgtoIugu/EnviaVerificacaoConta/${userId}/${data.IdSubConta}/${data.TokenPrd}/2`
        );

        console.log("response verification", response.data);

        if (response.data) {
          const paramsLogin = {
            email: formStage1.form.email,
            password: formStage2.form.password,
            type: 2,
          };

          const success = await signIn(paramsLogin);

          if (success) {
            await handleSuccess();
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const createSubAccountIugu = async (userIdIugu: string, userId: number) => {
    try {
      const params = {
        IdUsuarioIugu: userIdIugu,
        ApiTokenIugu: process.env.REACT_APP_API_TOKEN_IUGU,
        ComissaoPorcentagem: "15",
        ValorEmRealComissao: "15,00",
        NomeSubConta: "sub conta profissional",
      };

      const { data } = await api.post("pgtoIugu/CriarSubConta", params);

      console.log("data sub account", data);

      if (data) {
        await sendAccounVerificationtIugu(data, userId, userIdIugu);
      }
    } catch (error) {
      setLoading(false);
      console.log("error createSub", error);
    }
  };

  const registerSymptoms = useCallback(
    async (userId: number) => {
      try {
        const newSymptoms: any = [];

        for (let i = 0; i < symptomsColumn1.length; i++) {
          const element = symptomsColumn1[i];

          if (element.checked) {
            const newElement = {
              IdSintomaAtendido: element.Id.toString(),
              IdUsuario: userId,
            };

            newSymptoms.push(newElement);
          }
        }

        for (let i = 0; i < symptomsColumn2.length; i++) {
          const element = symptomsColumn2[i];

          if (element.checked) {
            const newElement = {
              IdSintomaAtendido: element.Id.toString(),
              IdUsuario: userId,
            };

            newSymptoms.push(newElement);
          }
        }

        for (let i = 0; i < symptomsColumn3.length; i++) {
          const element = symptomsColumn3[i];

          if (element.checked) {
            const newElement = {
              IdSintomaAtendido: element.Id.toString(),
              IdUsuario: userId,
            };

            newSymptoms.push(newElement);
          }
        }

        for (let i = 0; i < symptomsColumn4.length; i++) {
          const element = symptomsColumn4[i];

          if (element.checked) {
            const newElement = {
              IdSintomaAtendido: element.Id.toString(),
              IdUsuario: userId,
            };

            newSymptoms.push(newElement);
          }
        }

        const { data } = await api.post("web/cadastraSintomas", newSymptoms);

        console.log("data sintomas", data);
      } catch (error) {
        console.log("error sintomas", error);
      }
    },
    [symptomsColumn1, symptomsColumn2, symptomsColumn3, symptomsColumn4]
  );

  const handleRegistration = useCallback(async () => {
    try {
      setLoading(true);

      const dataFormated = await formatData();

      console.log("dataFormated", dataFormated);

      const { data } = await api.post("web/cadastrarUsuario/2", dataFormated);

      console.log("data", data);

      if (data) {
        await registerSymptoms(data.idUsuario);
        await createSubAccountIugu(data.idUsuarioIugu, data.idUsuario);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [formatData]);

  const handleBack = useCallback(() => {
    let newStep = step - 1;
    setStep(newStep);
  }, [step]);

  const handleNext = useCallback(
    async (next: boolean = false) => {
      let newStep = step + 1;

      if (!completeRegistration) {
        switch (step) {
          case 0:
            const stage1 = formStage1.validateForm();

            if (!stage1) {
              return;
            }

            await sendSms();

            break;

          case 1:
            const stage2 = formStage2.validateForm();

            if (!stage2) {
              return;
            }

            if (formStage2.form.code != codeSms) {
              formStage2.setError({
                ...formStage2.error,
                code: "Código inválido!",
              });

              return;
            }

            if (formStage2.form.password !== formStage2.form.confirmPassword) {
              formStage2.setError({
                ...formStage2.error,
                confirmPassword: "As senhas devem ser iguais!",
              });

              return;
            }

            if (!next) {
              await handleRegistration();
              return;
            } else {
              newStep = 0;
              setCompleteRegistration(true);
            }

            break;

          default:
            break;
        }
      } else {
        switch (step) {
          case 1:
            const stage3 = formStage3.validateForm();

            if (!stage3) {
              return;
            }

            break;

          case 2:
            let stage4: any = false;

            if (formStage3.form.profession === professionPsychologistId) {
              stage4 = formPsychologistStage4.validateForm();
            } else {
              stage4 = formStage4.validateForm();
            }

            if (!stage4) {
              return;
            }

            break;

          case 3:
            if (academicTraining.length > 0) {
              setAlertCertificate(true);

              setTimeout(() => {
                setAlertCertificate(false);
              }, 3500);
            }

            break;

          case 6:
            const stage6 = formStage6.validateForm();

            if (!stage6) {
              return;
            }

            break;

          case 8:
            const stage8 = formStage8.validateForm();

            if (!stage8) {
              return;
            }

            await handleRegistration();

            return;

            break;

          default:
            break;
        }
      }

      setStep(newStep);
    },
    [
      step,
      completeRegistration,
      formStage1,
      formStage2,
      formStage3,
      formStage4,
      formPsychologistStage4,
      formStage6,
      formStage8,
      academicTraining,
      symptomsColumn1,
      symptomsColumn2,
      symptomsColumn3,
      symptomsColumn4,
      codeSms,
    ]
  );

  const handleSelectSymptoms = useCallback(
    (type: number, value: any, index: number) => {
      const newSymptomsColumn1 = [...symptomsColumn1];
      const newSymptomsColumn2 = [...symptomsColumn2];
      const newSymptomsColumn3 = [...symptomsColumn3];
      const newSymptomsColumn4 = [...symptomsColumn4];

      if (type == 1 && index == 0) {
        for (let i = 0; i < newSymptomsColumn1.length; i++) {
          const element = newSymptomsColumn1[i];
          element.checked = value;
        }

        for (let i = 0; i < newSymptomsColumn2.length; i++) {
          const element = newSymptomsColumn2[i];
          element.checked = value;
        }

        for (let i = 0; i < newSymptomsColumn3.length; i++) {
          const element = newSymptomsColumn3[i];
          element.checked = value;
        }

        for (let i = 0; i < newSymptomsColumn4.length; i++) {
          const element = newSymptomsColumn4[i];
          element.checked = value;
        }

        setSymptomsColumn1(newSymptomsColumn1);
        setSymptomsColumn2(newSymptomsColumn2);
        setSymptomsColumn3(newSymptomsColumn3);
        setSymptomsColumn4(newSymptomsColumn4);

        return;
      }

      switch (type) {
        case 1:
          newSymptomsColumn1[index].checked = value;
          setSymptomsColumn1(newSymptomsColumn1);

          break;

        case 2:
          newSymptomsColumn2[index].checked = value;
          setSymptomsColumn2(newSymptomsColumn2);

          break;

        case 3:
          newSymptomsColumn3[index].checked = value;
          setSymptomsColumn3(newSymptomsColumn3);

          break;

        case 4:
          newSymptomsColumn4[index].checked = value;
          setSymptomsColumn4(newSymptomsColumn4);

          break;

        default:
          break;
      }
    },
    [symptomsColumn1, symptomsColumn2, symptomsColumn3, symptomsColumn4]
  );

  const handleSelectServiceWeekend = useCallback(
    (value: any, index: number) => {
      const newServiceWeekend = [...serviceWeekend];
      newServiceWeekend[index].checked = value;

      setServiceWeekend(newServiceWeekend);
    },
    [serviceWeekend]
  );

  const handleSelectServiceHours = useCallback(
    (value: any, index: number) => {
      const newServiceHours = [...serviceHours];
      newServiceHours[index].checked = value;

      setServiceHours(newServiceHours);
    },
    [serviceHours]
  );

  const handleSelectLanguagesServiced = useCallback(
    (value: any, index: number) => {
      const newLanguagesServiced = [...languagesServiced];
      newLanguagesServiced[index].checked = value;

      setLanguagesServiced(newLanguagesServiced);
    },
    [languagesServiced]
  );

  const handleSelectPublicServiced = useCallback(
    (value: any, index: number) => {
      const newPublicServiced = [...publicServiced];
      newPublicServiced[index].checked = value;

      setPublicServiced(newPublicServiced);
    },
    [publicServiced]
  );

  const handleSelectApproachTaken = useCallback(
    (value: any, index: number) => {
      const newApproachTaken = [...approachTaken];
      newApproachTaken[index].checked = value;

      setApproachTaken(newApproachTaken);
    },
    [approachTaken]
  );

  const handleCloseModalExperience = useCallback(
    (data: any) => {
      if (data.location) {
        const newExperiences = [...experiences];

        if (activeIndex !== null) {
          newExperiences[activeIndex] = data;
        } else {
          newExperiences.push(data);
        }

        setExperiences(newExperiences);
      }

      setOpenModalExperience(false);
    },
    [experiences]
  );

  const handleCloseModalAcademic = useCallback(
    (data: any) => {
      if (data.institution) {
        const newAcademicTraining = [...academicTraining];

        if (activeIndex !== null) {
          newAcademicTraining[activeIndex] = data;
        } else {
          newAcademicTraining.push(data);
        }

        setAcademicTraining(newAcademicTraining);
      }

      setOpenModalAcademicTraining(false);
    },
    [academicTraining]
  );

  const handleSelectFormation = useCallback(
    (type: string) => {
      handlePopoverClose();

      const newAcademicTraining = [...academicTraining];

      switch (type) {
        case "edit":
          setAcademicFormation(newAcademicTraining[activeIndex]);
          setOpenModalAcademicTraining(true);
          break;

        case "delete":
          newAcademicTraining.splice(activeIndex, 1);
          setAcademicTraining(newAcademicTraining);
          break;
      }
    },
    [academicTraining]
  );

  const handleSelectExperience = useCallback(
    (type: string) => {
      handlePopoverClose();

      const newExperiences = [...experiences];

      switch (type) {
        case "edit":
          setExperience(newExperiences[activeIndex]);
          setOpenModalExperience(true);
          break;

        case "delete":
          newExperiences.splice(activeIndex, 1);
          setExperiences(newExperiences);
          break;
      }
    },
    [experiences]
  );

  const getSymptoms = async () => {
    try {
      const { data } = await api.get("web/ListaSintomas");

      if (data) {
        const symptoms1: any = [];
        const symptoms2: any = [];
        const symptoms3: any = [];
        const symptoms4: any = [];

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          if (i < 15) {
            symptoms1.push(element);
          } else if (i > 14 && i < 30) {
            symptoms2.push(element);
          } else if (i > 29 && i < 45) {
            symptoms3.push(element);
          } else {
            symptoms4.push(element);
          }
        }

        setSymptomsColumn1(symptoms1);
        setSymptomsColumn2(symptoms2);
        setSymptomsColumn3(symptoms3);
        setSymptomsColumn4(symptoms4);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getLanguages = async () => {
    try {
      const { data } = await api.get("web/ListaIdiomas");
      setLanguagesServiced(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getApproachTaken = async () => {
    try {
      const { data } = await api.get("web/ListarAbordagem");
      setApproachTaken(data);
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
    await getYears();
    await getMet();
    await getProfession();
    await getLanguages();
    await getSymptoms();
    await getApproachTaken();
  }

  useEffect(() => {
    init();
  }, []);

  const renderSubTitle = useMemo(() => {
    if (!completeRegistration) {
      if (step === 0) {
        return <SubTitle padding={"20px 10px"}>Informações Pessoais</SubTitle>;
      } else if (step === 1) {
        return (
          <SubTitle padding={"20px 10px"}>
            Crie sua senha. Leia os termos, as Condições e a Política de
            Privacidade :)
          </SubTitle>
        );
      }
    } else {
      if (step === 0) {
        return (
          <SubTitle padding={"20px 10px"}>
            Como você pretende utilizar a plataforma?
          </SubTitle>
        );
      } else if (step === 1) {
        return <SubTitle padding={"20px 10px"}>Informe sua Profissão</SubTitle>;
      } else if (step === 2) {
        if (formStage3.form.profession === professionPsychologistId) {
          return (
            <SubTitle padding={"20px 10px"}>
              Verificar ePSI | Exclusivo Psicólogos
            </SubTitle>
          );
        } else {
          return (
            <SubTitle padding={"20px 10px"}>
              Profissionais de Saúde e Bem Estar | Exceto Psicólogos
            </SubTitle>
          );
        }
      } else if (step === 3) {
        return (
          <SubTitle padding={"20px 10px"}>
            Acrescente sua formação acadêmica
          </SubTitle>
        );
      } else if (step === 4) {
        return (
          <SubTitle padding={"20px 10px"}>
            Acrescente suas experiências práticas
          </SubTitle>
        );
      } else if (step === 5) {
        if (width > 540) {
          return (
            <SubTitle padding={"20px 10px"}>
              Escreva uma carta de apresentação que será visualizada pelos
              clientes :)
            </SubTitle>
          );
        } else {
          return (
            <SubTitleMobile padding={"20px"}>
              Escreva uma carta de apresentação, dedique-se, pois será vista por
              centenas de novos clientes
            </SubTitleMobile>
          );
        }
      } else if (step === 6) {
        return <SubTitle padding={"20px 10px"}>Perfil de Atendimento</SubTitle>;
      } else if (step === 7) {
        if (width > 360) {
          return (
            <SubTitle padding={"20px 10px"}>
              Informe as demandas/sintomas que você atende
            </SubTitle>
          );
        } else {
          return (
            <SubTitleMobile padding={"20px"}>
              Informe as demandas/sintomas que você atende
            </SubTitleMobile>
          );
        }
      } else if (step === 8) {
        if (width > 540) {
          return (
            <SubTitle padding={"20px 10px"}>
              Está quase acabando :) Agora vamos aos dados financeiros
            </SubTitle>
          );
        } else {
          return (
            <SubTitleMobile padding={"20px"}>
              Está quase acabando :) Agora vamos aos dados financeiros
            </SubTitleMobile>
          );
        }
      }
    }
  }, [step, completeRegistration, width, formStage3]);

  const renderSteps = useMemo(() => {
    if (!completeRegistration) {
      return (
        <Steps>
          <Step actived={step === 0} completed={step > 0} />
          <Line completed={step > 0} />

          <Step actived={step === 1} completed={step > 1} />
        </Steps>
      );
    } else {
      if (step !== 0) {
        return (
          <Steps>
            <Step actived={step === 1} completed={step > 1} />
            <Line completed={step > 1} />

            <Step actived={step === 2} completed={step > 2} />
            <Line completed={step > 2} />

            <Step actived={step === 3} completed={step > 3} />
            <Line completed={step > 3} />

            <Step actived={step === 4} completed={step > 4} />
            <Line completed={step > 4} />

            <Step actived={step === 5} completed={step > 5} />
            <Line completed={step > 5} />

            <Step actived={step === 6} completed={step > 6} />
            <Line completed={step > 6} />

            <Step actived={step === 7} completed={step > 7} />
            <Line completed={step > 7} />

            <Step actived={step === 8} completed={step > 8} />
          </Steps>
        );
      }
    }
  }, [step, completeRegistration]);

  const renderContent = useMemo(() => {
    if (!completeRegistration) {
      if (step === 0) {
        return (
          <Content padding={"50px 50px 20px 50px"}>
            <Cropper
              onCrop={(image: CroppedImage) => {
                setBlobImage(image);
                formStage1.setValueForm("image", image.url);
              }}
            >
              <ProfileImage>
                {formStage1.form.image ? (
                  <ImageProfile image={formStage1.form.image} />
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
                value={formStage1.form.name}
                error={formStage1.error.name}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage1.onChange("name", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Telefone"}
                type={"text"}
                maxLength={15}
                value={formStage1.form.cellphone}
                error={formStage1.error.cellphone}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage1.onChange("cellphone", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"E-mail"}
                type={"text"}
                maxLength={100}
                value={formStage1.form.email}
                error={formStage1.error.email}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage1.onChange("email", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"CEP"}
                type={"text"}
                maxLength={9}
                value={formStage1.form.cep}
                error={formStage1.error.cep}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage1.onChange("cep", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Número"}
                type={"text"}
                maxLength={11}
                value={formStage1.form.number}
                error={formStage1.error.number}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage1.onChange("number", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Como nos conheceu?"}
                options={metUs}
                value={formStage1.form.idMet}
                onChange={(e: any) => formStage1.setValueForm("idMet", e)}
              />
            </InputContainer>

            <ButtonContainer padding={"50px 10px 0px 10px"}>
              <Button
                fixedWidth
                text={"Continuar"}
                handleButton={() => handleNext(false)}
              />
            </ButtonContainer>
          </Content>
        );
      } else if (step === 1) {
        return (
          <Content>
            <SubTitle padding={"20px 10px"}>Dados de Acesso</SubTitle>

            <InputContainer>
              <Input
                label={"Código Recebido"}
                type={"text"}
                value={formStage2.form.code}
                error={formStage2.error.code}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage2.onChange("code", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Senha"}
                type={"password"}
                value={formStage2.form.password}
                error={formStage2.error.password}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage2.onChange("password", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Confirme a senha"}
                type={"password"}
                value={formStage2.form.confirmPassword}
                error={formStage2.error.confirmPassword}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage2.onChange("confirmPassword", e)
                }
              />
            </InputContainer>

            <TermsAndConditions padding={"20px 0px 10px 0px"}>
              <Checkbox
                checked={formStage2.form.termAndCondition}
                error={formStage2.error.termAndCondition}
                label={"Termos e Condições"}
                onChange={(e: any) => {
                  formStage2.setValueForm("termAndCondition", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            <TermsAndConditions>
              <Checkbox
                checked={formStage2.form.privacyPolicy}
                error={formStage2.error.privacyPolicy}
                label={"Política de Privacidade"}
                onChange={(e: any) => {
                  formStage2.setValueForm("privacyPolicy", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            {width > 758 ? (
              <>
                <SubTitle padding={"50px 10px 10px 10px"}>
                  Você pode criar um &nbsp;
                  <Underlined>Cadastro Rápido</Underlined>, para conhecer a
                  plataforma, sem compromisso!
                </SubTitle>

                <SubTitle padding={"0px 10px"}>
                  Ou criar um &nbsp;<Underlined>Cadastro Completo</Underlined>,
                  começar a ganhar visibilidade, gerenciar o seu tempo e sua
                  agenda!
                </SubTitle>
              </>
            ) : (
              <>
                <SubTitleMobile padding={"50px 10px 0px 10px"}>
                  Você pode Concluir o seu cadastro agora
                </SubTitleMobile>

                <SubTitleMobile padding={"0px 10px"}>
                  e conhecer a plataforma, &nbsp;
                  <Underlined>sem compromisso!</Underlined>
                </SubTitleMobile>

                <SubTitleMobile padding={"30px 10px 0px 10px"}>
                  Ou criar um Cadastro Completo,
                </SubTitleMobile>

                <SubTitleMobile padding={"0px 10px"}>
                  começar a &nbsp;<Underlined>ganhar visibilidade</Underlined>,
                  &nbsp;<Underlined>gerenciar</Underlined>
                </SubTitleMobile>

                <SubTitleMobile padding={"0px 10px"}>
                  <Underlined>o seu tempo e sua agenda!</Underlined>
                </SubTitleMobile>
              </>
            )}

            <ButtonContainer
              gap={width > 402 ? "50px" : "10px"}
              padding={"50px 10px"}
            >
              <Button
                fixedWidth
                text={width > 402 ? "Cadastro Rápido" : "Concluir"}
                handleButton={() => handleNext(false)}
              />
              <Button
                fixedWidth
                text={width > 402 ? "Cadastro Completo" : "Completo"}
                handleButton={() => handleNext(true)}
              />
            </ButtonContainer>
          </Content>
        );
      }
    } else {
      if (step === 0) {
        return (
          <Content padding={"40px 10px"}>
            <Image image={usePlatform} width={"250px"} height={"225px"} />

            <Row
              width={width > 432 ? "445px" : "100%"}
              gap={"15px"}
              padding={"20px"}
              pointer
              onClick={() => handleNext(false)}
            >
              <Circle />

              <Column gap={"2px"} flex>
                {width > 441 ? (
                  <>
                    <SubTitle start>
                      Quero atrair/conquistar novos clientes e marcar
                    </SubTitle>

                    <SubTitle start>
                      consultas on-line ou presencial pela plataforma
                    </SubTitle>
                  </>
                ) : (
                  <>
                    <SubTitle start>Quero atrair/conquistar novos</SubTitle>

                    <SubTitle start>clientes e marcar consultas</SubTitle>

                    <SubTitle start>
                      on-line ou presencial pela plataforma
                    </SubTitle>
                  </>
                )}
              </Column>
            </Row>

            <Row
              width={width > 432 ? "445px" : "100%"}
              gap={"15px"}
              padding={"20px"}
              pointer
              onClick={handleRegistration}
            >
              <Circle />

              <Column gap={"2px"} flex>
                {width > 441 ? (
                  <>
                    <SubTitle start>
                      Por enquanto, preciso somente de ajuda para
                    </SubTitle>

                    <SubTitle start>
                      administrar com mais facilidade o meu consultório
                    </SubTitle>
                  </>
                ) : (
                  <>
                    <SubTitle start>Por enquanto, preciso somente de</SubTitle>

                    <SubTitle start>uma ferramenta eficiente para</SubTitle>

                    <SubTitle start>administrar com mais facilidade</SubTitle>

                    <SubTitle start>o meu consultório</SubTitle>
                  </>
                )}
              </Column>
            </Row>
          </Content>
        );
      } else if (step === 1) {
        return (
          <Content padding={"20px 10px"}>
            <InputContainer>
              <InputSelect
                label={"Profissão"}
                options={profession}
                required
                value={formStage3.form.profession}
                error={formStage3.error.profession}
                onChange={(e: any) => formStage3.setValueForm("profession", e)}
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"CPF"}
                type={"text"}
                maxLength={14}
                value={formStage3.form.cpf}
                error={formStage3.error.cpf}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage3.onChange("cpf", e)
                }
              />
            </InputContainer>

            <Label padding={"20px 0px 0px 0px"}>
              Data de Nascimento &nbsp;&nbsp;<Required>*</Required>
            </Label>

            <InputContainer>
              <InputSelect
                label={"Dia"}
                width={"70px"}
                options={days}
                value={formStage3.form.birthdateDay}
                error={formStage3.error.birthdateDay}
                onChange={(e) => formStage3.setValueForm("birthdateDay", e)}
              />
              <InputSelect
                label={"Mês"}
                width={"73px"}
                options={months}
                value={formStage3.form.birthdateMonth}
                error={formStage3.error.birthdateMonth}
                onChange={(e) => formStage3.setValueForm("birthdateMonth", e)}
              />
              <InputSelect
                label={"Ano"}
                width={"80px"}
                options={allYears}
                value={formStage3.form.birthdateYear}
                error={formStage3.error.birthdateYear}
                onChange={(e) => formStage3.setValueForm("birthdateYear", e)}
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Gênero"}
                options={genders}
                value={formStage3.form.gender}
                error={formStage3.error.gender}
                onChange={(e) => formStage3.setValueForm("gender", e)}
              />
            </InputContainer>
          </Content>
        );
      } else if (step === 2) {
        if (formStage3.form.profession === professionPsychologistId) {
          return (
            <Content padding={"20px 10px"}>
              <InputContainer>
                <Input
                  label={"Profissão: Psicólogo"}
                  type={"text"}
                  value={formPsychologistStage4.form.profession}
                  error={formPsychologistStage4.error.profession}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    formPsychologistStage4.onChange("profession", e)
                  }
                />
              </InputContainer>

              <InputContainer>
                <Input
                  label={"Região/Registro no CRP"}
                  type={"text"}
                  value={formPsychologistStage4.form.registerCrp}
                  error={formPsychologistStage4.error.registerCrp}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    formPsychologistStage4.onChange("registerCrp", e)
                  }
                />
              </InputContainer>

              <ButtonContainer padding={"40px 20px 20px 20px"}>
                <ButtonEpsi
                  verified={formPsychologistStage4.form.ePsi}
                  onClick={handleVerifyEpsi}
                >
                  {formPsychologistStage4.form.ePsi && <IconEpsi />}

                  {formPsychologistStage4.form.ePsi
                    ? "e-Psi verificado!"
                    : "Verificar e-Psi"}
                </ButtonEpsi>
              </ButtonContainer>

              {formPsychologistStage4.form.ePsi && (
                <>
                  <Label bold padding={"20px 0px 0px 0px"}>
                    Você possui CNPJ?
                  </Label>

                  <Row width={"250px"} padding={"20px 0px"}>
                    <Switch
                      checked={formPsychologistStage4.form.hasCnpj}
                      labelChecked={"Sim"}
                      labelUnchecked={"Não"}
                      onChange={(e) => {
                        formPsychologistStage4.setValueForm("hasCnpj", e);
                      }}
                    />
                  </Row>
                </>
              )}
            </Content>
          );
        } else {
          return (
            <Content padding={"20px 10px"}>
              <Label bold padding={"20px 0px 0px 0px"}>
                Perfil Profissional
              </Label>

              <InputContainer>
                <InputSelect
                  label={"Profissão"}
                  options={profession}
                  value={formStage4.form.profession}
                  error={formStage4.error.profession}
                  required
                  onChange={(e) => formStage4.setValueForm("profession", e)}
                />
              </InputContainer>

              <Label bold padding={"20px 0px 0px 0px"}>
                Você possui CNPJ?
              </Label>

              <Row width={"250px"} padding={"20px 0px"}>
                <Switch
                  checked={formStage4.form.hasCnpj}
                  labelChecked={"Sim"}
                  labelUnchecked={"Não"}
                  onChange={(e) => {
                    formStage4.setValueForm("hasCnpj", e);
                  }}
                />
              </Row>
            </Content>
          );
        }
      } else if (step === 3) {
        return (
          <Content padding={"50px 10px 10px 10px"}>
            <AddInfosContainer>
              {academicTraining.map((formation: any, index: number) => (
                <AddInfos key={index}>
                  <Row>
                    <AddInfosLabel>{formation.level}</AddInfosLabel>

                    <Icon onClick={(e) => handlePopoverOpen(e, index)} />

                    <Popover
                      anchorEl={anchorEl}
                      open={openPopover}
                      close={handlePopoverClose}
                      content={
                        <>
                          <OptionPopover
                            onClick={() => handleSelectFormation("edit")}
                          >
                            Editar formação
                          </OptionPopover>

                          <OptionPopover
                            onClick={() => handleSelectFormation("delete")}
                          >
                            Excluir
                          </OptionPopover>
                        </>
                      }
                    />
                  </Row>

                  <AddInfosDescription>
                    {formation.institution} - {formation.course}
                  </AddInfosDescription>
                </AddInfos>
              ))}

              <AddInfosContent
                onClick={() => {
                  activeIndex = null;
                  setAcademicFormation({});
                  setOpenModalAcademicTraining(true);
                }}
              >
                <IconAdd>+</IconAdd>

                <AddInfosLabel>Adicionar Formação</AddInfosLabel>
              </AddInfosContent>
            </AddInfosContainer>
          </Content>
        );
      } else if (step === 4) {
        return (
          <Content padding={"50px 10px 10px 10px"}>
            <AddInfosContainer>
              {experiences.map((experience: any, index: number) => (
                <AddInfos key={index}>
                  <Row>
                    <AddInfosLabel>{experience.activity}</AddInfosLabel>

                    <Icon onClick={(e) => handlePopoverOpen(e, index)} />

                    <Popover
                      anchorEl={anchorEl}
                      open={openPopover}
                      close={handlePopoverClose}
                      content={
                        <>
                          <OptionPopover
                            onClick={() => handleSelectExperience("edit")}
                          >
                            Editar experiência
                          </OptionPopover>

                          <OptionPopover
                            onClick={() => handleSelectExperience("delete")}
                          >
                            Excluir
                          </OptionPopover>
                        </>
                      }
                    />
                  </Row>

                  <AddInfosDescription>
                    {experience.location}
                  </AddInfosDescription>
                </AddInfos>
              ))}

              <AddInfosContent
                onClick={() => {
                  activeIndex = null;
                  setExperience({});
                  setOpenModalExperience(true);
                }}
              >
                <IconAdd>+</IconAdd>

                <AddInfosLabel>Adicionar Experiência</AddInfosLabel>
              </AddInfosContent>
            </AddInfosContainer>
          </Content>
        );
      } else if (step === 5) {
        return (
          <Content
            padding={
              width > 968
                ? "50px 200px"
                : width > 498
                ? "50px"
                : "50px 20px 20px 20px"
            }
          >
            <TextAreaContainer>
              <TextArea
                placeholder={presentationLetter}
                maxHeight={width > 498 ? "240px" : "500px"}
                minHeight={width > 498 ? "240px" : "500px"}
                padding={"20px"}
                maxLength={1000}
                value={formStage5.form.presentationLetter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formStage5.onChange("presentationLetter", e)
                }
              />

              <LimitCharacters>
                {1000 - formStage5.form.presentationLetter.length} caracteres
              </LimitCharacters>
            </TextAreaContainer>
          </Content>
        );
      } else if (step === 6) {
        return (
          <Content
            padding={
              width > 1024 ? "50px 100px" : width > 923 ? "50px" : "30px 20px"
            }
          >
            <Row
              width={"100%"}
              gap={width > 1063 ? "40px" : width > 863 ? "20px" : "10px"}
              start
              responsive
            >
              <Column flex gap={"20px"} responsive>
                <SubTitle start>Abordagem adotada</SubTitle>

                <Scroll gap={"10px"} padding={"10px 0px"}>
                  {approachTaken.map((approach: any, index: number) => (
                    <Switch
                      key={approach.Id}
                      checked={approach.checked ? true : false}
                      labelChecked={approach.Nome}
                      labelUnchecked={approach.Nome}
                      onChange={(e: any) => handleSelectApproachTaken(e, index)}
                    />
                  ))}
                </Scroll>

                <TextArea
                  maxWidth={"352px"}
                  maxHeight={"62px"}
                  minHeight={"62px"}
                  padding={"10px"}
                  placeholder={"Alguma outra abordagem?"}
                  value={formStage6.form.anotherApproach}
                  onChange={(e: any) =>
                    formStage6.onChange("anotherApproach", e)
                  }
                />
              </Column>

              <Column flex gap={"20px"} responsive>
                <SubTitle start padding={width > 843 ? "" : "20px 0px 0px 0px"}>
                  Públicos atendidos
                </SubTitle>

                <Scroll gap={"10px"} padding={"10px 0px"}>
                  {publicServiced.map((publics: any, index: number) => (
                    <Switch
                      key={publics.id}
                      checked={publics.checked ? true : false}
                      labelChecked={publics.name}
                      labelUnchecked={publics.name}
                      onChange={(e: any) =>
                        handleSelectPublicServiced(e, index)
                      }
                    />
                  ))}
                </Scroll>

                <TextArea
                  maxWidth={"352px"}
                  maxHeight={"62px"}
                  minHeight={"62px"}
                  padding={"10px"}
                  placeholder={"Algum outro público?"}
                  value={formStage6.form.otherAudience}
                  onChange={(e: any) => formStage6.onChange("otherAudience", e)}
                />
              </Column>

              <Column flex gap={"20px"} responsive>
                <SubTitle start padding={width > 843 ? "" : "20px 0px 0px 0px"}>
                  Pretende atender em outro idioma?
                </SubTitle>

                <Scroll gap={"10px"} padding={"10px 0px"}>
                  {languagesServiced.map((language: any, index: number) => (
                    <Switch
                      key={language.Id}
                      checked={language.checked ? true : false}
                      labelChecked={language.Nome}
                      labelUnchecked={language.Nome}
                      onChange={(e: any) =>
                        handleSelectLanguagesServiced(e, index)
                      }
                    />
                  ))}
                </Scroll>

                <TextArea
                  maxWidth={"352px"}
                  maxHeight={"62px"}
                  minHeight={"62px"}
                  padding={"10px"}
                  placeholder={"Algum outro idioma?"}
                  value={formStage6.form.anotherLanguage}
                  onChange={(e: any) =>
                    formStage6.onChange("anotherLanguage", e)
                  }
                />
              </Column>
            </Row>

            <Row
              width={"100%"}
              gap={width > 1063 ? "40px" : width > 863 ? "20px" : "10px"}
              start
              padding={width > 843 ? "50px 0px 0px 0px" : "20px 0px 0px 0px"}
              responsive
            >
              <Column flex gap={"20px"} responsive>
                <SubTitle start>
                  Quantas horas você pretende se dedicar ao atendimento através
                  da Efetiva Saúde?
                </SubTitle>

                <Column gap={"10px"}>
                  {serviceHours.map((hours: any, index: number) => (
                    <Switch
                      key={hours.id}
                      checked={hours.checked ? true : false}
                      labelChecked={hours.name}
                      labelUnchecked={hours.name}
                      onChange={(e: any) => handleSelectServiceHours(e, index)}
                    />
                  ))}
                </Column>
              </Column>

              <Column flex gap={"10px"} responsive>
                <SubTitle
                  start
                  padding={
                    width > 843 ? "0px 0px 10px 0px" : "20px 0px 10px 0px"
                  }
                >
                  Você atende aos finais de semana?
                </SubTitle>

                <Column gap={"10px"}>
                  {serviceWeekend.map((weekend: any, index: number) => (
                    <Switch
                      key={weekend.id}
                      checked={weekend.checked ? true : false}
                      labelChecked={weekend.name}
                      labelUnchecked={weekend.name}
                      onChange={(e: any) =>
                        handleSelectServiceWeekend(e, index)
                      }
                    />
                  ))}
                </Column>
              </Column>

              <Column flex gap={"20px"} responsive>
                <SubTitle start padding={width > 843 ? "" : "20px 0px 0px 0px"}>
                  O documento fiscal que você emite ao cliente permite reembolso
                  por plano de saúde?
                </SubTitle>

                <Column gap={"10px"}>
                  <Switch
                    checked={formStage6.form.reimbursementByHealthPlan}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      formStage6.setValueForm("reimbursementByHealthPlan", e)
                    }
                  />
                </Column>
              </Column>
            </Row>

            <Row
              width={"100%"}
              gap={width > 1063 ? "40px" : width > 863 ? "20px" : "10px"}
              start
              padding={width > 843 ? "50px 0px 0px 0px" : "20px 0px 0px 0px"}
              responsive
            >
              <Column flex gap={"20px"} responsive>
                <SubTitle start>Pretende atender pelo Plano de Saúde?</SubTitle>

                <Column gap={"10px"}>
                  <Switch
                    checked={formStage6.form.attendHealthPlan}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      formStage6.setValueForm("attendHealthPlan", e)
                    }
                  />
                </Column>
              </Column>

              <Column flex gap={"20px"} responsive>
                <SubTitle start padding={width > 843 ? "" : "20px 0px 0px 0px"}>
                  Qual será a duração de cada atendimento?
                </SubTitle>

                <InputContainer start notMargin>
                  <InputSelect
                    label={"Duração estimada"}
                    options={durationOfCare}
                    value={formStage6.form.serviceDuration}
                    error={formStage6.error.serviceDuration}
                    required
                    onChange={(e: any) =>
                      formStage6.setValueForm("serviceDuration", e)
                    }
                  />
                </InputContainer>
              </Column>

              <Column flex gap={"20px"} responsive>
                <SubTitle start padding={width > 843 ? "" : "20px 0px 0px 0px"}>
                  Sua agenda também estará disponível para atendimentos
                  presenciais?
                </SubTitle>

                <Column gap={"10px"}>
                  <Switch
                    checked={formStage6.form.personalAssistance}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      formStage6.setValueForm("personalAssistance", e)
                    }
                  />
                </Column>
              </Column>
            </Row>
          </Content>
        );
      } else if (step === 7) {
        return (
          <Content padding={width > 360 ? "50px" : "50px 20px"}>
            <Row width={"100%"} gap={"10px"} responsive start>
              <Column flex gap={"20px"} responsive>
                {symptomsColumn1.map((symptom: any, index: number) => (
                  <Switch
                    key={symptom.Id}
                    checked={symptom.checked ? true : false}
                    labelChecked={symptom.Nome}
                    labelUnchecked={symptom.Nome}
                    onChange={(e: any) => handleSelectSymptoms(1, e, index)}
                  />
                ))}
              </Column>

              <Column flex gap={"20px"} responsive>
                {symptomsColumn2.map((symptom: any, index: number) => (
                  <Switch
                    key={symptom.Id}
                    checked={symptom.checked ? true : false}
                    labelChecked={symptom.Nome}
                    labelUnchecked={symptom.Nome}
                    onChange={(e: any) => handleSelectSymptoms(2, e, index)}
                  />
                ))}
              </Column>

              <Column flex gap={"20px"} responsive>
                {symptomsColumn3.map((symptom: any, index: number) => (
                  <Switch
                    key={symptom.Id}
                    checked={symptom.checked ? true : false}
                    labelChecked={symptom.Nome}
                    labelUnchecked={symptom.Nome}
                    onChange={(e: any) => handleSelectSymptoms(3, e, index)}
                  />
                ))}
              </Column>

              <Column flex gap={"20px"} responsive>
                {symptomsColumn4.map((symptom: any, index: number) => (
                  <Switch
                    key={symptom.Id}
                    checked={symptom.checked ? true : false}
                    labelChecked={symptom.Nome}
                    labelUnchecked={symptom.Nome}
                    onChange={(e: any) => handleSelectSymptoms(4, e, index)}
                  />
                ))}
              </Column>
            </Row>
          </Content>
        );
      } else if (step === 8) {
        return (
          <Content padding={width > 340 ? "50px" : "50px 20px"}>
            <Row start width={"100%"} gap={"10px"} responsive>
              <Column flex center responsive>
                <Column responsive>
                  <SubTitle start>Quanto será cobrado por sessão?</SubTitle>

                  <InputContainer start>
                    <Input
                      label={"R$"}
                      type={"text"}
                      value={formStage8.form.sessionPrice}
                      error={formStage8.error.sessionPrice}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("sessionPrice", e)
                      }
                    />
                  </InputContainer>

                  {width > 420 ? (
                    <>
                      <SubTitle start padding={"20px 0px 0px 0px"}>
                        Você concorda em fazer somente o primeiro
                      </SubTitle>
                      <SubTitle start padding={"0px 0px 20px 0px"}>
                        atendimento de um novo cliente sem cobrança?
                      </SubTitle>
                    </>
                  ) : (
                    <SubTitle padding={"20px 0px 20px 0px"}>
                      Você concorda em fazer somente o primeiro atendimento de
                      um novo cliente sem cobrança?
                    </SubTitle>
                  )}

                  <Switch
                    checked={formStage8.form.freeFirstService ? true : false}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      formStage8.setValueForm("freeFirstService", e)
                    }
                  />

                  {width > 420 ? (
                    <>
                      <SubTitle start padding={"20px 0px 0px 0px"}>
                        E somente o primeiro atendimento de um novo
                      </SubTitle>
                      <SubTitle start padding={"0px 0px 20px 0px"}>
                        cliente pelo valor fixo de R$ 50,00??
                      </SubTitle>
                    </>
                  ) : (
                    <SubTitle padding={"20px 0px 20px 0px"}>
                      E somente o primeiro atendimento de um novo cliente pelo
                      valor fixo de R$ 50,00??
                    </SubTitle>
                  )}

                  <Switch
                    checked={
                      formStage8.form.newFixedValueCustomer ? true : false
                    }
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      formStage8.setValueForm("newFixedValueCustomer", e)
                    }
                  />

                  {width > 420 ? (
                    <>
                      <SubTitle start padding={"20px 0px 0px 0px"}>
                        Você concorda em atender empresas parceiras
                      </SubTitle>
                      <SubTitle start padding={"0px 0px 20px 0px"}>
                        oferecendo 25% de desconto no valor de sua consulta?
                      </SubTitle>
                    </>
                  ) : (
                    <SubTitle padding={"20px 0px 20px 0px"}>
                      Você concorda em atender empresas parceiras oferecendo 25%
                      de desconto no valor de sua consulta?
                    </SubTitle>
                  )}

                  <Switch
                    checked={formStage8.form.partnerCompanies ? true : false}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      formStage8.setValueForm("partnerCompanies", e)
                    }
                  />
                </Column>
              </Column>

              <Column flex center responsive>
                <Column responsive>
                  <SubTitle
                    start
                    padding={width > 843 ? "0px" : "40px 0px 0px 0px"}
                  >
                    Conta Bancária
                  </SubTitle>

                  {width > 420 ? (
                    <>
                      <Label
                        padding={"20px 0px 0px 0px"}
                        size={"15px"}
                        width={"100%"}
                      >
                        Fornecer os dados da sua conta bancária
                      </Label>

                      <Label size={"15px"} width={"100%"}>
                        para recebimento dos valores
                      </Label>

                      <Label
                        padding={"0px 0px 10px 0px"}
                        size={"15px"}
                        width={"100%"}
                      >
                        correspondentes aos seus atendimentos.
                      </Label>
                    </>
                  ) : (
                    <Label
                      padding={"20px 0px 0px 0px"}
                      size={"15px"}
                      width={"100%"}
                    >
                      Fornecer os dados da sua conta bancária para recebimento
                      dos valores correspondentes aos seus atendimentos.
                    </Label>
                  )}

                  <InputContainer start>
                    <InputSelect
                      label={"Banco"}
                      options={banks}
                      value={formStage8.form.bank}
                      error={formStage8.error.bank}
                      required
                      onChange={(e: any) => formStage8.setValueForm("bank", e)}
                    />
                  </InputContainer>

                  <InputContainer start>
                    <Input
                      label={"Agência"}
                      type={"text"}
                      value={formStage8.form.agency}
                      error={formStage8.error.agency}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("agency", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer start>
                    <Input
                      label={"Conta para crédito"}
                      type={"text"}
                      value={formStage8.form.account}
                      error={formStage8.error.account}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("account", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer start>
                    <Input
                      label={"Digito Verificador"}
                      type={"text"}
                      value={formStage8.form.digit}
                      error={formStage8.error.digit}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("digit", e)
                      }
                    />
                  </InputContainer>
                </Column>
              </Column>

              <Column flex center responsive>
                <Column responsive>
                  <SubTitle
                    start
                    padding={width > 843 ? "0px" : "40px 0px 0px 0px"}
                  >
                    Número do Cartão de Crédito
                  </SubTitle>

                  {width > 420 ? (
                    <>
                      <Label
                        padding={"20px 0px 0px 0px"}
                        size={"15px"}
                        width={"100%"}
                      >
                        Preencha esses dados somente se for
                      </Label>

                      <Label
                        padding={"0px 0px 30px 0px"}
                        size={"15px"}
                        width={"100%"}
                      >
                        atender por planos de saúde.
                      </Label>
                    </>
                  ) : (
                    <Label
                      padding={"20px 0px 0px 0px"}
                      size={"15px"}
                      width={"100%"}
                    >
                      Preencha esses dados somente se for atender por planos de
                      saúde.
                    </Label>
                  )}

                  <InputContainer start>
                    <Input
                      label={"Número"}
                      type={"text"}
                      value={formStage8.form.creditCardNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("creditCardNumber", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer start>
                    <Input
                      label={"Nome Impresso"}
                      type={"text"}
                      value={formStage8.form.creditCardHolder}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("creditCardHolder", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer start>
                    <Input
                      label={"Validade"}
                      type={"text"}
                      value={formStage8.form.creditCardValidity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("creditCardValidity", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer start>
                    <Input
                      label={"Código"}
                      type={"text"}
                      value={formStage8.form.creditCardCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formStage8.onChange("creditCardCode", e)
                      }
                    />
                  </InputContainer>
                </Column>
              </Column>
            </Row>
          </Content>
        );
      }
    }
  }, [
    step,
    completeRegistration,
    anchorEl,
    academicTraining,
    experiences,
    approachTaken,
    publicServiced,
    languagesServiced,
    serviceHours,
    serviceWeekend,
    width,
    formStage1,
    formStage2,
    formStage3,
    formStage4,
    formPsychologistStage4,
    formStage5,
    formStage6,
    formStage8,
    metUs,
    profession,
    symptomsColumn1,
    symptomsColumn2,
    symptomsColumn3,
    symptomsColumn4,
  ]);

  return (
    <Container>
      <Title>Para profissionais</Title>

      {renderSubTitle}

      {renderSteps}

      {renderContent}

      {step >= 1 && completeRegistration && (
        <ButtonContainer
          gap={width > 411 ? "50px" : "20px"}
          padding={width > 411 ? "50px 10px" : "50px 30px"}
        >
          <Button fixedWidth text={"Voltar"} handleButton={handleBack} />

          <Button
            fixedWidth
            text={step !== 8 ? "Continuar" : "Concluir"}
            handleButton={() => handleNext(false)}
          />
        </ButtonContainer>
      )}

      {openModalTermAndCondition && (
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
      )}

      {openModalAcademicTraining && (
        <ModalAcademicFormation
          open={openModalAcademicTraining}
          close={(data) => handleCloseModalAcademic(data)}
          data={academicFormation}
          edit={activeIndex !== null}
        />
      )}

      {openModalExperience && (
        <ModalExperiences
          open={openModalExperience}
          close={(data) => handleCloseModalExperience(data)}
          data={experience}
          edit={activeIndex !== null}
        />
      )}

      {alertEpsi && (
        <AlertEpsi
          open={alertEpsi}
          error={!formPsychologistStage4.form.ePsi}
          close={() => setAlertEpsi(false)}
        />
      )}

      {alertCertificate && (
        <AlertCertificate
          open={alertCertificate}
          close={() => setAlertCertificate(false)}
        />
      )}

      {success && (
        <AlertSuccess
          open={success}
          message={"Cadastro concluído :)"}
          image={successClient}
          close={() => setSuccess(false)}
        />
      )}

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default ProfessionalRegistration;
