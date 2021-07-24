import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  FunctionComponent,
} from "react";

import {
  Container,
  Row,
  Column,
  Scroll,
  ScrollColumn,
  Text,
  ButtonScheduling,
  PatientsContainer,
  IconMore,
  ExperienceContainer,
  Dependent,
  DependentIcon,
  DependentTitle,
  OptionPopover,
  Click,
  AccessData,
  AccessDataContent,
  ProfileImage,
  ImageProfile,
  ProfileImageIconUpload,
  IconSvg,
  IconPath,
  ProfileVideo,
  InputContainer,
  Icon,
  Required,
  ButtonEpsi,
  Plan,
  ButtonPlan,
  PlanDisabled,
  HeaderMedicalRecord,
  ContentMedicalRecord,
  FilterCalendarContainer,
} from "../styles";

import Button from "components/button";
import SchedulingCard from "components/schedulingCard";
import Popover from "components/popover";
import ModalAcademicFormation from "components/modais/modalAcademicFormation";
import ModalExperiences from "components/modais/modalExperiences";

import useWindowSize from "hooks/useWindowSize";
import { useSnackbar } from "hooks/useSnackbar";

import calendar from "assets/icons/png/calendario.png";
import like from "assets/icons/png/like.png";
import arrow from "assets/icons/png/arrow.png";
import schedule from "assets/icons/png/schedule.png";
import contact from "assets/icons/png/contact.png";
import contactDisabled from "assets/icons/png/contactDisabled.png";
import arrowLeft from "assets/icons/png/arrowLeft.png";
import attach from "assets/icons/png/attach.png";
import grupoMscara from "assets/images/banners/grupoMscara.png";

import { schedulingStatus, userTypes } from "config/contants";
import PatientCard from "components/patientCard";
import InputSelect from "components/inputSelect";
import {
  allServiceHours,
  banks,
  days,
  durationOfCare,
  genders,
  months,
  presentationLetter,
  publics,
  symptoms,
  timeCourses,
  weekend,
  years,
  numberToMoney,
  moneyToNumber,
  convertDurationServiceToMinutes,
  convertBlobToBase64,
  weeks,
  calculateAge,
  calculateRating,
} from "helpers/utils";
import Cropper, { CroppedImage } from "components/cropper";
import Input from "components/input";
import Switch from "components/switch";
import TextArea from "components/textarea";
import AlertEpsi from "components/alerts/alertEpsi";

import Rating from "@material-ui/lab/Rating";
import { Separator } from "styles";
import ModalRegisterClientClinic from "components/modais/modalRegisterClientClinic";
import ModalCalendar from "components/modais/modalCalendar";
import { api } from "services/api";
import Loading from "components/loading";
import useForm from "hooks/useForm";
import moment from "moment";
import CalendarRangeComponent from "components/calendarRangeComponent";
import { useAuth } from "hooks/useAuth";
import { removeMask } from "helpers/removeMasks";
import { setFormat } from "helpers/formatting";

interface Props {}

let activeIndex: any = null;

