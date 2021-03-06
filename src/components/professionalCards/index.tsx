import React, { useState, FunctionComponent } from "react";

import {
  Container,
  Wrapper,
  Card,
  Image,
  Content,
  TitleContainer,
  Title,
  SubTitle,
  Button,
  ButtonText,
  Profile,
  Row,
  TimeAndPrice,
  TimeAndPriceMobile,
  Time,
  EmptyImage,
  IconSvg,
  IconPath,
} from "./styles";

import Clock from "assets/svg/clock";

import { useNavigate } from "react-router-dom";
import ModalPreviousScheduleAppointment from "components/modais/modalPreviousScheduleAppointment";

interface OwnProps {
  professionals?: any;
}

type Props = OwnProps;

const ProfessionalCards: FunctionComponent<Props> = ({ professionals }) => {
  const navigate = useNavigate();
  const [professionalData, setProfessionalData] = useState<any>({});
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToProfile = (id: number) => {
    navigate(`/perfil-profissional/${id}`);
  };

  const handleOpenModal = (professional: any) => {
    setProfessionalData(professional.id);
    setOpenModal(true);
  };

  return (
    <Container>
      <Wrapper>
        {professionals.map((professional: any) => (
          <Card key={professional.id}>
            {professional.image ? (
              <Image
                image={professional.image}
                onClick={() => handleToProfile(professional.id)}
              />
            ) : (
              <EmptyImage onClick={() => handleToProfile(professional.id)}>
                <IconSvg viewBox="9.437 8.001 16.794 22.21">
                  <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                </IconSvg>
              </EmptyImage>
            )}

            <Content>
              <TitleContainer start>
                <Title>{professional.name}</Title>
                <SubTitle>CRP {professional.crp}</SubTitle>
              </TitleContainer>

              <TitleContainer invisibleMobile>
                <Row>
                  <Clock />

                  <TimeAndPrice>
                    <Time>{professional.time}</Time>
                    <SubTitle>{professional.price}</SubTitle>
                  </TimeAndPrice>
                </Row>
              </TitleContainer>
            </Content>

            <Content invisibleMobile fixed>
              <SubTitle fixed>{professional.presentationLetter}</SubTitle>
            </Content>

            <Content invisibleMobile>
              <Button onClick={() => handleOpenModal(professional)}>
                <ButtonText>Agendar Atendimento</ButtonText>
              </Button>

              <Profile onClick={() => handleToProfile(professional.id)}>
                Visualizar Perfil [+]
              </Profile>
            </Content>

            <TimeAndPriceMobile>
              <Row>
                <Clock />
                <TimeAndPrice>
                  <Time>50min.</Time>
                </TimeAndPrice>
              </Row>

              <SubTitle>R$ 100,00</SubTitle>
            </TimeAndPriceMobile>
          </Card>
        ))}
      </Wrapper>

      {openModal && (
        <ModalPreviousScheduleAppointment
          open={openModal}
          close={() => setOpenModal(false)}
          professionalId={professionalData}
        />
      )}
    </Container>
  );
};

export default ProfessionalCards;
