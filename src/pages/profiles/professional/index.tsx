import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import {
  Container,
  BannerContent,
  ProfileImage,
  Text,
  TimeContainer,
  Section,
  Row,
  Column,
  SectionVideo,
  ScheduleContainer,
  ProfileImageContainer,
  IconSvg,
  IconPath,
} from "./styles";

import { useLocation, useParams } from "react-router-dom";

import BannerHome from "assets/images/banners/home.png";
import Banner from "components/banner";
import useWindowSize from "hooks/useWindowSize";
import Clock from "assets/svg/clock";
import ModalScheduleAppointment from "components/modais/modalScheduleAppointment";
import ModalAccess from "components/modais/modalAccess";
import CalendarComponent from "components/calendarComponent";
import { api } from "services/api";
import { numberToMoney } from "helpers/utils";
import Loading from "components/loading";
import { useAuth } from "hooks/useAuth";

interface Props {}

const ProfessionalProfile: FunctionComponent<Props> = ({}) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const { state } = useLocation();
  const { id } = useParams();
  const [modalConsultation, setModalConsultation] = useState(false);
  const [scroll, setScroll] = useState<number>(0);
  const [scheduling, setScheduling] = useState<any>({});
  const [modalLogin, setModalLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [professional, setProfessional] = useState<any>({});
  const [profession, setProfession] = useState<string>("");

  const handleOpenModal = useCallback(
    (newScheduling: any) => {
      if (!user) {
        setModalLogin(true);

        return;
      }

      setScheduling(newScheduling);
      setModalConsultation(true);
    },
    [user]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScroll(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProfession = async (professionalData: any) => {
    try {
      const { data } = await api.get("web/ListaProfissao");

      const newProfession = data.filter(
        (p: any) => p.Id === professionalData.IdProfissao
      )[0].Nome;

      setProfession(newProfession);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfessionalData = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`web/BuscarUsuario/${id}/2`);

      await getProfession(data);

      setProfessional(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  async function init() {
    await getProfessionalData();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Banner
        image={BannerHome}
        content={
          <BannerContent padding={"20px"}>
            <Row height={"438px"}>
              <Column width={50} center>
                {professional.BaseImage ? (
                  <ProfileImage image={professional.BaseImage} />
                ) : (
                  <ProfileImageContainer>
                    <IconSvg viewBox="9.437 8.001 16.794 22.21">
                      <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                    </IconSvg>
                  </ProfileImageContainer>
                )}

                <Text
                  color={"#FFF"}
                  size={"30px"}
                  bold
                  padding={"20px 0px 0px 0px"}
                >
                  {professional.Nome}
                </Text>

                <Text color={"#FFF"} size={"13px"} padding={"0px 0px 20px 0px"}>
                  {profession}{" "}
                  {professional.RegistroCRPePsi
                    ? ` - CRP: ${professional.RegistroCRPePsi}`
                    : null}
                </Text>

                <TimeContainer>
                  <Clock />

                  <Text color={"#23B49E"} bold size={"18px"}>
                    {professional.DuracaoAtendimentoProf} / R${" "}
                    {numberToMoney(professional.ValorPorSessaoProf)}
                  </Text>
                </TimeContainer>
              </Column>

              <Column width={50} center>
                <ScheduleContainer fixed={scroll >= 154}>
                  <CalendarComponent
                    schedulingData={state}
                    professionalId={id}
                    handleButton={(e: any) => handleOpenModal(e)}
                  />
                </ScheduleContainer>
              </Column>
            </Row>
          </BannerContent>
        }
      />

      <Section
        padding={width > 798 ? "50px" : "580px 10px 50px 10px"}
        boxShadow
        color={"#F0F0F0"}
      >
        <Row>
          <Column width={50} center>
            <SectionVideo />
          </Column>

          <Column width={50}></Column>
        </Row>
      </Section>

      <Section
        padding={width > 598 ? "50px" : "50px 10px"}
        center={width <= 598}
      >
        <Row>
          <Column width={50}>
            <Section center={width <= 598}>
              <Text
                color={"#002464"}
                bold
                size={"25px"}
                padding={"0px 20px 20px 20px"}
                center={width <= 598}
              >
                Carta de Apresentação
              </Text>
            </Section>

            <Text
              color={"#797979"}
              size={"15px"}
              padding={"0px 20px 40px 20px"}
            >
              {professional.CartaApresentacaoProf}
            </Text>

            <Section center={width <= 598}>
              <Text
                color={"#002464"}
                bold
                size={"25px"}
                padding={"20px"}
                center={width <= 598}
              >
                Formação e Experiência
              </Text>
            </Section>

            {professional.ExperienciasPraticaProf &&
              professional.ExperienciasPraticaProf.map((experience: any) => (
                <>
                  <Text
                    color={"#797979"}
                    size={"16px"}
                    bold
                    padding={"0px 20px"}
                  >
                    {experience.TipoExperiencia}
                  </Text>

                  <Text
                    color={"#797979"}
                    size={"15px"}
                    padding={"0px 20px 20px 20px"}
                  >
                    {experience.AtividadePrincipal} - {experience.DataInicio} -
                    {experience.DataTermino}
                  </Text>
                </>
              ))}

            {professional.FormacoesProf &&
              professional.FormacoesProf.map((formation: any) => (
                <>
                  <Text
                    color={"#797979"}
                    size={"16px"}
                    bold
                    padding={"0px 20px"}
                  >
                    {formation.InstituicaoEnsino}
                  </Text>

                  <Text
                    color={"#797979"}
                    size={"15px"}
                    padding={"0px 20px 20px 20px"}
                  >
                    {formation.NivelAcademico} em {formation.NomeCurso} -{" "}
                    {formation.AnoInicio} - {formation.AnoTermino}
                  </Text>
                </>
              ))}
          </Column>

          <Column width={50}></Column>
        </Row>
      </Section>

      {modalLogin && (
        <ModalAccess
          type={1}
          noRedirect={true}
          open={modalLogin}
          close={() => setModalLogin(false)}
        />
      )}

      {modalConsultation && (
        <ModalScheduleAppointment
          scheduling={scheduling}
          open={modalConsultation}
          close={() => setModalConsultation(false)}
        />
      )}

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default ProfessionalProfile;
