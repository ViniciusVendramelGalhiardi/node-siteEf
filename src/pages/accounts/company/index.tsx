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
  CompanyImage,
  CompanyImageProfile,
  ProfileVideo,
  InputContainer,
  Icon,
} from "../styles";

import { Slider, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import schedule from "assets/icons/png/schedule.png";
import attach from "assets/icons/png/attach.png";
import grupoMscara from "assets/images/banners/grupoMscara.png";

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
import { userTypes } from "config/contants";
import TextArea from "components/textarea";
import Checkbox from "components/checkbox";
import ModalSubsidy from "components/modais/modalSubsidy";
import { api } from "services/api";
import useForm from "hooks/useForm";
import Loading from "components/loading";
import CalendarRangeComponent from "components/calendarRangeComponent";
import { useAuth } from "hooks/useAuth";

interface PropsSlider {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

interface Props {}

const CustomSlider = withStyles({
  root: {
    color: "#0878D3",
    width: "100%",
    padding: "10px 0px 60px 0px",
  },
  thumb: {
    height: 17,
    width: 17,
    backgroundColor: "#0878D3",
    marginTop: -7,
    "&:focus, &:hover, &$active": {},
    "& .bar": {},
  },
  active: {},
  track: {
    height: 2,
  },
  rail: {
    color: "#DEDEDE",
    opacity: 1,
    height: 2,
  },
})(Slider);

function ValueLabelComponent(props: PropsSlider) {
  const { children, open, value } = props;

  return (
    <Tooltip open={true} enterTouchDelay={0} placement="bottom" title={value}>
      {children}
    </Tooltip>
  );
}

let activeIndex: any = null;

const CompanyAccount: FunctionComponent<Props> = () => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const [tab, setTab] = useState(0);
  const { showSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const [loading, setLoading] = useState<boolean>(false);

  const [blobImage, setBlobImage] = useState<any>({});
  const [blobImageResponsible, setBlobImageResponsible] = useState<any>({});

  const [nextAppointment, setNextAppointment] = useState([
    {
      id: 1,
      activity: "Psicólogo",
      name: "Marcelo Alburque",
      crp: "CRP 04/2334",
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
      date: "17/04/2020 (Quarta-feira)",
      time: "Às 08:00",
      estimatedDuration: "50min.",
      price: "R$ 100,00",
      sessionId:
        "1_MX40NzEyNTgyNH5-MTYyMjQ4ODU4NDc0MH5lQVdOdVRGSlkySnI3S3Q2UytoSUZzUXF-fg",
    },
  ]);
  const [scheduledAppointments, setScheduledAppointments] = useState([
    {
      id: 1,
      activity: "Psicólogo",
      name: "Marcelo Alburque",
      crp: "CRP 04/2334",
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
      date: "17/04/2020 (Quarta-feira)",
      time: "Às 08:00",
      estimatedDuration: "50min.",
      price: "R$ 100,00",
    },
    {
      id: 2,
      activity: "Psicólogo",
      name: "Marcelo Alburque",
      crp: "CRP 04/2334",
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
      date: "17/04/2020 (Quarta-feira)",
      time: "Às 08:00",
      estimatedDuration: "50min.",
      price: "R$ 100,00",
    },
  ]);
  const [history, setHistory] = useState([
    {
      id: 1,
      activity: "Psicólogo",
      name: "Marcelo Alburque",
      crp: "CRP 04/2334",
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
      date: "17/04/2020 (Quarta-feira)",
      time: "Às 08:00",
      estimatedDuration: "50min.",
      price: "R$ 100,00",
    },
    {
      id: 2,
      activity: "Psicólogo",
      name: "Marcelo Alburque",
      crp: "CRP 04/2334",
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
      date: "17/04/2020 (Quarta-feira)",
      time: "Às 08:00",
      estimatedDuration: "50min.",
      price: "R$ 100,00",
    },
    {
      id: 3,
      activity: "Psicólogo",
      name: "Marcelo Alburque",
      crp: "CRP 04/2334",
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
      date: "17/04/2020 (Quarta-feira)",
      time: "Às 08:00",
      estimatedDuration: "50min.",
      price: "R$ 100,00",
    },
  ]);
  const [financialList, setFinancialList] = useState<any>([
    {
      id: 1,
      register: "1234/SP",
      name: "Anélia Franco",
      typeOfService: "Consulta Psicológica",
      dateAttendance: "05/05/2021",
      privateOrPlan: "Plano de Saúde",
      paidCompany: "R$ -",
      paidCollaborator: "R$ 250,00",
    },
    {
      id: 2,
      register: "5432/MG",
      name: "Rodrigo Amaral",
      typeOfService: "Consulta Psicológica",
      dateAttendance: "05/05/2021",
      privateOrPlan: "Particular",
      paidCompany: "R$ 350,00",
      paidCollaborator: "R$ -",
    },
  ]);

  const userData = useForm({
    id: { type: "", required: false },
    companyImage: { type: "", required: false },
    companyName: { type: "", required: true },
    cnpj: { type: "cnpj", required: true },
    state: { type: "", required: true },
    city: { type: "", required: true },
    image: { type: "", required: false },
    name: { type: "", required: true },
    cellphone: { type: "phone", required: true },
    cpf: { type: "cpf", required: true },
    email: { type: "email", required: true },
    password: { type: "password", required: true },
    newPassword: { type: "password", required: true },
    confirmNewPassword: { type: "password", required: true },
    presentationLetter: { type: "", required: false },
    video: { type: "", required: false },
  });

  const [modalConsultation, setModalConsultation] = useState(false);
  const [modalSubsidy, setModalSubsidy] = useState(false);
  const [professionals, setProfessionals] = useState<any>([]);
  const [contributors, setContributors] = useState<any>([]);
  const [upVideo, setUpVideo] = useState<any>("");

  const [popoverType, setPopoverType] = useState<string>("");
  const [openFilterCalendar, setOpenFilterCalendar] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<any>({});

  const handleUpdatePassword = useCallback(async () => {
    try {
      const validated = userData.validateForm();

      if (!validated) {
        return;
      }

      if (userData.form.newPassword !== userData.form.confirmNewPassword) {
        userData.setError({
          ...userData.error,
          confirmNewPassword: "Confirme a senha corretamente!",
        });

        return;
      }

      setLoading(true);

      const { data } = await api.put(
        `web/AtualizaSenhaUsuario/${userData.form.email}?senhaatual=${userData.form.password}&novasenha=${userData.form.newPassword}&IdUsuario=${user.id}`
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [userData, user]);

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

  const handleDeleteProfessional = useCallback(() => {
    handlePopoverClose();

    const newProfessional = [...professionals];

    showSnackbar({
      image: newProfessional[activeIndex].image,
      name: newProfessional[activeIndex].name,
      message: "Deseja realmente excluir este profissional da sua lista?",
      cancelText: "Não quero excluir",
      submitText: "Sim, excluir profissional",
      onSubmit: () => {
        newProfessional.splice(activeIndex, 1);
        setProfessionals(newProfessional);
      },
    });
  }, [professionals]);

  const handleTab = (newTab: number) => {
    setTab(newTab);
  };

  async function getProfessionals() {
    try {
      setProfessionals([
        {
          id: 1,
          name: "Gabriel Cerantola",
          activity: "Psicólogo",
          age: 25,
          crp: "04/2334",
        },
        {
          id: 2,
          name: "Tatiana Werneck",
          activity: "Psicólogo",
          age: 36,
          crp: "04/2334",
        },
      ]);
    } catch (error) {}
  }

  async function getContributors() {
    try {
      setContributors([
        {
          id: 1,
          register: "1234/SP",
          name: "Gabriel Cerantola",
          cpf: "440.570.748-05",
          birthdate: "30/10/1995",
          bond: "Terceirizado",
          office: "Gerente",
          healthPlan: "Amil",
          corporateSubsidy: false,
          value: "R$ -",
        },
        {
          id: 2,
          register: "5456/MG",
          name: "Tatiana Werneck",
          cpf: "440.570.748-05",
          birthdate: "30/10/1995",
          bond: "Contratado",
          office: "Gerente",
          healthPlan: "Sulamerica",
          corporateSubsidy: true,
          value: "R$ 250,00",
        },
        {
          id: 2,
          register: "4476/RJ",
          name: "Ronaldo Albuquerque",
          cpf: "440.570.748-05",
          birthdate: "30/10/1995",
          bond: "Contratado",
          office: "Gerente",
          healthPlan: "Prevent Senior",
          corporateSubsidy: true,
          value: "3 Atendimentos",
        },
      ]);
    } catch (error) {}
  }

  const formatUserData = useCallback(
    async (data: any) => {
      console.log("data", data);

      userData.setValueForm("id", data.idUsuario);
      userData.setValueForm("companyImage", data.BaseImageCompany);
      userData.setValueForm("companyName", data.NomeEmpresaEmp);

      if (data.Cnpj) {
        userData.setValueForm("cnpj", data.Cnpj);
      }

      userData.setValueForm("city", data.NomeEmpresaEmp);
      userData.setValueForm("state", data.Estado);
      userData.setValueForm("image", data.BaseImage);
      userData.setValueForm("name", data.Nome);
      userData.setValueForm("email", data.Email);
      userData.setValueForm("cellphone", data.Telefone);
      userData.setValueForm("cpf", data.Cpf);
      userData.setValueForm("presentationLetter", data.CartaApresentacao);
      userData.setValueForm("video", data.Video);
    },
    [userData]
  );

  const getUserData = async () => {
    try {
      const { data } = await api.get(`web/BuscarUsuario/${user.id}/3`);

      if (data && Object.keys(data).length > 0) {
        await formatUserData(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  async function init() {
    setLoading(true);

    await getUserData();
    await getProfessionals();
    await getContributors();

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
                Próximas Consultas (Hoje)
              </Text>

              {nextAppointment.map((next: any, index: number) => (
                <SchedulingCard
                  key={next.id}
                  nextAppointment
                  userType={userTypes.company}
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
                Consultas Agendadas (Próximos Dias)
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
        <Row
          gap={width > 792 ? "50px" : "20px"}
          padding={width > 416 ? "50px" : "50px 20px"}
          startMobile={"792px"}
        >
          <Column flex>
            <Text
              color={"#797979"}
              size={"16px"}
              bold
              padding={"0px 0px 20px 0px"}
            >
              Sobre a Empresa
            </Text>

            <AccessData width={width > 416 ? "290px" : "100%"}>
              <AccessDataContent padding={"20px 20px 30px 20px"}>
                <Cropper
                  onCrop={(image: CroppedImage) => {
                    setBlobImage(image);
                    userData.setValueForm("companyImage", image.url);
                    console.log("image", image);
                  }}
                >
                  <CompanyImage>
                    <CompanyImageProfile
                      image={
                        userData.form.companyImage
                          ? userData.form.companyImage
                          : "http://logosaude.com.br/wp-content/uploads/2017/08/logoffffooter.png"
                      }
                    />

                    <ProfileImageIconUpload right={"15px"} bottom={"-15px"} />
                  </CompanyImage>
                </Cropper>

                <Text
                  color={"#797979"}
                  size={"16px"}
                  bold
                  padding={"40px 0px 0px 0px"}
                >
                  Dados Básicos
                </Text>

                <InputContainer padding={"40px 0px 0px 0px"}>
                  <Input
                    label={"Nome da Empresa"}
                    type={"text"}
                    value={userData.form.companyName}
                    error={userData.error.companyName}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("companyName", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"CNPJ"}
                    type={"text"}
                    value={userData.form.cnpj}
                    error={userData.error.cnpj}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("cnpj", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"} gap={"10px"}>
                  <InputSelect
                    label={"UF"}
                    width={"75px"}
                    options={[]}
                    error={false}
                    value={""}
                    onChange={(e) => console.log("e", e)}
                  />
                  <InputSelect
                    label={"Cidade"}
                    width={"165px"}
                    options={[]}
                    error={false}
                    value={""}
                    required
                    onChange={(e) => console.log("e", e)}
                  />
                </InputContainer>

                <Click padding={"30px 0px 0px 0px"}>
                  <Text color={"#0878D3"} size={"15px"} bold>
                    Encerrar Conta da Empresa
                  </Text>
                </Click>
              </AccessDataContent>
            </AccessData>

            <Text color={"#797979"} size={"16px"} bold padding={"20px 0px"}>
              Sobre o Responsável
            </Text>

            <AccessData width={width > 416 ? "290px" : "100%"}>
              <AccessDataContent padding={"40px 20px 30px 20px"}>
                <Cropper
                  onCrop={(image: CroppedImage) => {
                    setBlobImageResponsible(image);
                    userData.setValueForm("image", image.url);
                    console.log("image", image);
                  }}
                >
                  <ProfileImage>
                    {userData.form.image ? (
                      <ImageProfile image={userData.form.image} />
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
                    label={"Nome do Responsável"}
                    type={"text"}
                    value={userData.form.name}
                    error={userData.error.name}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("name", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"CPF do Responsável"}
                    type={"text"}
                    value={userData.form.cpf}
                    error={userData.error.cpf}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("cpf", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"E-mail do Responsável"}
                    type={"text"}
                    value={userData.form.email}
                    error={userData.error.email}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("email", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"N° Celular"}
                    type={"text"}
                    value={userData.form.cellphone}
                    error={userData.error.cellphone}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("cellphone", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"Senha"}
                    type={"password"}
                    value={userData.form.password}
                    error={userData.error.password}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("password", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"Nova senha"}
                    type={"password"}
                    value={userData.form.newPassword}
                    error={userData.error.newPassword}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("newPassword", e)
                    }
                  />
                </InputContainer>

                <InputContainer padding={"20px 0px 0px 0px"}>
                  <Input
                    label={"Repita sua nova senha"}
                    type={"password"}
                    value={userData.form.confirmNewPassword}
                    error={userData.error.confirmNewPassword}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("confirmNewPassword", e)
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
              </AccessDataContent>
            </AccessData>
          </Column>

          <Row gap={width > 1188 ? "50px" : "20px 50px"} startMobile={"1188px"}>
            <Column flex>
              <Text
                color={"#797979"}
                size={"16px"}
                bold
                padding={"0px 0px 20px 0px"}
              >
                Carta de Apresentação
              </Text>

              <AccessData
                width={width > 792 ? "364px" : width > 416 ? "290px" : "100%"}
              >
                <AccessDataContent padding={"22px 20px 20px 20px"}>
                  <TextArea
                    placeholder={"Uma breve apresentação sobre a empresa"}
                    minHeight={width > 792 ? "188px" : "400px"}
                    maxHeight={width > 792 ? "188px" : "400px"}
                    padding={"10px"}
                    value={userData.form.presentationLetter}
                    error={userData.error.presentationLetter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      userData.onChange("presentationLetter", e)
                    }
                  />

                  <Click padding={"20px 0px 0px 0px"}>
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Atualizar Informação
                    </Text>
                  </Click>
                </AccessDataContent>
              </AccessData>

              <Text color={"#797979"} size={"16px"} bold padding={"20px 0px"}>
                Seleção de Profissionais
              </Text>

              <AccessData
                width={width > 792 ? "364px" : width > 416 ? "290px" : "100%"}
              >
                <AccessDataContent padding={"40px 20px"}>
                  <InputContainer padding={"0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Profissional"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Experiência do profissional"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <Input
                      width={width > 792 ? "324px" : ""}
                      label={"Nome do Profissional"}
                      type={"text"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Demanda ou Sintoma"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Faixa Etária do Cliente"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Abordagem desejada"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Gênero do Profissional"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <InputContainer padding={"20px 0px 0px 0px"}>
                    <InputSelect
                      width={width > 792 ? "324px" : ""}
                      label={"Plano de Saúde"}
                      options={[]}
                      error={false}
                      onChange={(e) => {}}
                    />
                  </InputContainer>

                  <Text
                    color={"#797979"}
                    size={"16px"}
                    bold
                    padding={"20px 0px"}
                  >
                    Faixa de Valor
                  </Text>

                  <CustomSlider
                    ValueLabelComponent={ValueLabelComponent}
                    getAriaLabel={(index) =>
                      index === 0 ? "Minimum price" : "Maximum price"
                    }
                    defaultValue={[0, 100]}
                    valueLabelDisplay="auto"
                  />

                  <Button
                    width={"100%"}
                    height={"46px"}
                    text={"Selecionar Profissionais para Atender sua Empresa"}
                    handleButton={() => {}}
                  />
                </AccessDataContent>
              </AccessData>
            </Column>

            <Column flex alignItems={"flex-start"}>
              <Text
                color={"#797979"}
                size={"16px"}
                bold
                padding={"0px 0px 20px 0px"}
              >
                Vídeo Institucional
              </Text>

              <AccessData
                width={width > 792 ? "364px" : width > 416 ? "290px" : "100%"}
              >
                <AccessDataContent padding={"20px"}>
                  <Click
                    column
                    onClick={(e: any) => {
                      e.preventDefault();
                      selectVideo();
                    }}
                  >
                    <>
                      <ProfileVideo image={grupoMscara} />

                      <Click padding={"20px 0px 2px 0px"}>
                        <Text color={"#0878D3"} size={"15px"} bold>
                          Anexar Vídeo Apresentação
                        </Text>
                      </Click>
                    </>
                  </Click>
                </AccessDataContent>
              </AccessData>

              <Text color={"#797979"} size={"16px"} bold padding={"20px 0px"}>
                Colaboradores
              </Text>

              <AccessData
                width={width > 792 ? "364px" : width > 416 ? "290px" : "100%"}
              >
                <AccessDataContent padding={"20px"}>
                  <Click gap={"10px"}>
                    <Icon width={"25px"} height={"26px"} image={attach} />

                    <Text color={"#0878D3"} size={"14px"} bold>
                      Carregar Cadastro de Colaboradores
                    </Text>
                  </Click>
                </AccessDataContent>
              </AccessData>

              <Click
                gap={"20px"}
                padding={"40px 0px"}
                onClick={() => setModalSubsidy(true)}
              >
                <IconMore>
                  <Text color={"#FFF"} size={"30px"}>
                    +
                  </Text>
                </IconMore>

                <Text color={"#FC0606"} size={"20px"} bold>
                  Acrescentar Subsídio
                </Text>
              </Click>

              <Text color={"#797979"} size={"16px"} bold>
                Profissionais Selecionados para Atender sua Empresa
              </Text>

              {professionals && professionals.length > 0 && (
                <Column
                  padding={"20px 0px 0px 0px"}
                  gap={"20px"}
                  minWidth={width > 416 ? "290px" : "100%"}
                >
                  {professionals.map((professional: any, index: number) => (
                    <Dependent
                      key={index}
                      width={width > 792 ? "364px" : "290px"}
                    >
                      <DependentTitle>
                        <Text color={"#0878d3"} size={"15px"} bold>
                          {professional.name}
                        </Text>

                        <DependentIcon
                          onClick={(e) =>
                            handlePopoverOpen(e, index, "professional")
                          }
                        />

                        {popoverType === "professional" &&
                          index === activeIndex && (
                            <Popover
                              anchorEl={anchorEl}
                              open={openPopover}
                              close={handlePopoverClose}
                              content={
                                <OptionPopover
                                  onClick={handleDeleteProfessional}
                                >
                                  Excluir
                                </OptionPopover>
                              }
                            />
                          )}
                      </DependentTitle>

                      <Text color={"#797979"} size={"13px"}>
                        {professional.activity} | {professional.age} anos |{" "}
                        {professional.crp}
                      </Text>
                    </Dependent>
                  ))}
                </Column>
              )}
            </Column>
          </Row>
        </Row>
      );
    } else if (tab === 2) {
      return (
        <Row
          padding={width > 416 ? " 30px 50px 50px 50px" : "20px"}
          gap={"10px"}
        >
          <Column table flex alignItems={"flex-start"}>
            <Row alignItems={"center"} justifyContent={"flex-end"}>
              <Click gap={"10px"}>
                <Icon width={"25px"} height={"26px"} image={attach} />

                <Column>
                  <Text
                    color={"#0878D3"}
                    size={"15px"}
                    bold
                    padding={"20px 0px 0px 0px"}
                  >
                    Carregar Cadastro
                  </Text>

                  <Text
                    color={"#0878D3"}
                    size={"15px"}
                    bold
                    padding={"0px 0px 20px 0px"}
                  >
                    de Colaboradores
                  </Text>
                </Column>
              </Click>
            </Row>

            <Scroll column>
              <Row gap={"10px"} padding={"10px 0px"}>
                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"100px"}
                  maxWidth={"100px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Registro
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"200px"}
                  maxWidth={"200px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Nome
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"120px"}
                  maxWidth={"120px"}
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
                  minWidth={"100px"}
                  maxWidth={"100px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Data de
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Nacimento
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
                    Vínculo
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"90px"}
                  maxWidth={"90px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Cargo
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"120px"}
                  maxWidth={"120px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Plano de
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Saúde?
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"95px"}
                  maxWidth={"95px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Subsídio
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Corporativo?
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Valor
                  </Text>
                </Column>
              </Row>

              {contributors.map((contributor: any, index: number) => (
                <>
                  <Row key={contributor.id} gap={"10px"} padding={"10px 0px"}>
                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"100px"}
                      maxWidth={"100px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {contributor.register}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"200px"}
                      maxWidth={"200px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {contributor.name}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"120px"}
                      maxWidth={"120px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {contributor.cpf}
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
                        {contributor.birthdate}
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
                        {contributor.bond}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"90px"}
                      maxWidth={"90px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {contributor.office}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"120px"}
                      maxWidth={"120px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {contributor.healthPlan}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"95px"}
                      maxWidth={"95px"}
                    >
                      <Row
                        gap={"10px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Checkbox
                          checked={contributor.corporateSubsidy}
                          error={false}
                          onChange={(e: any) => {
                            console.log("e", e);
                          }}
                        />

                        <DependentIcon
                          onClick={(e) =>
                            handlePopoverOpen(e, index, "contributor")
                          }
                        />

                        {popoverType === "contributor" &&
                          index === activeIndex && (
                            <Popover
                              anchorEl={anchorEl}
                              open={openPopover}
                              close={handlePopoverClose}
                              content={
                                <OptionPopover
                                  onClick={() => {
                                    handlePopoverClose();
                                    setModalSubsidy(true);
                                  }}
                                >
                                  Acrescentar Saldo
                                </OptionPopover>
                              }
                            />
                          )}
                      </Row>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {contributor.value}
                      </Text>
                    </Column>
                  </Row>

                  <Separator />
                </>
              ))}
            </Scroll>

            <Click
              gap={"20px"}
              padding={"100px 0px 0px 0px"}
              onClick={() => setModalSubsidy(true)}
            >
              <IconMore>
                <Text color={"#FFF"} size={"30px"}>
                  +
                </Text>
              </IconMore>

              <Text color={"#FC0606"} size={"20px"} bold>
                Acrescentar Subsídio
              </Text>
            </Click>
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
                  minWidth={"100px"}
                  maxWidth={"100px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Registro
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"200px"}
                  maxWidth={"200px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Nome
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
                    Data do
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Atendimento
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"140px"}
                  maxWidth={"140px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Particular ou
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Plano de Saúde?
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"120px"}
                  maxWidth={"120px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Pago pela
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Empresa
                  </Text>
                </Column>

                <Column
                  table
                  flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth={"120px"}
                  maxWidth={"120px"}
                >
                  <Text color={"#797979"} size={"15px"} bold>
                    Pago pelo
                  </Text>
                  <Text color={"#797979"} size={"15px"} bold>
                    Colaborador
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
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"100px"}
                      maxWidth={"100px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {financial.register}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"200px"}
                      maxWidth={"200px"}
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
                        {financial.dateAttendance}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"140px"}
                      maxWidth={"140px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {financial.privateOrPlan}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"120px"}
                      maxWidth={"120px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {financial.paidCompany}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      minWidth={"120px"}
                      maxWidth={"120px"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        {financial.paidCollaborator}
                      </Text>
                    </Column>

                    <Column
                      table
                      flex
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text color={"#797979"} size={"15px"}>
                        Baixar
                      </Text>
                    </Column>
                  </Row>

                  <Separator />
                </>
              ))}
            </Scroll>

            <Row
              padding={"100px 0px 0px 0px"}
              alignItems={"center"}
              gap={"50px"}
              startMobile={"578px"}
            >
              <Column alignItems={width > 578 ? "flex-start" : "center"}>
                <Text color={"#23B49E"} size={"15px"} bold>
                  Saldo Disponível
                </Text>
                <Text color={"#23B49E"} size={"15px"} bold>
                  Pago pela Empresa
                </Text>
              </Column>

              <AccessData width={"290px"}>
                <AccessDataContent padding={"10px"}>
                  <Row
                    gap={"20px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"#23B49E"} size={"29px"} bold>
                      R$ 600,00
                    </Text>

                    <DependentIcon
                      onClick={(e) => handlePopoverOpen(e, 0, "subsidy")}
                    />

                    {popoverType === "subsidy" && activeIndex === 0 && (
                      <Popover
                        anchorEl={anchorEl}
                        open={openPopover}
                        close={handlePopoverClose}
                        content={
                          <>
                            <OptionPopover onClick={() => {}}>
                              Cancelar Subsídio
                            </OptionPopover>

                            <OptionPopover
                              onClick={() => {
                                handlePopoverClose();
                                setModalSubsidy(true);
                              }}
                            >
                              Acrescentar Saldo
                            </OptionPopover>
                          </>
                        }
                      />
                    )}
                  </Row>
                </AccessDataContent>
              </AccessData>
            </Row>
          </Column>
        </Row>
      );
    }
  }, [
    tab,
    professionals,
    anchorEl,
    width,
    contributors,
    userData,
    openFilterCalendar,
    dateFilter,
    popoverType,
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
      </Row>

      <Row padding={width > 416 ? "50px 50px 0px 50px" : "0px 20px 0px 20px"}>
        <Scroll gap={"20px"}>
          <Button
            fixedWidth
            text={"Consultas"}
            handleButton={() => handleTab(0)}
            color={tab === 0 ? "#002464" : ""}
          />

          <Button
            fixedWidth
            text={"Perfil Empresa"}
            handleButton={() => handleTab(1)}
            color={tab === 1 ? "#002464" : ""}
          />
          <Button
            fixedWidth
            text={"Colaboradores"}
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

      {modalSubsidy && (
        <ModalSubsidy
          open={modalSubsidy}
          close={() => setModalSubsidy(false)}
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

export default CompanyAccount;
