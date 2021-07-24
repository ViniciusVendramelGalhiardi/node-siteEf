import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";

import {
  Container,
  Row,
  Column,
  Scroll,
  Text,
  ButtonScheduling,
  IconMore,
  DependentsContainer,
  Dependent,
  DependentIcon,
  DependentTitle,
  OptionPopover,
  NewDependentContainer,
  DependentAdd,
  Click,
  AccessData,
  AccessDataContent,
  ProfileImage,
  ImageProfile,
  ProfileImageIconUpload,
  IconSvg,
  IconPath,
  InputContainer,
  Required,
  Icon,
} from "../styles";

import schedule from "assets/icons/png/schedule.png";

import useWindowSize from "hooks/useWindowSize";
import Button from "components/button";
import SchedulingCard from "components/schedulingCard";
import Popover from "components/popover";
import ModalDependent from "components/modais/modalDependent";
import ModalScheduleAppointment from "components/modais/modalScheduleAppointment";
import { useSnackbar } from "hooks/useSnackbar";
import { Separator } from "styles";
import Cropper, { CroppedImage } from "components/cropper";
import Input from "components/input";
import InputSelect from "components/inputSelect";
import {
  days,
  months,
  years,
  quantitySons,
  genders,
  civilStatus,
  calculateAge,
  convertBlobToBase64,
  numberToMoney,
  weeks,
} from "helpers/utils";
import { api } from "services/api";
import useForm from "hooks/useForm";
import { setFormat } from "helpers/formatting";
import Loading from "components/loading";
import CalendarRangeComponent from "components/calendarRangeComponent";
import { useAuth } from "hooks/useAuth";
import { removeMask } from "helpers/removeMasks";
import moment from "moment";
import { schedulingStatus } from "config/contants";

interface Props {}

let activeIndex: any = null;

