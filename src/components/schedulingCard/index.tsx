import React, { useState, FunctionComponent } from "react";

import {
  Container,
  Header,
  Content,
  Row,
  Column,
  Text,
  ProfileImage,
  ImageProfile,
  IconPath,
  IconSvg,
  Icon,
  Footer,
  ButtonContainer,
} from "./styles";

import { Separator } from "styles";

import { useNavigate } from "react-router-dom";

import useWindowSize from "hooks/useWindowSize";
import Clock from "assets/svg/clock";
import calendar from "assets/icons/png/calendario.png";
import maps from "assets/icons/png/maps.png";
import waze from "assets/icons/png/waze.png";
import droplist from "assets/icons/png/droplist.png";
import watch from "assets/icons/png/watch.png";
import iconX from "assets/icons/png/x.png";

import Button from "components/button";
import Popover from "components/popover";
import { useSnackbar } from "hooks/useSnackbar";
import { userTypes } from "config/contants";

interface Props {
  data?: any;
  index?: any;
  userType?: number;
  nextAppointment?: boolean;
  scheduledAppointments?: boolean;
  client?: boolean;
  cancelAppointment?: (d: any, i: number, t: string) => void;
}

const SchedulingCard: FunctionComponent<Props> = ({
  data,
  index,
  userType,
  nextAppointment,
  scheduledAppointments,
  client,
  cancelAppointment,
}) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { showSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const beginSession = () => {
    navigate("/atendimento-online", {
      state: {
        sessionId: data.sessionId,
        professionalId: data.professionalId,
        schedulingId: data.id,
      },
    });
  };

  return (
    <Container>
      <Header
        nextAppointment={nextAppointment}
        scheduledAppointments={scheduledAppointments}
      >
        {userType === userTypes.professional && !client
          ? `Consulta ${data.consultation}`
          : data.activity}

        {(nextAppointment || scheduledAppointments) && (
          <>
            <Icon
              image={droplist}
              width={"29px"}
              height={"7px"}
              pointer
              onClick={handlePopoverOpen}
            />

            <Popover
              anchorEl={anchorEl}
              open={openPopover}
              close={handlePopoverClose}
              content={
                <Column padding={"10px"} gap={"15px"}>
                  {/* <Row gap={"20px"} alignItems={"center"} pointer>
                    <Icon image={watch} width={"20px"} height={"20px"} />

                    <Text color={"#FFF"} size={"15px"}>
                      Reagendar Consulta
                    </Text>
                  </Row> */}

                  <Row
                    padding={"0px 0px 0px 3px"}
                    gap={"22px"}
                    alignItems={"center"}
                    pointer
                    onClick={() => {
                      handlePopoverClose();

                      const type = nextAppointment
                        ? "next"
                        : scheduledAppointments
                        ? "others"
                        : "history";

                      showSnackbar({
                        image: data.image,
                        name: `${data.name} no dia ${data.date} ${data.time}`,
                        message: "Deseja realmente cancelar sua consulta com",
                        cancelText: "Não quero cancelar",
                        submitText: "Sim, cancelar consulta",
                        onSubmit: () =>
                          cancelAppointment
                            ? cancelAppointment(data, index, type)
                            : {},
                      });
                    }}
                  >
                    <Icon image={iconX} width={"14px"} height={"14px"} />

                    <Text color={"#FFF"} size={"15px"}>
                      Cancelar Consulta
                    </Text>
                  </Row>
                </Column>
              }
            />
          </>
        )}
      </Header>

      <Content nextAppointment={nextAppointment} userType={userType}>
        {!client && (
          <>
            <Row padding={"0px 0px 20px 0px"} justifyContent={"space-between"}>
              <ProfileImage>
                {data.image ? (
                  <ImageProfile image={data.image} />
                ) : (
                  <IconSvg viewBox="9.437 8.001 16.794 22.21">
                    <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                  </IconSvg>
                )}
              </ProfileImage>

              {userType === userTypes.professional ? (
                <Column padding={"0px 10px"}>
                  <Text color={"#797979"} size={"15px"} bold>
                    Paciente
                  </Text>
                  <Text color={"#797979"} size={"15px"}>
                    {data.name}
                  </Text>
                  <Text color={"#797979"} size={"15px"}>
                    CPF {data.cpf}
                  </Text>
                  <Text color={"#797979"} size={"15px"}>
                    {data.age} anos
                  </Text>
                </Column>
              ) : (
                <Column padding={"0px 10px"}>
                  <Text color={"#797979"} size={"15px"} bold>
                    Profissional
                  </Text>
                  <Text color={"#797979"} size={"15px"}>
                    {data.name}
                  </Text>
                  <Text color={"#797979"} size={"15px"}>
                    {data.activity} - {data.crp}
                  </Text>
                </Column>
              )}
            </Row>

            <Separator />
          </>
        )}

        <Row alignItems={"center"} justifyContent={"space-between"}>
          <Icon width={"25px"} height={"27px"} image={calendar} />

          <Column padding={"10px 20px"}>
            <Text color={"#797979"} size={"15px"}>
              Agendamento
            </Text>
            <Text color={"#23B49E"} size={"15px"} bold>
              {data.date}
            </Text>
            <Text color={"#23B49E"} size={"15px"} bold>
              {data.time}
            </Text>
          </Column>
        </Row>

        <Separator />

        <Row
          gap={"10px"}
          padding={"20px 0px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Column>
            <Row alignItems={"center"} justifyContent={"space-between"}>
              <Clock />

              <Column padding={"0px 20px 0px 20px"}>
                <Text color={"#797979"} size={"15px"}>
                  Duração estimada
                </Text>

                <Text color={"#23B49E"} size={"15px"} bold>
                  {data.estimatedDuration}
                </Text>
              </Column>
            </Row>
          </Column>

          <Separator vertical height={60} />

          <Column padding={"0px 0px 0px 20px"}>
            <Text color={"#797979"} size={"15px"}>
              Valor da
            </Text>
            <Text color={"#797979"} size={"15px"}>
              Consulta
            </Text>
            <Text color={"#23B49E"} size={"15px"} bold>
              {data.price}
            </Text>
          </Column>
        </Row>
      </Content>

      {nextAppointment && userType !== userTypes.company && (
        <Footer client={client}>
          {userType !== userTypes.professional && (
            <Row alignItems={"center"} justifyContent={"space-between"}>
              <Column>
                <Row
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pointer
                >
                  <Icon width={"31px"} height={"31px"} image={maps} />

                  <Column
                    padding={
                      width > 382 ? "0px 20px 0px 20px" : "0px 5px 0px 10px"
                    }
                  >
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Veja no
                    </Text>
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Mapa
                    </Text>
                  </Column>
                </Row>
              </Column>

              <Column padding={"0px 0px 0px 20px"}>
                <Row
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pointer
                >
                  <Icon width={"31px"} height={"31px"} image={waze} />

                  <Column
                    padding={
                      width > 382 ? "0px 20px 0px 20px" : "0px 5px 0px 10px"
                    }
                  >
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Veja no
                    </Text>
                    <Text color={"#0878D3"} size={"15px"} bold>
                      Waze
                    </Text>
                  </Column>
                </Row>
              </Column>
            </Row>
          )}

          <ButtonContainer client={client}>
            <Button
              fixedWidth
              text={"Acessar Sala On-line"}
              handleButton={beginSession}
            />
          </ButtonContainer>
        </Footer>
      )}
    </Container>
  );
};

export default SchedulingCard;