const ProfessionalAccount: FunctionComponent<Props> = ({}) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const { showSnackbar } = useSnackbar();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [popoverType, setPopoverType] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const [allYears, setAllYears] = useState<any>([]);
  const [profession, setProfession] = useState<any>([]);

  const [blobImage, setBlobImage] = useState<any>({});

  const [symptomsColumn1, setSymptomsColumn1] = useState<any>(symptoms.column1);
  const [symptomsColumn2, setSymptomsColumn2] = useState<any>(symptoms.column2);
  const [symptomsColumn3, setSymptomsColumn3] = useState<any>(symptoms.column3);
  const [symptomsColumn4, setSymptomsColumn4] = useState<any>(symptoms.column4);

  const [approachTaken, setApproachTaken] = useState<any>([]);
  const [languagesServiced, setLanguagesServiced] = useState<any>([]);
  const [publicServiced, setPublicServiced] = useState<any>(publics);
  const [serviceHours, setServiceHours] = useState<any>(allServiceHours);
  const [serviceWeekend, setServiceWeekend] = useState<any>(weekend);

  const [ratingEfetiva, setRatingEfetiva] = useState<number>(0);
  const [ratingProfessional, setRatingProfessional] = useState<number>(0);
  const [ratingContinuity, setRatingContinuity] = useState<number>(0);

  const userDataAccess = useForm({
    image: { type: "", required: false },
    email: { type: "email", required: true },
    password: { type: "password", required: true },
    newPassword: { type: "password", required: true },
    confirmNewPassword: { type: "password", required: true },
  });

  const userData = useForm({
    id: { type: "", required: false },
    name: { type: "", required: true },
    cellphone: { type: "phone", required: true },
    cpf: { type: "cpf", required: true },
    surname: { type: "name", required: false },
    gender: { type: "", required: false },
    profession: { type: "", required: false },
    birthdateDay: { type: "", required: true },
    birthdateMonth: { type: "", required: true },
    birthdateYear: { type: "", required: true },
    crpNumber: { type: "", required: true },
    ePsi: { type: "", required: false },
    hasCnpj: { type: "", required: false },
    cnpj: { type: "cnpj", required: false },
    useCnpj: { type: "", required: false },
    presentationLetter: { type: "", required: false },
    idMet: { type: "", required: false },
    city: { type: "", required: false },
    state: { type: "", required: false },
  });

  const serviceProfile = useForm({
    anotherApproach: { type: "", required: false },
    otherAudience: { type: "", required: false },
    anotherLanguage: { type: "", required: false },
    reimbursementByHealthPlan: { type: "", required: false },
    attendHealthPlan: { type: "", required: false },
    serviceDuration: { type: "", required: true },
    personalAssistance: { type: "", required: false },
  });

  const financialData = useForm({
    sessionPrice: { type: "currency", required: true },
    freeFirstService: { type: "", required: false },
    partnerCompanies: { type: "", required: false },
    bank: { type: "", required: true },
    agency: { type: "", required: true },
    account: { type: "", required: true },
    digit: { type: "", required: true },
    creditCardNumber: { type: "", required: false },
  });

  const [plans, setPlans] = useState<any>([
    {
      id: 1,
      title: "SEM MENSALIDADES",
      message:
        "Taxa de Intermediação somente ao realizar atendimento on-line ou presencial através daEfetiva Saúde",
      buttonText: "Plano atual",
      disabled: false,
    },
    {
      id: 2,
      title: "GERENCIANDO CONSULTÓRIO",
      message:
        "Acesso ao sistema completo mas sem realizar atendimento online ou presencial através da Efetiva Saúde",
      buttonText: "R$ 45,00 /mês",
      disabled: true,
    },
  ]);
  const [financialList, setFinancialList] = useState<any>([
    {
      id: 1,
      patient: "Anélia Franco",
      document: "440.570.748-05",
      typeOfService: "Consulta Psicológica",
      status: "Concluída",
      value: "R$ 250,00",
      intermediationFee: "15%",
      netValue: "R$ 212,50",
    },
    {
      id: 2,
      patient: "Rodrigo Amaral",
      document: "440.570.748-05",
      typeOfService: "Consulta Psicológica",
      status: "Concluída",
      value: "R$ 50,00",
      intermediationFee: "R$ 15,00",
      netValue: "R$ 35,00",
    },
  ]);

  const [timeCourse, setTimeCourse] = useState<any>([]);
  const officeHourRef = useRef(null);

  const [selectedDates, setSelectedDates] = useState<any>({});
  const [currentDates, setCurrentDates] = useState<any>({});
  const [officeHour, setOfficeHour] = useState<any>([]);

  const [nextAppointment, setNextAppointment] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [history, setHistory] = useState([]);

  const [patients, setPatients] = useState<any>([]);
  const [patientProfile, setPatientProfile] = useState<boolean>(false);
  const [patientData, setPatientData] = useState<any>({});
  const [patientNextAppointment, setPatientNextAppointment] = useState([]);
  const [patientScheduledAppointments, setPatientScheduledAppointments] =
    useState([]);
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientFinancialList, setPatientFinancialList] = useState<any>([]);
  const patientMedicalRecord = useForm({
    update: { type: "", required: false },
    value: { type: "", required: false },
  });

  const [upVideo, setUpVideo] = useState<any>("");

  const [academicFormation, setAcademicFormation] = useState<any>({});
  const [academicTraining, setAcademicTraining] = useState<any>([]);

  const [experience, setExperience] = useState<any>({});
  const [experiences, setExperiences] = useState<any>([]);

  const [openModalAcademicTraining, setOpenModalAcademicTraining] =
    useState<boolean>(false);
  const [openModalExperience, setOpenModalExperience] =
    useState<boolean>(false);
  const [openModalNewPatient, setOpenModalNewPatient] =
    useState<boolean>(false);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [openFilterCalendar, setOpenFilterCalendar] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<any>({});
  const [dateFilterClient, setDateFilterClient] = useState<any>({});

  const formatParams = useCallback(async () => {
    const languagesFiltered = languagesServiced.filter((language: any) => {
      return language.checked;
    });

    const languages: any = [];

    for (let i = 0; i < languagesFiltered.length; i++) {
      const element = languagesFiltered[i];

      const newLanguage = { Ididioma: element.Id };

      languages.push(newLanguage);
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

    let base64: any = "";

    if (blobImage && Object.keys(blobImage).length > 0) {
      base64 = await convertBlobToBase64(blobImage.blob);
    }

    return {
      IdUsuario: user.id,
      BaseImage: base64 ? base64 : userDataAccess.form.image,
      Nome: userData.form.name,
      Telefone: removeMask(userData.form.cellphone, "phone"),
      Email: userDataAccess.form.email,
      Cidade: userData.form.city,
      Estado: userData.form.state,
      Cep: "",
      IdConheceu: userData.form.idMet ? parseInt(userData.form.idMet) : null,
      TermosCondicoes: true,
      PoliticaPrivacidade: true,
      Apelido: userData.form.surname,
      Senha: "",
      EstadoCivil: "",
      PossuiFilhosQtd: null,
      IdHobbie: null,
      DataNascimento: `${userData.form.birthdateDay}/${userData.form.birthdateMonth}/${userData.form.birthdateYear}`,
      Genero: userData.form.gender,
      IdProfissao: userData.form.profession,
      Cpf: removeMask(userData.form.cpf, "cpf"),
      IdHorarioTrabalhoProf: null,
      IdUsarPlataformaProf: null,
      IdConselhoRegionalProf: null,
      PossuiCNPJProf: userData.form.hasCnpj,
      TrabalharComCNPJProf: userData.form.useCnpj,
      CnPj: userData.form.cnpj,
      CartaApresentacaoProf: userData.form.presentationLetter,
      IdAbordagemProf: approach,
      OutraAbordagemProf: serviceProfile.form.anotherApproach,
      IdsPublicoAtendido: [],
      OutroPublicoProf: serviceProfile.form.otherAudience,
      IdiomasAtendidosProf: languages,
      OutroIdiomaProf: serviceProfile.form.anotherLanguage,
      DuracaoAtendimentoProf: serviceProfile.form.serviceDuration,
      AtendePlanoDeSaudeProf: serviceProfile.form.attendHealthPlan
        ? true
        : false,
      ReciboReembolsavelProf: serviceProfile.form.reimbursementByHealthPlan
        ? true
        : false,
      AtendePresencialmenteProf: serviceProfile.form.personalAssistance
        ? true
        : false,
      PrimeiroClienteCobraProf: financialData.form.freeFirstService
        ? true
        : false,
      PrimeiroClienteValorFixoProf: financialData.form.freeFirstService
        ? true
        : false,
      EmpresasParceirasDescontoProf: financialData.form.partnerCompanies
        ? true
        : false,
      ValorPorSessaoProf: removeMask(financialData.form.sessionPrice, "price"),
      RegistroCRPePsi: userData.form.crpNumber,
      RegistroePsiValidado: userData.form.ePsi ? true : false,
      AtendimentoPresencialProf: [],
      ContasCorrente: [
        {
          Banco: financialData.form.bank,
          Agencia: financialData.form.agency,
          ContaCorrente: financialData.form.account,
          DigitoVerificador: financialData.form.digit,
        },
      ],
    };
  }, [
    user,
    userDataAccess,
    userData,
    serviceProfile,
    financialData,
    blobImage,
    languagesServiced,
    approachTaken,
  ]);

  const handleUpdateData = useCallback(async () => {
    try {
      setLoading(true);

      const params = await formatParams();

      console.log("params", params);

      const { data } = await api.post(`web/editarUsuario/2`, params);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [formatParams]);

  const handleUpdatePassword = useCallback(async () => {
    try {
      const validated = userDataAccess.validateForm();

      if (!validated) {
        return;
      }

      if (
        userDataAccess.form.newPassword !==
        userDataAccess.form.confirmNewPassword
      ) {
        userDataAccess.setError({
          ...userDataAccess.error,
          confirmNewPassword: "Confirme a senha corretamente!",
        });

        return;
      }

      setLoading(true);

      const { data } = await api.put(
        `web/AtualizaSenhaUsuario/${userDataAccess.form.email}?senhaatual=${userDataAccess.form.password}&novasenha=${userDataAccess.form.newPassword}&IdUsuario=${user.id}`
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [userDataAccess, user]);

  const handleSaveDemands = useCallback(async () => {
    try {
      setLoading(true);

      const params: any = [];

      const symptoms1 = symptomsColumn1.filter(
        (symptom: any) => symptom.checked === true
      );
      const symptoms2 = symptomsColumn2.filter(
        (symptom: any) => symptom.checked === true
      );
      const symptoms3 = symptomsColumn3.filter(
        (symptom: any) => symptom.checked === true
      );
      const symptoms4 = symptomsColumn4.filter(
        (symptom: any) => symptom.checked === true
      );

      const allSymptoms = symptoms1.concat(symptoms2, symptoms3, symptoms4);

      for (let i = 0; i < allSymptoms.length; i++) {
        const element = allSymptoms[i];

        const newElement = {
          IdSintomaAtendido: element.Id.toString(),
          IdUsuario: user.id,
        };

        params.push(newElement);
      }

      const { data } = await api.post("web/cadastraSintomas", params);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [
    symptomsColumn1,
    symptomsColumn2,
    symptomsColumn3,
    symptomsColumn4,
    user,
  ]);

  const handleCancelAppointment = useCallback(
    async (appointment: any, index: number, type: string) => {
      try {
        setLoading(true);

        const { data } = await api.post(
          `web/atualizarStatusAgendamento/?IdAgenda=${appointment.id}&StatusAgendamento=0`
        );

        if (data) {
          const newHistory = [...history];

          switch (type) {
            case "next":
              newHistory.push(nextAppointment[index]);
              nextAppointment.splice(index, 1);
              setNextAppointment(nextAppointment);
              break;

            case "others":
              newHistory.push(scheduledAppointments[index]);
              scheduledAppointments.splice(index, 1);
              setScheduledAppointments(scheduledAppointments);
              break;
          }

          setHistory(newHistory);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    },
    [nextAppointment, scheduledAppointments, history]
  );

  const handlePatientCancelAppointment = useCallback(
    async (appointment: any, index: number, type: string) => {
      try {
        setLoading(true);

        const { data } = await api.post(
          `web/atualizarStatusAgendamento/?IdAgenda=${appointment.id}&StatusAgendamento=0`
        );

        if (data) {
          const newHistory = [...patientHistory];

          switch (type) {
            case "next":
              newHistory.push(patientNextAppointment[index]);
              patientNextAppointment.splice(index, 1);
              setPatientNextAppointment(patientNextAppointment);
              break;

            case "others":
              newHistory.push(patientScheduledAppointments[index]);
              patientScheduledAppointments.splice(index, 1);
              setPatientScheduledAppointments(patientScheduledAppointments);
              break;
          }

          setPatientHistory(newHistory);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    },
    [patientNextAppointment, patientScheduledAppointments, patientHistory]
  );

  const handleOpenFilterCalendar = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setOpenFilterCalendar(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterCalendar = (data: any, type: string) => {
    handlePopoverClose();
    setOpenFilterCalendar(false);

    if (type === "professional") {
      setDateFilter(data);
    } else {
      setDateFilterClient(data);
    }
  };

  const handleCloseCalendar = useCallback(
    async (data: any, scroll: boolean = true) => {
      setOpenCalendar(false);

      if (data) {
        setSelectedDates(data);
        let current: any = { ...currentDates };

        if (!scroll) {
          setCurrentDates(data);
          current = data;
        }

        const newDate: any = [];

        if (data.monday.length > 0) {
          const newOfficeHour: any = {
            label: "Segunda-Feira",
            dates: data.monday,
            timeCourse: [],
          };

          if (current.monday && current.monday.length > 0) {
            for (let i = 0; i < current.monday.length; i++) {
              const element = current.monday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        if (data.tuesday.length > 0) {
          const newOfficeHour: any = {
            label: "Terça-Feira",
            dates: data.tuesday,
            timeCourse: [],
          };

          if (current.tuesday && current.tuesday.length > 0) {
            for (let i = 0; i < current.tuesday.length; i++) {
              const element = current.tuesday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        if (data.wednesday.length > 0) {
          const newOfficeHour: any = {
            label: "Quarta-Feira",
            dates: data.wednesday,
            timeCourse: [],
          };

          if (current.wednesday && current.wednesday.length > 0) {
            for (let i = 0; i < current.wednesday.length; i++) {
              const element = current.wednesday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        if (data.thursday.length > 0) {
          const newOfficeHour: any = {
            label: "Quinta-Feira",
            dates: data.thursday,
            timeCourse: [],
          };

          if (current.thursday && current.thursday.length > 0) {
            for (let i = 0; i < current.thursday.length; i++) {
              const element = current.thursday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        if (data.friday.length > 0) {
          const newOfficeHour: any = {
            label: "Sexta-Feira",
            dates: data.friday,
            timeCourse: [],
          };

          if (current.friday && current.friday.length > 0) {
            for (let i = 0; i < current.friday.length; i++) {
              const element = current.friday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        if (data.saturday.length > 0) {
          const newOfficeHour: any = {
            label: "Sábado",
            dates: data.saturday,
            timeCourse: [],
          };

          if (current.saturday && current.saturday.length > 0) {
            for (let i = 0; i < current.saturday.length; i++) {
              const element = current.saturday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        if (data.sunday.length > 0) {
          const newOfficeHour: any = {
            label: "Domingo",
            dates: data.sunday,
            timeCourse: [],
          };

          if (current.sunday && current.sunday.length > 0) {
            for (let i = 0; i < current.sunday.length; i++) {
              const element = current.sunday[i];

              if (element.hours) {
                if (newOfficeHour.timeCourse.length > 0) {
                  let exist = false;

                  for (
                    let iTime = 0;
                    iTime < newOfficeHour.timeCourse.length;
                    iTime++
                  ) {
                    const timeCourse = newOfficeHour.timeCourse[iTime];

                    if (timeCourse.start === element.hours.start) {
                      exist = true;
                    }
                  }

                  if (!exist) {
                    newOfficeHour.timeCourse.push(element.hours);
                  }
                } else {
                  newOfficeHour.timeCourse.push(element.hours);
                }
              }
            }
          }

          newDate.push(newOfficeHour);
        }

        setOfficeHour(newDate);

        if (scroll) {
          if (patientProfile) {
            setPatientProfile(false);
          }

          if (tab !== 2) {
            await handleTab(2);
          }

          scrollToRef(officeHourRef);
        }
      }
    },
    [tab, patientProfile, currentDates]
  );

  const scrollToRef = (ref: any) =>
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });

  const onSelectVideo = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpVideo(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const selectVideo = () => {
    const input = document.createElement("input");
    input.setAttribute("class", "input-image-class");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.onchange = onSelectVideo;

    input.click();
  };

  const handleUpdateMedicalRecord = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        IdUsuario: patientData.id,
        Prontuario: patientMedicalRecord.form.value,
      };

      if (patientMedicalRecord.form.update === "true") {
        const { data } = await api.post("web/AtualizaProntuarioMedico", params);
      } else {
        const { data } = await api.post(
          "web/CadastrarProntuarioMedico",
          params
        );
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }, [patientMedicalRecord, patientData]);

  const getMedicalRecord = useCallback(
    async (patientId: number) => {
      try {
        const { data } = await api.get(`web/ListaProntuario/${patientId}`);

        if (data && data.length > 0) {
          let newMedicalRecord = "";

          for (let i = 0; i < data.length; i++) {
            const element = data[i];

            newMedicalRecord += element.Prontuario + " ";
          }

          patientMedicalRecord.setValueForm("value", newMedicalRecord);
          patientMedicalRecord.setValueForm("update", "true");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [patientMedicalRecord]
  );

  const formatFinancial = useCallback(
    (element: any) => {
      const professionFiltered = profession.filter(
        (p: any) => p.Id === element.Profissional.IdProfissao
      )[0];

      return {
        id: element.IdAgendamento,
        professional: element.Profissional.Nome,
        document: element.Profissional.Cnpj ?? element.Profissional.Cpf,
        typeOfService: professionFiltered.Nome,
        status: element.StatusPagamento,
        value: `R$ ${numberToMoney(element.Profissional.ValorPorSessaoProf)}`,
      };
    },
    [profession]
  );

  const formatPatientSchedule = useCallback(
    async (element: any) => {
      const professionFiltered = profession.filter(
        (p: any) => p.Id === element.Profissional.IdProfissao
      )[0];

      const week: any = await moment(element.Data, "DD/MM/YYYY").format("dddd");

      return {
        id: element.IdAgendamento,
        activity: professionFiltered.Nome,
        name: element.Profissional.Nome,
        image: element.Profissional.BaseImage,
        date: `${element.Data} (${weeks[week]})`,
        time: `Às ${element.Hora}`,
        estimatedDuration: element.Profissional.DuracaoAtendimentoProf,
        price: `R$ ${numberToMoney(element.Profissional.ValorPorSessaoProf)}`,
        sessionId: element.IdSessao,
        professionalId: element.Profissional.idUsuario,
      };
    },
    [profession]
  );

  async function getPatientSchedules(patientId: number) {
    try {
      const { data } = await api.get(
        `web/ListarAgendamentosProfissional/${patientId}`
      );

      const newData = data.filter(
        (element: any) => element.Profissional.idUsuario === user.id
      );

      if (newData && newData.length > 0) {
        const currentDate = moment().toDate();

        const newNextAppointment: any = [];
        const newScheduledAppointments: any = [];
        const newHistory: any = [];
        const newFinancialList: any = [];

        for (let i = 0; i < newData.length; i++) {
          const element = newData[i];
          const elementFormated = await formatPatientSchedule(element);
          const date = moment(element.Data, "DD/MM/YYYY").toDate();

          if (
            i === 0 &&
            date >= currentDate &&
            element.StatusAgendamento === schedulingStatus.scheduled
          ) {
            newNextAppointment.push(elementFormated);
          } else if (
            date > currentDate &&
            element.StatusAgendamento === schedulingStatus.scheduled
          ) {
            newScheduledAppointments.push(elementFormated);
          } else {
            newHistory.push(elementFormated);
          }

          const newFinancial = await formatFinancial(element);
          newFinancialList.push(newFinancial);
        }

        setPatientNextAppointment(newNextAppointment);
        setPatientScheduledAppointments(newScheduledAppointments);
        setPatientHistory(newHistory);
        setPatientFinancialList(newFinancialList);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const getPatientData = async (patientId: number) => {
    try {
      const { data } = await api.get(`web/BuscarUsuario/${patientId}/1`);

      if (data && Object.keys(data).length > 0) {
        const newPatient = {
          id: data.idUsuario,
          name: data.Nome,
          image: data.BaseImage,
          patientDate: data.DataCadastro,
        };

        setPatientData(newPatient);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleProfile = async (patientId: number, newTab: number) => {
    setLoading(true);
    setPatientProfile(true);

    await getPatientData(patientId);
    await getPatientSchedules(patientId);
    await getMedicalRecord(patientId);

    setTab(newTab);
    setLoading(false);
  };

  const handleCloseProfile = useCallback(() => {
    patientMedicalRecord.clearForm();
    setPatientData({});
    setPatientNextAppointment([]);
    setPatientScheduledAppointments([]);
    setPatientHistory([]);
    setPatientFinancialList([]);
    setPatientProfile(false);
    setTab(1);
  }, [patientMedicalRecord]);

  const handleAddNewOfficeHour = useCallback(
    (index: number) => {
      const newOfficeHour = [...officeHour];

      newOfficeHour[index].timeCourse.push({ start: "", end: "" });
      setOfficeHour(newOfficeHour);
    },
    [officeHour]
  );

  const handleOpenOfficeHour = useCallback(
    (index: number) => {
      const newOfficeHour = [...officeHour];

      newOfficeHour[index].open = !newOfficeHour[index].open;
      setOfficeHour(newOfficeHour);
    },
    [officeHour]
  );

  const handleSelectTime = useCallback(
    (value: any, type: string, index: number, indexTime: number) => {
      const newOfficeHour = [...officeHour];

      newOfficeHour[index].timeCourse[indexTime][type] = value;

      setOfficeHour(newOfficeHour);
    },
    [officeHour]
  );

  const handleConfirmOfficeCourse = useCallback(async () => {
    try {
      setLoading(true);

      const params: any = {
        IdUsuarioProfissional: user.id,
        Expediente: [],
      };

      for (let i = 0; i < officeHour.length; i++) {
        const element = officeHour[i];

        for (let iDate = 0; iDate < element.dates.length; iDate++) {
          const dates = element.dates[iDate];

          const newDates = {
            Data: dates.date,
            Horas: element.timeCourse,
          };

          if (params.Expediente.length > 0) {
            let exist: boolean = false;

            for (let iTime = 0; iTime < params.Expediente.length; iTime++) {
              const exp = params.Expediente[iTime];

              if (dates.date === exp.Data) {
                exist = true;
              }
            }

            if (!exist) {
              params.Expediente.push(newDates);
            }
          } else {
            params.Expediente.push(newDates);
          }
        }
      }

      const { data } = await api.post("web/cadastraExpediente", params);

      setLoading(false);

      if (data) {
        // Sucesso
      } else {
        // Error
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [officeHour, user]);

  const handleCloseModalNewPatient = useCallback(
    (data: any) => {
      if (data && data.id) {
        const newPatients = [...patients];
        newPatients.push(data);
        setPatients(newPatients);
      }

      setOpenModalNewPatient(false);
    },
    [patients]
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

  const deleteFormation = async (id: number) => {
    try {
      await api.delete(`web/excluirFormacaoProf/${id}`);
    } catch (error) {
      console.log("error", error);
    }
  };

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
          deleteFormation(newAcademicTraining[activeIndex].id);

          newAcademicTraining.splice(activeIndex, 1);
          setAcademicTraining(newAcademicTraining);

          break;
      }
    },
    [academicTraining]
  );

  const deleteExperience = async (id: number) => {
    try {
      await api.delete(`web/excluirExperienciaProf/${id}`);
    } catch (error) {
      console.log("error", error);
    }
  };

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
          deleteExperience(newExperiences[activeIndex].id);

          newExperiences.splice(activeIndex, 1);
          setExperiences(newExperiences);

          break;
      }
    },
    [experiences]
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
    type: string
  ) => {
    setPopoverType(type);
    activeIndex = index;
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleTab = (newTab: number) => {
    setTab(newTab);
  };

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

  const getLanguages = async () => {
    try {
      const { data } = await api.get("web/ListaIdiomas");

      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getApproachTaken = async () => {
    try {
      const { data } = await api.get("web/ListarAbordagem");

      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSymptoms = async () => {
    try {
      const { data } = await api.get("web/ListaSintomas");

      await getDemandsMet(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getDemandsMet = useCallback(
    async (symptomsAll: any) => {
      try {
        const { data } = await api.get(
          `web/BuscarSintomaPorUsuario/${user.id}`
        );

        if (symptomsAll) {
          const symptoms1: any = [];
          const symptoms2: any = [];
          const symptoms3: any = [];
          const symptoms4: any = [];

          for (let i = 0; i < symptomsAll.length; i++) {
            const element = symptomsAll[i];

            for (let j = 0; j < data.length; j++) {
              const symptom = data[j];

              if (element.Id === parseInt(symptom.IdSintomaAtendido)) {
                element.checked = true;
              }
            }

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
    },
    [user]
  );

  const formatUserData = useCallback(
    async (data: any) => {
      userDataAccess.setValueForm("image", data.BaseImage);
      userDataAccess.setValueForm("email", data.Email);

      userData.setValueForm("id", data.idUsuario);
      userData.setValueForm("name", data.Nome);
      userData.setValueForm("cellphone", data.Telefone);
      userData.setValueForm("cpf", data.Cpf);
      userData.setValueForm("surname", data.Apelido);
      userData.setValueForm("gender", data.Genero);
      userData.setValueForm("profession", data.IdProfissao);
      userData.setValueForm("crpNumber", data.RegistroCRPePsi);
      userData.setValueForm("ePsi", data.RegistroePsiValidado);
      userData.setValueForm("hasCnpj", data.PossuiCNPJProf);
      userData.setValueForm("cnpj", data.Cnpj ? data.Cnpj : "");
      userData.setValueForm("useCnpj", data.TrabalharComCNPJProf);
      userData.setValueForm("presentationLetter", data.CartaApresentacaoProf);
      userData.setValueForm("idMet", data.IdConheceu);
      userData.setValueForm("city", data.Cidade);
      userData.setValueForm("state", data.Estado);

      const splited: any = data.DataNascimento.split("/");
      const year: any = parseInt(splited[2]);

      userData.setValueForm("birthdateDay", splited[0]);
      userData.setValueForm("birthdateMonth", splited[1]);
      userData.setValueForm("birthdateYear", year);

      if (
        data.ExperienciasPraticaProf &&
        data.ExperienciasPraticaProf.length > 0
      ) {
        const newExperiences: any = [];

        for (let i = 0; i < data.ExperienciasPraticaProf.length; i++) {
          const element = data.ExperienciasPraticaProf[i];

          const splitedStart: any = element.DataInicio.split("/");
          const yearStart: any = parseInt(splitedStart[2]);

          let splitedEnd: any = "";
          let yearEnd: any = "";

          if (element.DataTermino) {
            splitedEnd = element.DataTermino.split("/");
            yearEnd = parseInt(splitedEnd[2]);
          }

          const newElement = {
            id: element.IdExperiencia,
            location: element.TipoExperiencia,
            activity: element.AtividadePrincipal,
            description: element.Descricao,
            startDay: splitedStart[0],
            endDay: splitedEnd !== "" ? splitedEnd[0] : "",
            startMonth: splitedStart[1],
            endMonth: splitedEnd !== "" ? splitedEnd[1] : "",
            startYear: yearStart,
            endYear: yearEnd,
          };

          newExperiences.push(newElement);
        }

        setExperiences(newExperiences);
      }

      if (data.FormacoesProf && data.FormacoesProf.length > 0) {
        const newAcademicTraining: any = [];

        for (let i = 0; i < data.FormacoesProf.length; i++) {
          const element = data.FormacoesProf[i];

          const splitedStart: any = element.AnoInicio.split("/");
          const yearStart: any = parseInt(splitedStart[2]);

          const splitedEnd: any = element.AnoTermino.split("/");
          const yearEnd: any = parseInt(splitedEnd[2]);

          const newElement = {
            id: element.IdFormacao,
            institution: element.InstituicaoEnsino,
            course: element.NomeCurso,
            level: element.NivelAcademico,
            startYear: yearStart,
            endYear: yearEnd,
            description: element.DescricaoCurso,
            file: element.Anexo,
          };

          newAcademicTraining.push(newElement);
        }

        setAcademicTraining(newAcademicTraining);
      }

      serviceProfile.setValueForm(
        "serviceDuration",
        data.DuracaoAtendimentoProf
      );
      serviceProfile.setValueForm(
        "attendHealthPlan",
        data.AtendePlanoDeSaudeProf
      );
      serviceProfile.setValueForm(
        "reimbursementByHealthPlan",
        data.ReciboReembolsavelProf
      );
      serviceProfile.setValueForm(
        "personalAssistance",
        data.AtendePresencialmenteProf
      );
      serviceProfile.setValueForm("anotherApproach", data.OutraAbordagemProf);
      serviceProfile.setValueForm("anotherLanguage", data.OutroIdiomaProf);
      serviceProfile.setValueForm("otherAudience", data.OutroPublicoProf);

      const approach = await getApproachTaken();

      if (data.IdAbordagemProf && data.IdAbordagemProf.length > 0) {
        for (let i = 0; i < approach.length; i++) {
          const appr = approach[i];

          for (let ind = 0; ind < data.IdAbordagemProf.length; ind++) {
            const element = data.IdAbordagemProf[ind];

            if (element.IdAbordagemAdotada == appr.Id) {
              appr.checked = true;
            }
          }
        }
      }

      setApproachTaken(approach);

      if (data.IdsPublicoAtendido && data.IdsPublicoAtendido.length > 0) {
        for (let i = 0; i < publics.length; i++) {
          const pub: any = publics[i];

          for (let ind = 0; ind < data.IdsPublicoAtendido.length; ind++) {
            const element = data.IdsPublicoAtendido[ind];

            if (element.IdPublicoAtendido === pub.id) {
              pub.checked = true;
            }
          }
        }
      }

      setPublicServiced(publics);

      const lang = await getLanguages();

      if (data.IdiomasAtendidosProf && data.IdiomasAtendidosProf.length > 0) {
        for (let i = 0; i < lang.length; i++) {
          const language = lang[i];

          for (let ind = 0; ind < data.IdiomasAtendidosProf.length; ind++) {
            const element = data.IdiomasAtendidosProf[ind];

            if (element.Ididioma == language.Id) {
              language.checked = true;
            }
          }
        }
      }

      setLanguagesServiced(lang);

      let newValue = data.ValorPorSessaoProf
        ? numberToMoney(data.ValorPorSessaoProf)
        : "0.00";

      newValue = moneyToNumber(newValue);

      financialData.setValueForm("sessionPrice", newValue);
      financialData.setValueForm(
        "freeFirstService",
        data.PrimeiroClienteCobraProf
      );
      financialData.setValueForm(
        "partnerCompanies",
        data.EmpresasParceirasDescontoProf
      );

      if (data.ContasCorrente && data.ContasCorrente.length > 0) {
        financialData.setValueForm("bank", data.ContasCorrente[0].Banco);
        financialData.setValueForm("agency", data.ContasCorrente[0].Agencia);
        financialData.setValueForm(
          "account",
          data.ContasCorrente[0].ContaCorrente
        );
        financialData.setValueForm(
          "digit",
          data.ContasCorrente[0].DigitoVerificador
        );
      }

      financialData.setValueForm("creditCardNumber", "");

      const durationService = await convertDurationServiceToMinutes(
        data.DuracaoAtendimentoProf
      );

      const hours = await timeCourses(durationService);
      setTimeCourse(hours);
    },
    [userDataAccess, userData, serviceProfile, financialData]
  );

  const formatOfficeHour = async (data: any) => {
    const dates: any = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i].Expediente;

        const week: any = await moment(element.Data, "DD/MM/YYYY").format(
          "dddd"
        );

        const date = {
          date: element.Data,
          hours: element.Horas,
        };

        dates[week.toLowerCase()].push(date);
      }

      await handleCloseCalendar(dates, false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await api.get(`web/BuscarUsuario/${user.id}/2`);

      if (data && Object.keys(data).length > 0) {
        await formatUserData(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getEvaluationMedia = async () => {
    try {
      const { data } = await api.get(
        `web/BuscarAvaliacaoProfissionalService/${user.id}`
      );

      if (data && data.length > 0) {
        const mediaEfetiva: any = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const mediaProfessional: any = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const mediaContinuity: any = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          if (
            element.NotaEfetivaSaude !== null ||
            element.NotaEfetivaSaude !== undefined
          ) {
            mediaEfetiva[element.NotaEfetivaSaude]++;
          }

          if (
            element.NotaProfissional !== null ||
            element.NotaProfissional !== undefined
          ) {
            mediaProfessional[element.NotaProfissional]++;
          }

          if (
            element.DarContinuidade !== null ||
            element.DarContinuidade !== undefined
          ) {
            mediaContinuity[element.DarContinuidade]++;
          }
        }

        const newRatingEfetiva: any = await calculateRating(mediaEfetiva);
        const newRatingProfessional: any = await calculateRating(
          mediaProfessional
        );
        const newRatingContinuity: any = await calculateRating(mediaContinuity);

        setRatingEfetiva(newRatingEfetiva);
        setRatingProfessional(newRatingProfessional);
        setRatingContinuity(newRatingContinuity);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOfficeHour = async () => {
    try {
      const { data } = await api.get(
        `web/ListarExpedienteProfissional/${user.id}`
      );

      await formatOfficeHour(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfession = async () => {
    try {
      const { data } = await api.get("web/ListaProfissao");
      setProfession(data);

      await getSchedules(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function formatSchedule(element: any, professions: any) {
    const profession = professions.filter(
      (p: any) => p.Id === element.Profissional.IdProfissao
    )[0];

    const week: any = await moment(element.Data, "DD/MM/YYYY").format("dddd");

    const splited = element.Paciente.DataNascimento.split("/");

    const age = await calculateAge(
      parseInt(splited[0]),
      parseInt(splited[1]),
      parseInt(splited[2])
    );

    return {
      id: element.IdAgendamento,
      consultation: profession.Nome,
      name: element.Paciente.Nome,
      cpf: setFormat(element.Paciente.Cpf, "cpf"),
      age,
      crp: `CRP ${element.Profissional.RegistroCRPePsi}`,
      image: element.Paciente.BaseImage,
      date: `${element.Data} (${weeks[week]})`,
      time: `Às ${element.Hora}`,
      estimatedDuration: element.Profissional.DuracaoAtendimentoProf,
      price: `R$ ${numberToMoney(element.Profissional.ValorPorSessaoProf)}`,
      sessionId: element.IdSessao,
    };
  }

  async function getSchedules(professions: any) {
    try {
      const { data } = await api.get(
        `web/ListarAgendamentosProfissional/${user.id}`
      );

      if (data && data.length > 0) {
        const currentDate = moment().toDate();

        const newNextAppointment: any = [];
        const newScheduledAppointments: any = [];
        const newHistory: any = [];

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const elementFormated = await formatSchedule(element, professions);
          const date = moment(element.Data, "DD/MM/YYYY").toDate();

          if (
            i === 0 &&
            date >= currentDate &&
            element.StatusAgendamento === schedulingStatus.scheduled
          ) {
            newNextAppointment.push(elementFormated);
          } else if (
            date > currentDate &&
            element.StatusAgendamento === schedulingStatus.scheduled
          ) {
            newScheduledAppointments.push(elementFormated);
          } else {
            newHistory.push(elementFormated);
          }
        }

        setNextAppointment(newNextAppointment);
        setScheduledAppointments(newScheduledAppointments);
        setHistory(newHistory);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getPatients() {
    try {
      const { data } = await api.get(`web/ListarHistorico/${user.id}`);

      if (data && data.length > 0) {
        const newPatients: any = [];

        data.map((element: any) => {
          const newElement = {
            id: element.IdUsuario,
            name: element.Nome,
            image: element.BaseImage,
            patientTime: element.DataCadastro,
          };

          newPatients.push(newElement);
        });

        setPatients(newPatients);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  async function init() {
    setLoading(true);

    await getPatients();
    await getYears();
    await getProfession();
    await getOfficeHour();
    await getSymptoms();
    await getUserData();
    await getEvaluationMedia();

    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const renderTabs = useMemo(() => {
    if (tab === 0) {
      if (patientProfile) {
        return (
          <Row
            padding={"50px"}
            gap={width > 1170 ? "10px" : "40px"}
            startMobile={"1170px"}
          >
            <Column flex alignItems={width > 1170 ? "flex-start" : "center"}>
              <Column gap={"20px"}>
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"0px 0px 20px 0px"}
                >
                  Próxima Consulta
                </Text>

                {patientNextAppointment.map((next: any, index: number) => (
                  <SchedulingCard
                    key={next.id}
                    nextAppointment
                    userType={userTypes.professional}
                    client
                    data={next}
                    index={index}
                    cancelAppointment={handlePatientCancelAppointment}
                  />
                ))}
              </Column>
            </Column>

            <Column flex alignItems={"center"}>
              <Column gap={"20px"}>
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"0px 0px 20px 0px"}
                >
                  Outras Consultas Agendadas
                </Text>

                {patientScheduledAppointments.map(
                  (scheduled: any, index: number) => (
                    <SchedulingCard
                      key={scheduled.id}
                      scheduledAppointments
                      userType={userTypes.professional}
                      client
                      data={scheduled}
                      index={index}
                      cancelAppointment={handlePatientCancelAppointment}
                    />
                  )
                )}
              </Column>
            </Column>

            <Column flex alignItems={width > 1170 ? "flex-end" : "center"}>
              <Column gap={"20px"}>
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"0px 0px 20px 0px"}
                >
                  Histórico
                </Text>

                {patientHistory.map((h: any, index: number) => (
                  <SchedulingCard
                    key={h.id}
                    userType={userTypes.professional}
                    client
                    data={h}
                    index={index}
                    cancelAppointment={handlePatientCancelAppointment}
                  />
                ))}
              </Column>
            </Column>
          </Row>
        );
      } else {
        return (
          <Row
            padding={"50px"}
            gap={width > 1170 ? "10px" : "40px"}
            startMobile={"1170px"}
          >
            <Column flex alignItems={width > 1170 ? "flex-start" : "center"}>
              <Column gap={"20px"}>
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"0px 0px 20px 0px"}
                >
                  Próxima Consulta
                </Text>

                {nextAppointment.map((next: any, index: number) => (
                  <SchedulingCard
                    key={next.id}
                    nextAppointment
                    userType={userTypes.professional}
                    data={next}
                    index={index}
                    cancelAppointment={handleCancelAppointment}
                  />
                ))}
              </Column>
            </Column>

            <Column flex alignItems={"center"}>
              <Column gap={"20px"}>
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"0px 0px 20px 0px"}
                >
                  Outras Consultas Agendadas
                </Text>

                {scheduledAppointments.map((scheduled: any, index: number) => (
                  <SchedulingCard
                    key={scheduled.id}
                    scheduledAppointments
                    userType={userTypes.professional}
                    data={scheduled}
                    index={index}
                    cancelAppointment={handleCancelAppointment}
                  />
                ))}
              </Column>
            </Column>

            <Column flex alignItems={width > 1170 ? "flex-end" : "center"}>
              <Column gap={"20px"}>
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"0px 0px 20px 0px"}
                >
                  Histórico
                </Text>

                {history.map((h: any, index: number) => (
                  <SchedulingCard
                    key={h.id}
                    userType={userTypes.professional}
                    data={h}
                    index={index}
                    cancelAppointment={handleCancelAppointment}
                  />
                ))}
              </Column>
            </Column>
          </Row>
        );
      }
    } else if (tab === 1) {
      if (patientProfile) {
        return (
          <Row padding={width > 416 ? "50px" : "20px"}>
            <Column flex>
              <HeaderMedicalRecord>
                <Text color={"#343434"} size={"14px"} bold>
                  Prontuário do Cliente
                </Text>
              </HeaderMedicalRecord>

              <ContentMedicalRecord>
                <TextArea
                  placeholder={"Digite aqui"}
                  minHeight={"266px"}
                  maxHeight={"266px"}
                  padding={"10px"}
                  value={patientMedicalRecord.form.value}
                  error={patientMedicalRecord.form.error}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    patientMedicalRecord.onChange("value", e)
                  }
                />
              </ContentMedicalRecord>

              <Row
                padding={"50px 0px 0px 0px"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Button
                  fixedWidth
                  text={"Atualizar"}
                  handleButton={handleUpdateMedicalRecord}
                />
              </Row>
            </Column>
          </Row>
        );
      } else {
        return (
          <Row padding={width > 416 ? "50px" : "20px"}>
            <Column flex>
              <Text
                color={"#797979"}
                size={"16px"}
                bold
                padding={"0px 0px 20px 0px"}
              >
                Lista de Pacientes
              </Text>

              {patients && patients.length > 0 && (
                <PatientsContainer>
                  {patients.map((patient: any) => (
                    <PatientCard
                      key={patient.id}
                      data={patient}
                      goToProfile={handleProfile}
                    />
                  ))}
                </PatientsContainer>
              )}

              {/* <Row padding={"50px 0px 0px 0px"}>
                <ButtonScheduling
                  padding={"0px 20px"}
                  onClick={() => setOpenModalNewPatient(true)}
                >
                  <IconMore>
                    <Text color={"#FFF"} size={"30px"}>
                      +
                    </Text>
                  </IconMore>

                  <Text color={"#0878D3"} size={"15px"} bold>
                    Adicionar Paciente do Consultório
                  </Text>
                </ButtonScheduling>
              </Row> */}
            </Column>
          </Row>
        );
      }
    } else if (tab === 2) {
      if (patientProfile) {
        return (
          <Row
            padding={width > 416 ? " 30px 50px 50px 50px" : "20px"}
            gap={"10px"}
          >
            <Column table flex>
              <Row alignItems={"center"} justifyContent={"flex-end"}>
                <Click
                  gap={"10px"}
                  onClick={(e: any) => handleOpenFilterCalendar(e)}
                >
                  <Icon width={"23px"} height={"27px"} image={schedule} />

                  <Column>
                    <Text
                      color={"#0878D3"}
                      size={"15px"}
                      bold
                      padding={"20px 0px 0px 0px"}
                    >
                      Período
                    </Text>

                    <Text
                      color={"#0878D3"}
                      size={"15px"}
                      bold
                      padding={"0px 0px 20px 0px"}
                    >
                      {dateFilterClient &&
                      Object.keys(dateFilterClient).length > 0 ? (
                        <>
                          {dateFilterClient.startDate} a{" "}
                          {dateFilterClient.endDate}
                        </>
                      ) : (
                        "Selecione uma data"
                      )}
                    </Text>
                  </Column>
                </Click>

                {openFilterCalendar && (
                  <Popover
                    anchorEl={anchorEl}
                    open={openPopover}
                    close={handlePopoverClose}
                    noBackgroundColor={true}
                    content={
                      <CalendarRangeComponent
                        handleButton={(e: any) =>
                          handleCloseFilterCalendar(e, "client")
                        }
                      />
                    }
                  />
                )}
              </Row>

              <Scroll column>
                <Row gap={"10px"} padding={"10px 0px"}>
                  <Column
                    table
                    flex
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#797979"} size={"15px"} bold>
                      Profissional
                    </Text>
                  </Column>

                  <Column
                    table
                    flex
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#797979"} size={"15px"} bold>
                      CPF/CNPJ
                    </Text>
                  </Column>

                  <Column
                    table
                    flex
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#797979"} size={"15px"} bold>
                      Tipo de Atendimento
                    </Text>
                  </Column>

                  <Column
                    table
                    flex
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#797979"} size={"15px"} bold>
                      Status
                    </Text>
                  </Column>

                  <Column
                    table
                    flex
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#797979"} size={"15px"} bold>
                      Valor Cobrado
                    </Text>
                  </Column>

                  <Column
                    table
                    flex
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#797979"} size={"15px"} bold>
                      Documento Fiscal
                    </Text>
                  </Column>
                </Row>

                {patientFinancialList.map((financial: any) => (
                  <>
                    <Row key={financial.id} gap={"10px"} padding={"10px 0px"}>
                      <Column
                        table
                        flex
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text color={"#797979"} size={"15px"}>
                          {financial.name}
                        </Text>
                      </Column>

                      <Column
                        table
                        flex
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text color={"#797979"} size={"15px"}>
                          {financial.document}
                        </Text>
                      </Column>

                      <Column
                        table
                        flex
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text color={"#797979"} size={"15px"}>
                          {financial.typeOfService}
                        </Text>
                      </Column>

                      <Column
                        table
                        flex
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text color={"#797979"} size={"15px"}>
                          {financial.status}
                        </Text>
                      </Column>

                      <Column
                        table
                        flex
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text color={"#797979"} size={"15px"}>
                          {financial.value}
                        </Text>
                      </Column>

                      <Column
                        table
                        flex
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Row
                          gap={"20px"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          pointer
                        >
                          <Icon width={"25px"} height={"26px"} image={attach} />

                          <Text color={"#0878D3"} size={"15px"}>
                            Visualizar
                          </Text>
                        </Row>
                      </Column>
                    </Row>

                    <Separator />
                  </>
                ))}
              </Scroll>
            </Column>
          </Row>
        );
      } else {
        return (
          <Row padding={width > 416 ? "50px" : "50px 20px"}>
            <Column flex>
              <Row
                gap={width > 1200 ? "100px" : width > 724 ? "50px" : "20px"}
                startMobile={"724px"}
              >
                <Column flex>
                  <Text
                    color={"#797979"}
                    size={"16px"}
                    bold
                    padding={"0px 0px 20px 0px"}
                  >
                    Dados de Acesso
                  </Text>

                  <AccessData width={width > 416 ? "290px" : "100%"}>
                    <AccessDataContent padding={"40px 20px 30px 20px"}>
                      <Cropper
                        onCrop={(image: CroppedImage) => {
                          setBlobImage(image);
                          userDataAccess.setValueForm("image", image.url);
                        }}
                      >
                        <ProfileImage>
                          {userDataAccess.form.image ? (
                            <ImageProfile image={userDataAccess.form.image} />
                          ) : (
                            <IconSvg viewBox="9.437 8.001 16.794 22.21">
                              <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                            </IconSvg>
                          )}

                          <ProfileImageIconUpload
                            right={"-2px"}
                            bottom={"-2px"}
                          />
                        </ProfileImage>
                      </Cropper>

                      <InputContainer padding={"40px 0px 0px 0px"}>
                        <Input
                          label={"E-mail"}
                          type={"text"}
                          value={userDataAccess.form.email}
                          error={userDataAccess.error.email}
                          required
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            userDataAccess.onChange("email", e)
                          }
                        />
                      </InputContainer>

                      <InputContainer padding={"20px 0px 0px 0px"}>
                        <Input
                          label={"Senha"}
                          type={"password"}
                          value={userDataAccess.form.password}
                          error={userDataAccess.error.password}
                          required
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            userDataAccess.onChange("password", e)
                          }
                        />
                      </InputContainer>

                      <InputContainer padding={"20px 0px 0px 0px"}>
                        <Input
                          label={"Nova senha"}
                          type={"password"}
                          value={userDataAccess.form.newPassword}
                          error={userDataAccess.error.newPassword}
                          required
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            userDataAccess.onChange("newPassword", e)
                          }
                        />
                      </InputContainer>

                      <InputContainer padding={"20px 0px 0px 0px"}>
                        <Input
                          label={"Repita sua nova senha"}
                          type={"password"}
                          value={userDataAccess.form.confirmNewPassword}
                          error={userDataAccess.error.confirmNewPassword}
                          required
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            userDataAccess.onChange("confirmNewPassword", e)
                          }
                        />
                      </InputContainer>

                      <Click
                        padding={"30px 0px 0px 0px"}
                        onClick={handleUpdatePassword}
                      >
                        <Text color={"#0878D3"} size={"15px"} bold>
                          Atualizar senha
                        </Text>
                      </Click>

                      {width <= 836 && (
                        <Click padding={"30px 0px 0px 0px"}>
                          <Text color={"#0878D3"} size={"15px"} bold>
                            Encerrar Minha Conta
                          </Text>
                        </Click>
                      )}
                    </AccessDataContent>

                    {width > 836 ? (
                      <Click padding={"20px 0px"}>
                        <Text color={"#0878D3"} size={"15px"} bold>
                          Encerrar Minha Conta
                        </Text>
                      </Click>
                    ) : (
                      <Column padding={"20px 0px"} />
                    )}

                    <AccessDataContent padding={"20px"}>
                      <Click
                        column
                        onClick={(e: any) => {
                          e.preventDefault();
                          selectVideo();
                        }}
                      >
                        <>
                          <ProfileVideo
                            width={"250px"}
                            height={"168px"}
                            image={grupoMscara}
                          />

                          <Click padding={"20px 0px 2px 0px"}>
                            <Text color={"#0878D3"} size={"15px"} bold>
                              Anexar Vídeo Apresentação
                            </Text>
                          </Click>
                        </>
                      </Click>
                    </AccessDataContent>

                    <Text
                      color={"#797979"}
                      size={"16px"}
                      bold
                      padding={"20px 0px"}
                    >
                      Média das Avaliações
                    </Text>

                    <AccessDataContent padding={"20px"}>
                      <Text
                        color={"#797979"}
                        size={"15px"}
                        padding={"0px 0px 10px 0px"}
                      >
                        Como foi sua experiência com a Efetiva Saúde
                      </Text>

                      <Row>
                        <Rating value={ratingEfetiva} readOnly size="large" />
                      </Row>

                      <Text
                        color={"#797979"}
                        size={"15px"}
                        padding={"20px 0px 10px 0px"}
                      >
                        Você recomendaria o profissional que o atendeu?
                      </Text>

                      <Row>
                        <Rating
                          value={ratingProfessional}
                          readOnly
                          size="large"
                        />
                      </Row>

                      <Text
                        color={"#797979"}
                        size={"15px"}
                        padding={"20px 0px 10px 0px"}
                      >
                        Você pretende dar continuidade ao atendimento?
                      </Text>

                      <Row>
                        <Rating
                          value={ratingContinuity}
                          readOnly
                          size="large"
                        />
                      </Row>
                    </AccessDataContent>

                    <Text
                      color={"#797979"}
                      size={"16px"}
                      bold
                      padding={"20px 0px"}
                      ref={officeHourRef}
                    >
                      Expediente
                    </Text>

                    {officeHour.map((office: any, index: number) => (
                      <AccessDataContent
                        key={office.id}
                        margin={"0px 0px 10px 0px"}
                        padding={"20px"}
                      >
                        <Row
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          padding={office.open ? "0px 0px 20px 0px" : "0px"}
                          pointer
                          onClick={() => handleOpenOfficeHour(index)}
                        >
                          <Text color={"#797979"} size={"13px"}>
                            {office.label}
                          </Text>

                          <Icon
                            width={"13px"}
                            height={"6px"}
                            image={arrow}
                            open={office.open}
                          />
                        </Row>

                        {office.open && (
                          <>
                            {office.timeCourse &&
                              office.timeCourse.map((time: any, i: number) => (
                                <InputContainer
                                  key={i}
                                  padding={"0px 0px 20px 0px"}
                                  gap={"10px"}
                                >
                                  <InputSelect
                                    label={"Início"}
                                    width={"120px"}
                                    options={timeCourse}
                                    error={false}
                                    value={time.start}
                                    onChange={(e) =>
                                      handleSelectTime(e, "start", index, i)
                                    }
                                  />

                                  <InputSelect
                                    label={"Término"}
                                    width={"120px"}
                                    options={timeCourse}
                                    error={false}
                                    value={time.end}
                                    onChange={(e) =>
                                      handleSelectTime(e, "end", index, i)
                                    }
                                  />
                                </InputContainer>
                              ))}

                            <Click
                              gap={"10px"}
                              onClick={() => handleAddNewOfficeHour(index)}
                            >
                              <IconMore>
                                <Text color={"#FFF"} size={"30px"}>
                                  +
                                </Text>
                              </IconMore>

                              <Text color={"#0878D3"} size={"15px"} bold>
                                Período
                              </Text>
                            </Click>
                          </>
                        )}
                      </AccessDataContent>
                    ))}

                    {officeHour && officeHour.length > 0 && (
                      <Click
                        padding={"20px 0px"}
                        onClick={handleConfirmOfficeCourse}
                      >
                        <Text color={"#0878D3"} size={"15px"} bold>
                          Salvar Expediente
                        </Text>
                      </Click>
                    )}
                  </AccessData>
                </Column>

                <Column flex>
                  <Text
                    color={"#797979"}
                    size={"16px"}
                    bold
                    padding={"0px 0px 20px 0px"}
                  >
                    Informações Básicas
                  </Text>

                  <AccessData
                    width={
                      width > 724 ? "auto" : width > 416 ? "290px" : "100%"
                    }
                  >
                    <AccessDataContent
                      padding={width > 836 ? "40px 80px" : "30px 20px"}
                    >
                      <Row
                        gap={width > 1130 ? "50px" : "20px"}
                        padding={"10px 0px 0px 0px"}
                        startMobile={"1130px"}
                      >
                        <Column
                          flex
                          alignItems={width > 1130 ? "flex-end" : "center"}
                        >
                          <Column>
                            <InputContainer>
                              <Input
                                label={"Seu nome completo"}
                                type={"text"}
                                value={userData.form.name}
                                error={userData.error.name}
                                required
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => userData.onChange("name", e)}
                              />
                            </InputContainer>

                            <InputContainer padding={"20px 0px 0px 0px"}>
                              <Input
                                label={"Como prefere ser chamado?"}
                                type={"text"}
                                value={userData.form.surname}
                                error={userData.error.surname}
                                required
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => userData.onChange("surname", e)}
                              />
                            </InputContainer>

                            <InputContainer padding={"20px 0px 0px 0px"}>
                              <Input
                                label={"N° Celular"}
                                type={"text"}
                                value={userData.form.cellphone}
                                error={userData.error.cellphone}
                                required
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => userData.onChange("cellphone", e)}
                              />
                            </InputContainer>

                            <InputContainer padding={"20px 0px 0px 0px"}>
                              <Input
                                label={"CPF"}
                                type={"text"}
                                value={userData.form.cpf}
                                error={userData.error.cpf}
                                required
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => userData.onChange("cpf", e)}
                              />
                            </InputContainer>

                            <InputContainer padding={"20px 0px 0px 0px"}>
                              <InputSelect
                                label={"Gênero"}
                                options={genders}
                                value={userData.form.gender}
                                error={false}
                                onChange={(e: any) =>
                                  userData.setValueForm("gender", e)
                                }
                              />
                            </InputContainer>

                            <Text
                              color={"#797979"}
                              size={"15px"}
                              bold
                              padding={"20px 0px 0px 0px"}
                            >
                              Data de Nascimento &nbsp;<Required>*</Required>
                            </Text>

                            <InputContainer
                              padding={"10px 0px 0px 0px"}
                              gap={"10px"}
                            >
                              <InputSelect
                                label={"Dia"}
                                width={"75px"}
                                options={days}
                                value={userData.form.birthdateDay}
                                error={userData.error.birthdateDay}
                                onChange={(e: any) =>
                                  userData.setValueForm("birthdateDay", e)
                                }
                              />
                              <InputSelect
                                label={"Mês"}
                                width={"75px"}
                                options={months}
                                value={userData.form.birthdateMonth}
                                error={userData.error.birthdateMonth}
                                onChange={(e: any) =>
                                  userData.setValueForm("birthdateMonth", e)
                                }
                              />
                              <InputSelect
                                label={"Ano"}
                                width={"80px"}
                                options={allYears}
                                value={userData.form.birthdateYear}
                                error={userData.error.birthdateYear}
                                onChange={(e: any) =>
                                  userData.setValueForm("birthdateYear", e)
                                }
                              />
                            </InputContainer>
                          </Column>
                        </Column>

                        <Column
                          flex
                          alignItems={width > 1130 ? "flex-start" : "center"}
                        >
                          <Column>
                            <InputContainer>
                              <InputSelect
                                label={"Profissão"}
                                options={profession}
                                value={userData.form.profession}
                                error={false}
                                onChange={(e: any) =>
                                  userData.setValueForm("profession", e)
                                }
                              />
                            </InputContainer>

                            {userData.form.profession === 10 && (
                              <>
                                <InputContainer padding={"20px 0px"}>
                                  <Input
                                    label={"Número CRP"}
                                    type={"text"}
                                    value={userData.form.crpNumber}
                                    error={userData.error.crpNumber}
                                    required
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => userData.onChange("crpNumber", e)}
                                  />
                                </InputContainer>

                                <InputContainer>
                                  <ButtonEpsi
                                    verified={userData.form.ePsi}
                                    onClick={() => {}}
                                  >
                                    {userData.form.ePsi && (
                                      <Icon
                                        width={"32px"}
                                        height={"32px"}
                                        image={like}
                                      />
                                    )}

                                    {userData.form.ePsi
                                      ? "e-Psi verificado!"
                                      : "Verificar e-Psi"}
                                  </ButtonEpsi>
                                </InputContainer>
                              </>
                            )}

                            <Text
                              color={"#797979"}
                              size={"15px"}
                              bold
                              padding={"20px 0px"}
                            >
                              Você possui CNPJ?
                            </Text>

                            <Switch
                              checked={userData.form.hasCnpj ? true : false}
                              labelChecked={"Tenho CNPJ"}
                              labelUnchecked={"Não"}
                              onChange={(e: any) => {
                                userData.setValueForm("hasCnpj", e);
                              }}
                            />

                            {userData.form.hasCnpj && (
                              <>
                                <InputContainer padding={"20px 0px 0px 0px"}>
                                  <Input
                                    label={"Seu CNPJ"}
                                    type={"text"}
                                    value={userData.form.cnpj}
                                    error={userData.error.cnpj}
                                    required
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => userData.onChange("cnpj", e)}
                                  />
                                </InputContainer>

                                <Text
                                  color={"#797979"}
                                  size={"15px"}
                                  bold
                                  padding={"20px 0px"}
                                >
                                  Pretende trabalhar utilizando o CNPJ?
                                </Text>

                                <Switch
                                  checked={userData.form.useCnpj ? true : false}
                                  labelChecked={"Sim"}
                                  labelUnchecked={"Não"}
                                  onChange={(e: any) => {
                                    userData.setValueForm("useCnpj", e);
                                  }}
                                />
                              </>
                            )}
                          </Column>
                        </Column>
                      </Row>

                      <Click
                        padding={"40px 0px 0px 0px"}
                        onClick={handleUpdateData}
                      >
                        <Text color={"#0878D3"} size={"15px"} bold>
                          Atualizar Informações pessoais
                        </Text>
                      </Click>
                    </AccessDataContent>

                    <Text
                      color={"#797979"}
                      size={"16px"}
                      bold
                      padding={"20px 0px"}
                    >
                      Carta de Apresentação e Currículo
                    </Text>

                    <AccessDataContent
                      padding={width > 836 ? "30px" : "30px 20px"}
                    >
                      <Text
                        color={"#797979"}
                        size={"15px"}
                        padding={"0px 0px 20px 0px"}
                      >
                        Crie sua carta de apresentação, ela estará disponível
                        para visitantes do site. Foque em um resumo sobre sua
                        experiência profissional e especialidades.
                      </Text>

                      <TextArea
                        placeholder={presentationLetter}
                        minHeight={width > 830 ? "128px" : "340px"}
                        maxHeight={width > 830 ? "128px" : "340px"}
                        padding={"10px"}
                        value={userData.form.presentationLetter}
                        error={false}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          userData.onChange("presentationLetter", e)
                        }
                      />

                      <Click
                        padding={"30px 0px 0px 0px"}
                        onClick={handleUpdateData}
                      >
                        <Text color={"#0878D3"} size={"15px"} bold>
                          Atualizar Carta de Apresentação
                        </Text>
                      </Click>
                    </AccessDataContent>

                    <Text
                      color={"#797979"}
                      size={"16px"}
                      bold
                      padding={"20px 0px"}
                    >
                      Experiências Profissionais
                    </Text>

                    <AccessDataContent
                      padding={width > 836 ? "30px" : "30px 20px"}
                    >
                      {experiences && experiences.length > 0 && (
                        <ExperienceContainer>
                          {experiences.map((experience: any, index: number) => (
                            <Dependent width={"295px"} key={index}>
                              <DependentTitle>
                                <Text color={"#0878d3"} size={"15px"} bold>
                                  {experience.activity}
                                </Text>

                                <DependentIcon
                                  onClick={(e) =>
                                    handlePopoverOpen(e, index, "experience")
                                  }
                                />

                                {popoverType === "experience" &&
                                  index === activeIndex && (
                                    <Popover
                                      anchorEl={anchorEl}
                                      open={openPopover}
                                      close={handlePopoverClose}
                                      content={
                                        <>
                                          <OptionPopover
                                            onClick={() =>
                                              handleSelectExperience("edit")
                                            }
                                          >
                                            Editar Experiência
                                          </OptionPopover>

                                          <OptionPopover
                                            onClick={() =>
                                              handleSelectExperience("delete")
                                            }
                                          >
                                            Excluir
                                          </OptionPopover>
                                        </>
                                      }
                                    />
                                  )}
                              </DependentTitle>

                              <Text color={"#797979"} size={"13px"}>
                                {experience.location}
                              </Text>
                            </Dependent>
                          ))}
                        </ExperienceContainer>
                      )}

                      <Click
                        gap={"10px"}
                        onClick={() => {
                          activeIndex = null;
                          setExperience({});
                          setOpenModalExperience(true);
                        }}
                      >
                        <IconMore>
                          <Text color={"#FFF"} size={"30px"}>
                            +
                          </Text>
                        </IconMore>

                        <Text color={"#0878D3"} size={"15px"} bold>
                          Adicionar Experiência
                        </Text>
                      </Click>
                    </AccessDataContent>

                    <Text
                      color={"#797979"}
                      size={"16px"}
                      bold
                      padding={"20px 0px"}
                    >
                      Formação Acadêmica
                    </Text>

                    <AccessDataContent
                      padding={width > 836 ? "30px" : "30px 20px"}
                    >
                      {academicTraining && academicTraining.length > 0 && (
                        <ExperienceContainer>
                          {academicTraining.map(
                            (formation: any, index: number) => (
                              <Dependent width={"295px"} key={index}>
                                <DependentTitle>
                                  <Text color={"#0878d3"} size={"15px"} bold>
                                    {formation.level}
                                  </Text>

                                  <DependentIcon
                                    onClick={(e) =>
                                      handlePopoverOpen(e, index, "formation")
                                    }
                                  />

                                  {popoverType === "formation" &&
                                    index === activeIndex && (
                                      <Popover
                                        anchorEl={anchorEl}
                                        open={openPopover}
                                        close={handlePopoverClose}
                                        content={
                                          <>
                                            <OptionPopover
                                              onClick={() =>
                                                handleSelectFormation("edit")
                                              }
                                            >
                                              Editar formação
                                            </OptionPopover>

                                            <OptionPopover
                                              onClick={() =>
                                                handleSelectFormation("delete")
                                              }
                                            >
                                              Excluir
                                            </OptionPopover>
                                          </>
                                        }
                                      />
                                    )}
                                </DependentTitle>

                                <Text color={"#797979"} size={"13px"}>
                                  {formation.institution} - {formation.course}
                                </Text>
                              </Dependent>
                            )
                          )}
                        </ExperienceContainer>
                      )}

                      <Click
                        gap={"10px"}
                        onClick={() => {
                          activeIndex = null;
                          setAcademicFormation({});
                          setOpenModalAcademicTraining(true);
                        }}
                      >
                        <IconMore>
                          <Text color={"#FFF"} size={"30px"}>
                            +
                          </Text>
                        </IconMore>

                        <Text color={"#0878D3"} size={"15px"} bold>
                          Adicionar Formação
                        </Text>
                      </Click>
                    </AccessDataContent>
                  </AccessData>
                </Column>
              </Row>

              <Column alignItems={"center"} padding={"50px 0px 0px 0px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Quais as queixas/demandas você quer atender pela Efetiva
                  Saúde?
                </Text>
                <Text color={"#797979"} size={"15px"}>
                  Elas servirão para filtrar os profissionais aptos a atender
                  cada paciente
                </Text>
              </Column>

              <Row
                wrap
                padding={"50px 0px 0px 0px"}
                gap={"10px"}
                alignItems={"flex-start"}
                startMobile={"468px"}
              >
                <Column flex gap={"20px"}>
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

                <Column flex gap={"20px"}>
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

                <Column flex gap={"20px"}>
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

                <Column flex gap={"20px"}>
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

              <Row
                padding={"50px 0px 0px 0px"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Click onClick={handleSaveDemands}>
                  <Text color={"#0878D3"} size={"15px"} bold>
                    Salvar Queixas/Demandas
                  </Text>
                </Click>
              </Row>
            </Column>
          </Row>
        );
      }
    } else if (tab === 3) {
      return (
        <Row padding={width > 416 ? "50px" : "50px 20px"}>
          <Column flex>
            <Row gap={"20px"} wrap startMobile={"468px"}>
              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Abordagem adotada
                </Text>

                <ScrollColumn gap={"10px"} padding={"10px 0px"}>
                  {approachTaken.map((approach: any, index: number) => (
                    <Switch
                      key={approach.Id}
                      checked={approach.checked ? true : false}
                      labelChecked={approach.Nome}
                      labelUnchecked={approach.Nome}
                      onChange={(e: any) => handleSelectApproachTaken(e, index)}
                    />
                  ))}
                </ScrollColumn>

                <TextArea
                  maxWidth={"352px"}
                  maxHeight={"62px"}
                  minHeight={"62px"}
                  padding={"10px"}
                  placeholder={"Alguma outra abordagem?"}
                  value={serviceProfile.form.anotherApproach}
                  onChange={(e: any) =>
                    serviceProfile.onChange("anotherApproach", e)
                  }
                />
              </Column>

              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Públicos atendidos
                </Text>

                <ScrollColumn gap={"10px"} padding={"10px 0px"}>
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
                </ScrollColumn>

                <TextArea
                  maxWidth={"352px"}
                  maxHeight={"62px"}
                  minHeight={"62px"}
                  padding={"10px"}
                  placeholder={"Algum outro público?"}
                  value={serviceProfile.form.otherAudience}
                  onChange={(e: any) =>
                    serviceProfile.onChange("otherAudience", e)
                  }
                />
              </Column>

              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Pretende atender em outro idioma?
                </Text>

                <ScrollColumn gap={"10px"} padding={"10px 0px"}>
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
                </ScrollColumn>

                <TextArea
                  maxWidth={"352px"}
                  maxHeight={"62px"}
                  minHeight={"62px"}
                  padding={"10px"}
                  placeholder={"Algum outro idioma?"}
                  value={serviceProfile.form.anotherLanguage}
                  onChange={(e: any) =>
                    serviceProfile.onChange("anotherLanguage", e)
                  }
                />
              </Column>
            </Row>

            <Row
              gap={"20px"}
              padding={"50px 0px 0px 0px"}
              wrap
              startMobile={"468px"}
            >
              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Quantas horas você pretende se dedicar ao atendimento através
                  da Efetiva Saúde?
                </Text>

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

              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Você atende aos finais de semana?
                </Text>

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

              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  O documento fiscal que você emite ao cliente permite reembolso
                  por plano de saúde?
                </Text>

                <Column gap={"10px"}>
                  <Switch
                    checked={serviceProfile.form.reimbursementByHealthPlan}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      serviceProfile.setValueForm(
                        "reimbursementByHealthPlan",
                        e
                      )
                    }
                  />
                </Column>
              </Column>
            </Row>

            <Row
              gap={"20px"}
              padding={"50px 0px 0px 0px"}
              wrap
              startMobile={"468px"}
            >
              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Pretende atender pelo Plano de Saúde?
                </Text>

                <Column gap={"10px"}>
                  <Switch
                    checked={serviceProfile.form.attendHealthPlan}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      serviceProfile.setValueForm("attendHealthPlan", e)
                    }
                  />
                </Column>
              </Column>

              <Column flex gap={"20px"} alignItems={"flex-start"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Qual será a duração de cada atendimento?
                </Text>

                <InputContainer>
                  <InputSelect
                    label={"Duração estimada"}
                    options={durationOfCare}
                    value={serviceProfile.form.serviceDuration}
                    error={serviceProfile.error.serviceDuration}
                    required
                    onChange={(e: any) =>
                      serviceProfile.setValueForm("serviceDuration", e)
                    }
                  />
                </InputContainer>
              </Column>

              <Column flex gap={"20px"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Sua agenda também estará disponível para atendimentos
                  presenciais?
                </Text>

                <Column gap={"10px"}>
                  <Switch
                    checked={serviceProfile.form.personalAssistance}
                    labelChecked={"Sim"}
                    labelUnchecked={"Não"}
                    onChange={(e: any) =>
                      serviceProfile.setValueForm("personalAssistance", e)
                    }
                  />
                </Column>
              </Column>
            </Row>

            <Row
              padding={"50px 0px 0px 0px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Click onClick={handleUpdateData}>
                <Text color={"#0878D3"} size={"15px"} bold>
                  Salvar Alterações
                </Text>
              </Click>
            </Row>
          </Column>
        </Row>
      );
    } else if (tab === 4) {
      return (
        <Row padding={width > 416 ? "50px" : "50px 20px"}>
          <Column flex table>
            <Row gap={"20px"} wrap alignItems={"flex-start"}>
              <Column flex alignItems={"flex-start"}>
                <Text color={"#797979"} size={"15px"} bold>
                  Quanto será cobrado por sessão?
                </Text>
                <Text
                  color={"#797979"}
                  size={"15px"}
                  padding={"10px 0px 20px 0px"}
                >
                  Cobrar valor compatível com sua experiência profissional. Taxa
                  de Intermediação mínima: R$ 15,00 por atendimento.
                </Text>

                <InputContainer>
                  <Input
                    label={"R$"}
                    type={"text"}
                    value={financialData.form.sessionPrice}
                    error={financialData.error.sessionPrice}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      financialData.onChange("sessionPrice", e)
                    }
                  />
                </InputContainer>

                <Text color={"#797979"} size={"15px"} bold padding={"20px 0px"}>
                  Você concorda em fazer o primeiro atendimento de um novo
                  cliente sem cobrança ou pelo valor fixo de R$ 50,00?
                </Text>

                <Switch
                  checked={financialData.form.freeFirstService ? true : false}
                  labelChecked={"Sim"}
                  labelUnchecked={"Não"}
                  onChange={(e: any) =>
                    financialData.setValueForm("freeFirstService", e)
                  }
                />

                <Text color={"#797979"} size={"15px"} bold padding={"20px 0px"}>
                  Você concorda em atender empresas parceiras oferecendo 25% de
                  desconto no valor de sua consulta?
                </Text>

                <Switch
                  checked={financialData.form.partnerCompanies ? true : false}
                  labelChecked={"Sim"}
                  labelUnchecked={"Não"}
                  onChange={(e: any) =>
                    financialData.setValueForm("partnerCompanies", e)
                  }
                />
              </Column>

              <Column flex alignItems={"center"}>
                <Column alignItems={"flex-start"}>
                  <Text color={"#797979"} size={"15px"} bold>
                    Conta Bancária
                  </Text>
                  <Text
                    color={"#797979"}
                    size={"15px"}
                    padding={"10px 0px 20px 0px"}
                  >
                    Dados de uma conta bancária em nome do profissional para
                    transferir valores relacionados as sessões realizadas.
                  </Text>

                  <InputContainer>
                    <InputSelect
                      label={"Banco"}
                      options={banks}
                      value={financialData.form.bank}
                      error={financialData.error.bank}
                      required
                      onChange={(e: any) =>
                        financialData.setValueForm("bank", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px"}>
                    <Input
                      label={"Agência"}
                      type={"text"}
                      value={financialData.form.agency}
                      error={financialData.error.agency}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        financialData.onChange("agency", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"Conta para crédito"}
                      type={"text"}
                      value={financialData.form.account}
                      error={financialData.error.account}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        financialData.onChange("account", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <Input
                      label={"Digito Verificador"}
                      type={"text"}
                      value={financialData.form.digit}
                      error={financialData.error.digit}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        financialData.onChange("digit", e)
                      }
                    />
                  </InputContainer>
                </Column>
              </Column>

              <Column flex alignItems={"flex-start"}>
                <Row
                  gap={"20px"}
                  alignItems={"center"}
                  padding={"0px 0px 20px 0px"}
                >
                  <Click>
                    <Text color={"#23B49E"} size={"15px"} bold>
                      A Receber
                    </Text>
                  </Click>

                  <Text color={"#797979"} size={"15px"} bold>
                    |
                  </Text>

                  <Click>
                    <Text color={"#FD060E"} size={"15px"} bold>
                      A Pagar
                    </Text>
                  </Click>
                </Row>

                <AccessDataContent padding={"15px"}>
                  <Text color={"#23B49E"} size={"29px"} bold>
                    R$ 813,76
                  </Text>
                </AccessDataContent>

                <Text color={"#797979"} size={"15px"} bold padding={"20px 0px"}>
                  Taxa de Intermediação
                </Text>

                <AccessDataContent padding={"20px"}>
                  <Text color={"#23B49E"} size={"18px"} bold>
                    15% (Mínimo R$ 15,00)
                  </Text>
                </AccessDataContent>

                <Text color={"#797979"} size={"15px"} bold padding={"20px 0px"}>
                  Número do Cartão de Crédito
                </Text>

                <Text color={"#797979"} size={"15px"}>
                  Fornecer somente se for atender por plano ou operadora de
                  saúde; ou se não for atender através da Efetiva Saúde.
                </Text>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"Número do cartão"}
                    type={"text"}
                    value={financialData.form.creditCardNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      financialData.onChange("creditCardNumber", e)
                    }
                  />
                </InputContainer>
              </Column>
            </Row>

            <Row padding={"50px 0px"}>
              <Column flex>
                <Text color={"#002464"} size={"20px"} bold>
                  Planos de Adesão
                </Text>

                <Row padding={"50px 0px 0px 0px"} gap={"20px"} wrap>
                  {plans.map((plan: any) => (
                    <Plan key={plan.id} disabled={plan.disabled}>
                      <Icon
                        width={"70px"}
                        height={"48px"}
                        image={plan.disabled ? contactDisabled : contact}
                      />

                      <Text center color={"#002464"} size={"20px"} bold>
                        {plan.title}
                      </Text>

                      <Text center color={"#797979"} size={"15px"} bold>
                        {plan.message}
                      </Text>

                      <ButtonPlan>{plan.buttonText}</ButtonPlan>

                      {plan.disabled && <PlanDisabled />}
                    </Plan>
                  ))}
                </Row>
              </Column>
            </Row>

            <Row>
              <Column table flex>
                <Row alignItems={"center"} justifyContent={"space-between"}>
                  <Text color={"#002464"} size={"20px"} bold>
                    Histórico Financeiro
                  </Text>

                  <Click
                    gap={"10px"}
                    onClick={(e: any) => handleOpenFilterCalendar(e)}
                  >
                    <Icon width={"23px"} height={"27px"} image={schedule} />

                    <Column>
                      <Text
                        color={"#0878D3"}
                        size={"15px"}
                        bold
                        padding={"20px 0px 0px 0px"}
                      >
                        Período
                      </Text>

                      <Text
                        color={"#0878D3"}
                        size={"15px"}
                        bold
                        padding={"0px 0px 20px 0px"}
                      >
                        {dateFilter && Object.keys(dateFilter).length > 0 ? (
                          <>
                            {dateFilter.startDate} a {dateFilter.endDate}
                          </>
                        ) : (
                          "Selecione uma data"
                        )}
                      </Text>
                    </Column>
                  </Click>

                  {openFilterCalendar && (
                    <Popover
                      anchorEl={anchorEl}
                      open={openPopover}
                      close={handlePopoverClose}
                      noBackgroundColor={true}
                      content={
                        <CalendarRangeComponent
                          handleButton={(e: any) =>
                            handleCloseFilterCalendar(e, "professional")
                          }
                        />
                      }
                    />
                  )}
                </Row>

                <Scroll column>
                  <Row gap={"10px"} padding={"10px 0px"}>
                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"170px"}
                      maxWidth={"170px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Paciente
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"110px"}
                      maxWidth={"110px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        CPF
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"155px"}
                      maxWidth={"155px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Tipo de Atendimento
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"100px"}
                      maxWidth={"100px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Status
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"100px"}
                      maxWidth={"100px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Valor
                      </Text>
                      <Text color={"#797979"} size={"15px"} bold>
                        Cobrado
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"105px"}
                      maxWidth={"105px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Taxa de
                      </Text>
                      <Text color={"#797979"} size={"15px"} bold>
                        Intermediação
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"100px"}
                      maxWidth={"100px"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Valor
                      </Text>
                      <Text color={"#797979"} size={"15px"} bold>
                        Líquido
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text color={"#797979"} size={"15px"} bold>
                        Documento Fiscal
                      </Text>
                    </Column>
                  </Row>

                  {financialList.map((financial: any) => (
                    <>
                      <Row key={financial.id} gap={"10px"} padding={"10px 0px"}>
                        <Column
                          table
                          flex
                          alignItems={"flex-start"}
                          justifyContent={"center"}
                          minWidth={"170px"}
                          maxWidth={"170px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.patient}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          minWidth={"110px"}
                          maxWidth={"110px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.document}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          minWidth={"155px"}
                          maxWidth={"155px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.typeOfService}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          minWidth={"100px"}
                          maxWidth={"100px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.status}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          minWidth={"100px"}
                          maxWidth={"100px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.value}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          minWidth={"105px"}
                          maxWidth={"105px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.intermediationFee}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          minWidth={"100px"}
                          maxWidth={"100px"}
                        >
                          <Text color={"#797979"} size={"15px"}>
                            {financial.netValue}
                          </Text>
                        </Column>

                        <Column
                          table
                          flex
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Row gap={"10px"} justifyContent={"center"}>
                            <Click>
                              <Text color={"#0878D3"} size={"14px"}>
                                Anexar
                              </Text>
                            </Click>

                            <Text color={"#797979"} size={"14px"}>
                              |
                            </Text>

                            <Click>
                              <Text color={"#0878D3"} size={"14px"}>
                                Fotografar
                              </Text>
                            </Click>
                          </Row>
                        </Column>
                      </Row>

                      <Separator />
                    </>
                  ))}
                </Scroll>
              </Column>
            </Row>
          </Column>
        </Row>
      );
    }
  }, [
    tab,
    anchorEl,
    width,
    patients,
    officeHour,
    experiences,
    academicTraining,
    symptomsColumn1,
    symptomsColumn2,
    symptomsColumn3,
    symptomsColumn4,
    approachTaken,
    publicServiced,
    languagesServiced,
    serviceHours,
    serviceWeekend,
    financialList,
    plans,
    patientProfile,
    patientFinancialList,
    profession,
    userDataAccess,
    userData,
    serviceProfile,
    financialData,
    openFilterCalendar,
    dateFilter,
    dateFilterClient,
    popoverType,
    openPopover,
    allYears,
    timeCourse,
    nextAppointment,
    scheduledAppointments,
    history,
    patientData,
    patientNextAppointment,
    patientScheduledAppointments,
    patientHistory,
    ratingEfetiva,
    ratingProfessional,
    ratingContinuity,
    selectVideo,
    handleAddNewOfficeHour,
    handleCloseFilterCalendar,
    handleConfirmOfficeCourse,
    handleOpenOfficeHour,
    handleProfile,
    handleSelectApproachTaken,
    handleSelectExperience,
    handleSelectFormation,
    handleSelectLanguagesServiced,
    handleSelectPublicServiced,
    handleSelectServiceHours,
    handleSelectServiceWeekend,
    handleSelectSymptoms,
    handleSelectTime,
    handleUpdateData,
  ]);

  return (
    <Container>
      <Row
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={width > 416 ? "50px 50px 0px 50px" : "50px 20px"}
        startMobile={"628px"}
        gap={width > 628 ? "0px" : "40px"}
      >
        <Text color={"#002464"} size={"20px"} bold>
          {patientProfile ? "Perfil do Paciente" : "Minha Conta"}
        </Text>

        <ButtonScheduling
          padding={"0px 20px"}
          onClick={() => setOpenCalendar(true)}
        >
          <Text color={"#FC0606"} size={"15px"} bold>
            Disponibilizar Horários de Atendimento
          </Text>

          <Icon width={"27px"} height={"29px"} image={calendar} />
        </ButtonScheduling>
      </Row>

      {patientProfile && (
        <Row
          padding={width > 416 ? "50px 50px 0px 50px" : "0px 20px 50px 20px"}
          alignItems={"center"}
          gap={"40px"}
        >
          <Click onClick={handleCloseProfile}>
            <Icon width={"23px"} height={"16px"} image={arrowLeft} />
          </Click>

          <Row alignItems={"center"} gap={"10px"}>
            <ProfileImage width={"51px"} height={"51px"}>
              {patientData && patientData.image ? (
                <ImageProfile
                  width={"51px"}
                  height={"51px"}
                  image={patientData.image}
                />
              ) : (
                <IconSvg
                  width={"40px"}
                  height={"40px"}
                  viewBox="9.437 8.001 16.794 22.21"
                >
                  <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                </IconSvg>
              )}
            </ProfileImage>

            <Column>
              <Text color={"#797979"} size={"15px"} bold>
                {patientData && patientData.name}
              </Text>

              <Text color={"#797979"} size={"13px"}>
                Paciente desde{" "}
                {patientData && patientData.patientDate
                  ? patientData.patientDate
                  : null}
              </Text>
            </Column>
          </Row>
        </Row>
      )}

      <Row padding={width > 416 ? "50px 50px 0px 50px" : "0px 20px 0px 20px"}>
        <Scroll gap={"20px"}>
          {patientProfile ? (
            <>
              <Button
                fixedWidth
                text={"Consultas"}
                handleButton={() => handleTab(0)}
                color={tab === 0 ? "#002464" : ""}
              />

              <Button
                fixedWidth
                text={"Prontuário"}
                handleButton={() => handleTab(1)}
                color={tab === 1 ? "#002464" : ""}
              />

              <Button
                fixedWidth
                text={"Financeiro"}
                handleButton={() => handleTab(2)}
                color={tab === 2 ? "#002464" : ""}
              />
            </>
          ) : (
            <>
              <Button
                fixedWidth
                text={"Minhas Consultas"}
                handleButton={() => handleTab(0)}
                color={tab === 0 ? "#002464" : ""}
              />

              <Button
                fixedWidth
                text={"Meus Pacientes"}
                handleButton={() => handleTab(1)}
                color={tab === 1 ? "#002464" : ""}
              />

              <Button
                fixedWidth
                text={"Meu Perfil"}
                handleButton={() => handleTab(2)}
                color={tab === 2 ? "#002464" : ""}
              />

              <Button
                fixedWidth
                text={"Perfil de Atendimento"}
                handleButton={() => handleTab(3)}
                color={tab === 3 ? "#002464" : ""}
              />

              <Button
                fixedWidth
                text={"Financeiro"}
                handleButton={() => handleTab(4)}
                color={tab === 4 ? "#002464" : ""}
              />
            </>
          )}
        </Scroll>
      </Row>

      {renderTabs}

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

      {openModalNewPatient && (
        <ModalRegisterClientClinic
          professionalId={1}
          open={openModalNewPatient}
          close={(data) => handleCloseModalNewPatient(data)}
        />
      )}

      {openCalendar && (
        <ModalCalendar
          data={selectedDates}
          open={openCalendar}
          close={(e: any) => handleCloseCalendar(e)}
        />
      )}

      {/* <AlertEpsi
        open={alertEpsi}
        error={!formPsychologistStage4.form.ePsi}
        close={() => setAlertEpsi(false)}
      /> */}

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default ProfessionalAccount;