const ClientAccount: FunctionComponent<Props> = ({}) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const [tab, setTab] = useState(0);
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [allYears, setAllYears] = useState<any>([]);
  const [hobbies, setHobbies] = useState<any>([]);
  const [profession, setProfession] = useState<any>([]);
  const [workSchedule, setWorkSchedule] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const [blobImage, setBlobImage] = useState<any>({});

  const clientDataAccess = useForm({
    image: { type: "", required: false },
    email: { type: "email", required: true },
    password: { type: "password", required: true },
    newPassword: { type: "password", required: true },
    confirmNewPassword: { type: "password", required: true },
  });

  const clientData = useForm({
    name: { type: "", required: true },
    cellphone: { type: "phone", required: true },
    cpf: { type: "cpf", required: true },
    surname: { type: "name", required: false },
    gender: { type: "", required: false },
    profession: { type: "", required: false },
    civilStatus: { type: "", required: false },
    birthdateDay: { type: "", required: true },
    birthdateMonth: { type: "", required: true },
    birthdateYear: { type: "", required: true },
    sons: { type: "", required: true },
    workSchedule: { type: "", required: true },
    hobbies: { type: "", required: false },
    idMet: { type: "", required: false },
    city: { type: "", required: false },
    state: { type: "", required: false },
  });

  const [nextAppointment, setNextAppointment] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [financialList, setFinancialList] = useState<any>([]);

  const [modalConsultation, setModalConsultation] = useState(false);
  const [openModalDependent, setOpenModalDependent] = useState(false);
  const [editDependent, setEditDependent] = useState({});
  const [dependents, setDependents] = useState<any>([]);

  const [popoverType, setPopoverType] = useState<string>("");
  const [openFilterCalendar, setOpenFilterCalendar] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<any>({});

  const formatParams = useCallback(
    async (newDependent: boolean = false) => {
      let base64: any = "";

      if (blobImage && Object.keys(blobImage).length > 0) {
        base64 = await convertBlobToBase64(blobImage.blob);
      }

      return {
        IdUsuario: user.id,
        BaseImage: base64,
        Nome: clientData.form.name,
        Telefone: removeMask(clientData.form.cellphone, "phone"),
        Email: clientDataAccess.form.email,
        Cidade: clientData.form.city,
        Estado: clientData.form.state,
        Cep: "",
        Senha: "",
        IdConheceu: clientData.form.idMet
          ? parseInt(clientData.form.idMet)
          : null,
        TermosCondicoes: true,
        PoliticaPrivacidade: true,
        Apelido: clientData.form.surname,
        EstadoCivil: clientData.form.civilStatus,
        PossuiFilhosQtd: clientData.form.sons
          ? parseInt(clientData.form.sons)
          : 0,
        IdHobbie: clientData.form.hobbies,
        DataNascimento: `${clientData.form.birthdateDay}/${clientData.form.birthdateMonth}/${clientData.form.birthdateYear}`,
        Genero: clientData.form.gender,
        IdProfissao: clientData.form.profession,
        Cpf: removeMask(clientData.form.cpf, "cpf"),
        Dependente: newDependent ? true : dependents.length > 0 ? true : false,
      };
    },
    [user, clientDataAccess, clientData, blobImage, dependents]
  );

  const handleUpdateData = useCallback(
    async (newDependent: boolean = false) => {
      try {
        setLoading(true);

        const params = await formatParams(newDependent);

        const { data } = await api.post(`web/editarUsuario/1`, params);

        setLoading(false);

        if (data) {
          // Sucesso
        }
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    },
    [formatParams]
  );

  const handleUpdatePassword = useCallback(async () => {
    try {
      const validated = clientDataAccess.validateForm();

      if (!validated) {
        return;
      }

      if (
        clientDataAccess.form.newPassword !==
        clientDataAccess.form.confirmNewPassword
      ) {
        clientDataAccess.setError({
          ...clientDataAccess.error,
          confirmNewPassword: "Confirme a senha corretamente!",
        });

        return;
      }

      setLoading(true);

      const { data } = await api.put(
        `web/AtualizaSenhaUsuario/${clientDataAccess.form.email}?senhaatual=${clientDataAccess.form.password}&novasenha=${clientDataAccess.form.newPassword}&IdUsuario=${user.id}`
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [clientDataAccess, user]);

  const handleCancelAppointment = useCallback(
    async (appointment: any, index: number, type: string) => {
      try {
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
      } catch (error) {
        console.log("error", error);
      }
    },
    [nextAppointment, scheduledAppointments, history]
  );

  const handleOpenFilterCalendar = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setPopoverType("calendar");
    setOpenFilterCalendar(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterCalendar = (data: any) => {
    setPopoverType("");
    handlePopoverClose();
    setOpenFilterCalendar(false);
    setDateFilter(data);
  };

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

  const handleCloseModalDependent = useCallback(
    (data: any) => {
      if (data.name) {
        const newDependents = [...dependents];

        if (activeIndex !== null) {
          newDependents[activeIndex] = data;
        } else {
          newDependents.push(data);
        }

        setDependents(newDependents);

        handleUpdateData(true);
      }

      setOpenModalDependent(false);
    },
    [dependents, handleUpdateData]
  );

  const deleteDependent = async (id: number) => {
    try {
      setLoading(true);

      await api.delete(`web/excluirDependente/${id}`);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleSelectDependent = useCallback(
    (type: string) => {
      handlePopoverClose();

      const newDependents = [...dependents];

      switch (type) {
        case "edit":
          setEditDependent(newDependents[activeIndex]);
          setOpenModalDependent(true);

          break;

        case "delete":
          console.log("newDependents[activeIndex]", newDependents[activeIndex]);

          showSnackbar({
            image: newDependents[activeIndex].image,
            name: newDependents[activeIndex].name,
            message: "Deseja realmente excluir este dependente da sua lista?",
            cancelText: "Não quero excluir",
            submitText: "Sim, excluir dependente",
            onSubmit: () => {
              deleteDependent(newDependents[activeIndex].id);

              newDependents.splice(activeIndex, 1);
              setDependents(newDependents);
            },
          });

          break;
      }
    },
    [dependents, showSnackbar]
  );

  const handleTab = (newTab: number) => {
    setTab(newTab);
  };

  const getWorkSchedule = async () => {
    try {
      const { data } = await api.get("web/ListaHorarioTrabalho");
      setWorkSchedule(data);
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

  const getHobbies = async () => {
    try {
      const { data } = await api.get("web/ListaHobbies");
      setHobbies(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function formatFinancial(element: any, professions: any) {
    const profession = professions.filter(
      (p: any) => p.Id === element.Profissional.IdProfissao
    )[0];

    return {
      id: element.IdAgendamento,
      professional: element.Profissional.Nome,
      document: element.Profissional.Cnpj ?? element.Profissional.Cpf,
      typeOfService: profession.Nome,
      status: element.StatusPagamento,
      value: `R$ ${numberToMoney(element.Profissional.ValorPorSessaoProf)}`,
    };
  }

  async function formatSchedule(element: any, professions: any) {
    const profession = professions.filter(
      (p: any) => p.Id === element.Profissional.IdProfissao
    )[0];

    const week: any = await moment(element.Data, "DD/MM/YYYY").format("dddd");

    return {
      id: element.IdAgendamento,
      activity: profession.Nome,
      name: element.Profissional.Nome,
      crp: `CRP ${element.Profissional.RegistroCRPePsi}`,
      image: element.Profissional.BaseImage,
      date: `${element.Data} (${weeks[week]})`,
      time: `Às ${element.Hora}`,
      estimatedDuration: element.Profissional.DuracaoAtendimentoProf,
      price: `R$ ${numberToMoney(element.Profissional.ValorPorSessaoProf)}`,
      sessionId: element.IdSessao,
      professionalId: element.Profissional.idUsuario,
    };
  }

  const getSchedules = useCallback(
    async (professions: any) => {
      try {
        const { data } = await api.get(
          `web/ListarAgendamentosProfissional/${user.id}`
        );

        if (data && data.length > 0) {
          const currentDate = moment().toDate();

          const newNextAppointment: any = [];
          const newScheduledAppointments: any = [];
          const newHistory: any = [];
          const newFinancialList: any = [];

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

            const newFinancial = await formatFinancial(element, professions);
            newFinancialList.push(newFinancial);
          }

          setNextAppointment(newNextAppointment);
          setScheduledAppointments(newScheduledAppointments);
          setHistory(newHistory);
          setFinancialList(newFinancialList);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [user]
  );

  async function getDependents(data: any) {
    if (data && data.length > 0) {
      const newDependents: any = [];

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const splited: any = element.DataNascimento.split("-");

        const newElement = {
          id: element.IdDependente,
          name: element.Nome,
          surname: element.Apelido,
          birthdateDay: splited[0],
          birthdateMonth: splited[1],
          birthdateYear: parseInt(splited[2]),
          gender: element.Genero,
          cellphone: element.Telefone,
          email: element.Email,
          cpf: await setFormat(element.Cpf, "cpf"),
          image: element.Imagem,
          age: await calculateAge(
            parseInt(splited[0]),
            parseInt(splited[1]),
            parseInt(splited[2])
          ),
        };

        newDependents.push(newElement);
      }

      setDependents(newDependents);
    }
  }

  const formatUserData = useCallback(
    (data: any) => {
      clientDataAccess.setValueForm("image", data.BaseImage);
      clientDataAccess.setValueForm("email", data.Email);

      clientData.setValueForm("name", data.Nome);
      clientData.setValueForm("cellphone", data.Telefone);
      clientData.setValueForm("cpf", data.Cpf);
      clientData.setValueForm("surname", data.Apelido);
      clientData.setValueForm("gender", data.Genero);
      clientData.setValueForm("profession", data.IdProfissao);
      clientData.setValueForm("civilStatus", data.EstadoCivil);

      const splited: any = data.DataNascimento.split("/");
      const year: any = parseInt(splited[2]);

      clientData.setValueForm("birthdateDay", splited[0]);
      clientData.setValueForm("birthdateMonth", splited[1]);
      clientData.setValueForm("birthdateYear", year);
      clientData.setValueForm("sons", data.PossuiFilhosQtd.toString());
      // clientData.setValueForm('workSchedule', data.);
      clientData.setValueForm("hobbies", data.IdHobbie);
      clientData.setValueForm("idMet", data.IdConheceu);
      clientData.setValueForm("city", data.Cidade);
      clientData.setValueForm("state", data.Estado);
    },
    [clientDataAccess, clientData]
  );

  const getUserData = async () => {
    try {
      const { data } = await api.get(`web/BuscarUsuario/${user.id}/1`);

      await formatUserData(data);
      await getDependents(data.Dependentes);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  async function init() {
    setLoading(true);

    await getYears();
    await getProfession();
    await getUserData();
    await getHobbies();
    await getWorkSchedule();

    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const renderTabs = useMemo(() => {
    if (tab === 0) {
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

              {console.log("history", history)}

              {history.map((h: any, index: number) => (
                <SchedulingCard
                  key={h.id}
                  data={h}
                  index={index}
                  cancelAppointment={handleCancelAppointment}
                />
              ))}
            </Column>
          </Column>
        </Row>
      );
    } else if (tab === 1) {
      return (
        <Row padding={width > 416 ? "50px" : "50px 20px"}>
          <Column flex>
            <Text
              color={"#797979"}
              size={"16px"}
              bold
              padding={"0px 0px 20px 0px"}
            >
              Dados de Acesso
            </Text>

            <Row
              gap={width > 1200 ? "100px" : width > 724 ? "50px" : "20px"}
              startMobile={"724px"}
            >
              <AccessData width={width > 416 ? "290px" : "100%"}>
                <AccessDataContent padding={"40px 20px 30px 20px"}>
                  <Cropper
                    onCrop={(image: CroppedImage) => {
                      setBlobImage(image);
                      clientDataAccess.setValueForm("image", image.url);
                    }}
                  >
                    <ProfileImage>
                      {clientDataAccess.form.image ? (
                        <ImageProfile image={clientDataAccess.form.image} />
                      ) : (
                        <IconSvg viewBox="9.437 8.001 16.794 22.21">
                          <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                        </IconSvg>
                      )}

                      <ProfileImageIconUpload right={"-2px"} bottom={"-2px"} />
                    </ProfileImage>
                  </Cropper>

                  <InputContainer padding={"40px 0px 0px 0px"}>
                    <Input
                      label={"E-mail"}
                      type={"text"}
                      value={clientDataAccess.form.email}
                      error={clientDataAccess.error.email}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        clientDataAccess.onChange("email", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <Input
                      label={"Senha"}
                      type={"password"}
                      value={clientDataAccess.form.password}
                      error={clientDataAccess.error.password}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        clientDataAccess.onChange("password", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <Input
                      label={"Nova senha"}
                      type={"password"}
                      value={clientDataAccess.form.newPassword}
                      error={clientDataAccess.error.newPassword}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        clientDataAccess.onChange("newPassword", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <Input
                      label={"Repita sua nova senha"}
                      type={"password"}
                      value={clientDataAccess.form.confirmNewPassword}
                      error={clientDataAccess.error.confirmNewPassword}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        clientDataAccess.onChange("confirmNewPassword", e)
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

                {width > 836 && (
                  <Click padding={"30px 0px 0px 0px"}>
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Encerrar Minha Conta
                    </Text>
                  </Click>
                )}
              </AccessData>

              {width <= 724 && (
                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"20px 0px 0px 0px"}
                >
                  Dados Pessoais
                </Text>
              )}

              <AccessData
                width={width > 724 ? "auto" : width > 416 ? "290px" : "100%"}
              >
                <AccessDataContent
                  padding={width > 836 ? "40px 80px 60px 80px" : "30px 20px"}
                >
                  <Row
                    gap={"50px"}
                    padding={"10px 0px 0px 0px"}
                    startMobile={"1130px"}
                  >
                    <Column
                      flex
                      alignItems={width > 416 ? "flex-end" : "center"}
                    >
                      <Column>
                        <InputContainer>
                          <Input
                            label={"Seu nome completo"}
                            type={"text"}
                            value={clientData.form.name}
                            error={clientData.error.name}
                            required
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => clientData.onChange("name", e)}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <Input
                            label={"N° Celular"}
                            type={"text"}
                            value={clientData.form.cellphone}
                            error={clientData.error.cellphone}
                            required
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => clientData.onChange("cellphone", e)}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <Input
                            label={"CPF"}
                            type={"text"}
                            value={clientData.form.cpf}
                            error={clientData.error.cpf}
                            required
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => clientData.onChange("cpf", e)}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <Input
                            label={"Como prefere ser chamado?"}
                            type={"text"}
                            value={clientData.form.surname}
                            error={clientData.error.surname}
                            required
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => clientData.onChange("surname", e)}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <InputSelect
                            label={"Gênero"}
                            options={genders}
                            value={clientData.form.gender}
                            error={false}
                            onChange={(e) => {
                              clientData.setValueForm("gender", e);
                            }}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <InputSelect
                            label={"Profissão"}
                            options={profession}
                            value={clientData.form.profession}
                            error={false}
                            onChange={(e) => {
                              clientData.setValueForm("profession", e);
                            }}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <InputSelect
                            label={"Estado Civil"}
                            options={civilStatus}
                            value={clientData.form.civilStatus}
                            error={false}
                            onChange={(e) => {
                              clientData.setValueForm("civilStatus", e);
                            }}
                          />
                        </InputContainer>
                      </Column>
                    </Column>

                    <Column
                      flex
                      alignItems={width > 416 ? "flex-start" : "center"}
                    >
                      <Column>
                        <Text color={"#797979"} size={"15px"} bold>
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
                            error={false}
                            value={clientData.form.birthdateDay}
                            onChange={(e) =>
                              clientData.setValueForm("birthdateDay", e)
                            }
                          />
                          <InputSelect
                            label={"Mês"}
                            width={"75px"}
                            options={months}
                            error={false}
                            value={clientData.form.birthdateMonth}
                            onChange={(e) =>
                              clientData.setValueForm("birthdateMonth", e)
                            }
                          />
                          <InputSelect
                            label={"Ano"}
                            width={"80px"}
                            options={allYears}
                            error={false}
                            value={clientData.form.birthdateYear}
                            onChange={(e) =>
                              clientData.setValueForm("birthdateYear", e)
                            }
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <InputSelect
                            label={"Possui filhos?"}
                            options={quantitySons}
                            value={clientData.form.sons}
                            required
                            onChange={(e) => clientData.setValueForm("sons", e)}
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <InputSelect
                            label={"Horário de trabalho"}
                            options={workSchedule}
                            value={clientData.form.workSchedule}
                            required
                            onChange={(e) =>
                              clientData.setValueForm("workSchedule", e)
                            }
                          />
                        </InputContainer>

                        <InputContainer padding={"20px 0px 0px 0px"}>
                          <InputSelect
                            label={"Hobbie"}
                            options={hobbies}
                            value={clientData.form.hobbies}
                            onChange={(e) =>
                              clientData.setValueForm("hobbies", e)
                            }
                          />
                        </InputContainer>
                      </Column>
                    </Column>
                  </Row>

                  <Click
                    padding={"60px 0px 0px 0px"}
                    onClick={() => handleUpdateData(false)}
                  >
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Atualizar Informações pessoais
                    </Text>
                  </Click>
                </AccessDataContent>
              </AccessData>
            </Row>
          </Column>
        </Row>
      );
    } else if (tab === 2) {
      return (
        <Row padding={width > 416 ? "50px" : "20px"}>
          <Column flex>
            <Text
              color={"#797979"}
              size={"16px"}
              bold
              padding={"0px 0px 20px 0px"}
            >
              Lista de Dependentes
            </Text>

            {dependents && dependents.length > 0 && (
              <DependentsContainer>
                {dependents.map((dependent: any, index: number) => (
                  <Dependent key={index}>
                    <DependentTitle>
                      <Text color={"#0878d3"} size={"15px"} bold>
                        {dependent.name}
                      </Text>

                      <DependentIcon
                        onClick={(e: any) =>
                          handlePopoverOpen(e, index, "dependent")
                        }
                      />

                      {popoverType === "dependent" && index === activeIndex && (
                        <Popover
                          anchorEl={anchorEl}
                          open={openPopover}
                          close={handlePopoverClose}
                          content={
                            <>
                              <OptionPopover
                                onClick={() => handleSelectDependent("edit")}
                              >
                                Editar dependente
                              </OptionPopover>

                              <OptionPopover
                                onClick={() => handleSelectDependent("delete")}
                              >
                                Excluir
                              </OptionPopover>
                            </>
                          }
                        />
                      )}
                    </DependentTitle>

                    <Text color={"#797979"} size={"13px"}>
                      {dependent.gender} | {dependent.age} anos | CPF{" "}
                      {dependent.cpf}
                    </Text>
                  </Dependent>
                ))}
              </DependentsContainer>
            )}

            <NewDependentContainer>
              <Click
                padding={"50px 10px"}
                gap={"20px"}
                onClick={() => {
                  activeIndex = null;
                  setOpenModalDependent(true);
                }}
              >
                <DependentAdd>+</DependentAdd>

                <Text color={"#0878D3"} size={"15px"} bold>
                  Adicionar Dependente
                </Text>
              </Click>
            </NewDependentContainer>
          </Column>
        </Row>
      );
    } else if (tab === 3) {
      return (
        <Row
          padding={width > 416 ? " 30px 50px 50px 50px" : "20px"}
          gap={"10px"}
        >
          <Column table flex>
            <Row
              alignItems={"center"}
              justifyContent={"flex-end"}
              padding={"40px 0px 0px 0px"}
            >
              {/* <Click
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
              </Click> */}

              {openFilterCalendar && popoverType === "calendar" && (
                <Popover
                  anchorEl={anchorEl}
                  open={openPopover}
                  close={handlePopoverClose}
                  noBackgroundColor={true}
                  content={
                    <CalendarRangeComponent
                      handleButton={(e: any) => handleCloseFilterCalendar(e)}
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

                {/* <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Documento Fiscal
                  </Text>
                </Column> */}
              </Row>

              {financialList.map((financial: any) => (
                <>
                  <Row key={financial.id} gap={"10px"} padding={"10px 0px"}>
                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {financial.professional}
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

                    {/* <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        Documento Fiscal
                      </Text>
                    </Column> */}
                  </Row>

                  <Separator />
                </>
              ))}
            </Scroll>
          </Column>
        </Row>
      );
    }
  }, [
    tab,
    dependents,
    anchorEl,
    width,
    clientData,
    clientDataAccess,
    hobbies,
    profession,
    workSchedule,
    openFilterCalendar,
    // dateFilter,
    popoverType,
    allYears,
    financialList,
    handleCloseFilterCalendar,
    handleSelectDependent,
    handleUpdateData,
    handleUpdatePassword,
    handleCancelAppointment,
    history,
    nextAppointment,
    openPopover,
    scheduledAppointments,
  ]);

  return (
    <Container>
      <Row
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={width > 416 ? "50px 50px 0px 50px" : "50px 20px"}
        startMobile={"576px"}
        gap={width > 576 ? "0px" : "40px"}
      >
        <Text color={"#002464"} size={"20px"} bold>
          Minha Conta
        </Text>

        {/* <ButtonScheduling
          width={"295px"}
          onClick={() => setModalConsultation(true)}
        >
          <IconMore>
            <Text color={"#FFF"} size={"30px"}>
              +
            </Text>
          </IconMore>

          <Text color={"#FC0606"} size={width > 416 ? "20px" : "17px"} bold>
            Agendar Consulta
          </Text>
        </ButtonScheduling> */}
      </Row>

      <Row padding={width > 416 ? "50px 50px 0px 50px" : "0px 20px 0px 20px"}>
        <Scroll gap={"20px"}>
          <Button
            fixedWidth
            text={"Minhas Consultas"}
            handleButton={() => handleTab(0)}
            color={tab === 0 ? "#002464" : ""}
          />

          <Button
            fixedWidth
            text={"Meu Perfil"}
            handleButton={() => handleTab(1)}
            color={tab === 1 ? "#002464" : ""}
          />
          <Button
            fixedWidth
            text={"Dependentes"}
            handleButton={() => handleTab(2)}
            color={tab === 2 ? "#002464" : ""}
          />
          <Button
            fixedWidth
            text={"Financeiro"}
            handleButton={() => handleTab(3)}
            color={tab === 3 ? "#002464" : ""}
          />
        </Scroll>
      </Row>

      {renderTabs}

      {openModalDependent && (
        <ModalDependent
          data={editDependent}
          edit={activeIndex !== null}
          open={openModalDependent}
          close={(e) => handleCloseModalDependent(e)}
        />
      )}

      {modalConsultation && (
        <ModalScheduleAppointment
          open={modalConsultation}
          close={() => setModalConsultation(false)}
        />
      )}

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default ClientAccount;
