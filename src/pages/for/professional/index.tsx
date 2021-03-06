import React, { useState, FunctionComponent } from "react";

import {
  Container,
  Row,
  Column,
  RegistrationFormContainer,
  // Span,
  DotGreen,
} from "../styles";

import {
  BannerContent,
  SectionContainer,
  SectionContent,
  SectionSubTitle,
  SectionTitle,
  SubTitleBanner,
  TitleBanner,
  SectionDescriptionIcon,
  SectionIcon,
  SectionDescription,
  SectionButtonContainer,
  SectionVideo,
  SectionImage,
  SectionRow,
} from "styles";
import RegistrationForm from "components/registrationForm";

import Banner from "components/banner";
import bannerProfessional from "assets/images/banners/bannerProfessional.png";
import banner1 from "assets/images/png/banner1.png";
import banner2 from "assets/images/png/banner2.png";
import banner3 from "assets/images/png/banner3.png";
import onlineRegistration from "assets/icons/png/onlineRegistration.png";
import personalInformation from "assets/icons/png/personalInformation.png";
import timer from "assets/icons/png/timer.png";
import calendar from "assets/icons/png/calendarBlue.png";
import Button from "components/button";
import { userTypes } from "config/contants";
import useWindowSize from "hooks/useWindowSize";
import ModalAccess from "components/modais/modalAccess";
import CustomersAndPartners from "components/customersAndPartners";
import Blog from "components/blog";

interface Props {}

const ForProfessional: FunctionComponent<Props> = () => {
  const { width } = useWindowSize();
  const [modalAccess, setModalAccess] = useState<boolean>(false);
  const [heightSection3, setHeightSection3] = useState<any>(null);
  const [heightSection5, setHeightSection5] = useState<any>(null);

  return (
    <Container>
      <Banner
        image={bannerProfessional}
        content={
          <BannerContent padding={width > 1334 ? "" : "20px"}>
            <Row>
              <Column>
                <TitleBanner
                  size={width > 1168 ? "" : "40px"}
                  textAlign={width > 968 ? "left" : "center"}
                >
                  Proporcionamos a
                </TitleBanner>
                <TitleBanner
                  size={width > 1168 ? "" : "40px"}
                  textAlign={width > 968 ? "left" : "center"}
                >
                  voc?? mais visibilidade
                </TitleBanner>

                {width > 1040 ? (
                  <>
                    <SubTitleBanner
                      size={width > 1168 ? "" : "30px"}
                      textAlign={"left"}
                      padding={"10px 0px 0px 0px"}
                    >
                      Enquanto voc?? cuida da sa??de e do
                    </SubTitleBanner>
                    <SubTitleBanner
                      size={width > 1168 ? "" : "30px"}
                      textAlign={"left"}
                    >
                      bem-estar dos seus clientes com
                    </SubTitleBanner>
                    <SubTitleBanner
                      size={width > 1168 ? "" : "30px"}
                      textAlign={"left"}
                    >
                      qualidade, efici??ncia e seguran??a
                    </SubTitleBanner>
                  </>
                ) : width > 598 ? (
                  <SubTitleBanner
                    size={"30px"}
                    textAlign={width > 968 ? "left" : "center"}
                    padding={"10px 0px 0px 0px"}
                  >
                    Enquanto voc?? cuida da sa??de e do bem-estar dos seus
                    clientes com qualidade, efici??ncia e seguran??a
                  </SubTitleBanner>
                ) : (
                  <>
                    <SubTitleBanner
                      size={"15px"}
                      textAlign={"center"}
                      padding={"40px 0px 0px 0px"}
                    >
                      Enquanto voc?? cuida da sa??de e do
                    </SubTitleBanner>

                    <SubTitleBanner
                      padding={"0px"}
                      size={"15px"}
                      textAlign={"center"}
                    >
                      bem-estar dos seus clientes com
                    </SubTitleBanner>

                    <SubTitleBanner
                      padding={"0px"}
                      size={"15px"}
                      textAlign={"center"}
                    >
                      qualidade, efici??ncia e seguran??a
                    </SubTitleBanner>
                  </>
                )}
              </Column>

              <RegistrationFormContainer>
                <RegistrationForm type={userTypes.professional} />
              </RegistrationFormContainer>
            </Row>
          </BannerContent>
        }
      />

      <SectionContainer color={"#FFF"}>
        <SectionContent
          width={50}
          padding={
            width > 968
              ? "80px 50px"
              : width > 420
              ? "450px 50px 0px 50px"
              : "450px 20px 0px 20px"
          }
        >
          <SectionTitle fontSmall>Como me cadastrar?</SectionTitle>

          <SectionSubTitle padding={"10px 0px 40px 0px"}>
            Sem mensalidades e surpresas, veja como funciona!
          </SectionSubTitle>

          <SectionDescriptionIcon>
            <SectionIcon image={onlineRegistration} />

            <SectionDescription>
              Preencha um cadastro com os seus dados pessoais e profissionais
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"20px 0px"}>
            <SectionIcon image={personalInformation} />

            <Column gap={"5px"}>
              <SectionDescription>
                Para ter visibilidade, anexe foto e preencha um breve curr??culo
                para
              </SectionDescription>
              <SectionDescription>
                serem exibidos na plataforma
              </SectionDescription>
            </Column>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <SectionIcon image={timer} />

            <SectionDescription>
              Aguarde aprova????o do seu cadastro na maior brevidade poss??vel
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"20px 0px"}>
            <SectionIcon image={calendar} />

            <Column gap={"5px"}>
              <SectionDescription>
                Disponibilize sua agenda e pronto! Voc?? j?? pode ser selecionado
              </SectionDescription>
              <SectionDescription>
                pelos clientes. Bons atendimentos!
              </SectionDescription>
            </Column>
          </SectionDescriptionIcon>

          <SectionButtonContainer padding={"20px 0px 10px 0px"}>
            <Button
              text={"QUERO FAZER PARTE"}
              handleButton={() => setModalAccess(true)}
              color={"#8CC63F"}
              type={"green"}
              fixedWidth
            />
          </SectionButtonContainer>
        </SectionContent>

        <SectionContent
          width={50}
          contentAlign={"center"}
          padding={
            width > 968
              ? "200px 50px"
              : width > 798
              ? "450px 50px 50px 50px"
              : width > 580
              ? "50px"
              : "50px 0px"
          }
        >
          <SectionVideo />
        </SectionContent>
      </SectionContainer>

      <SectionContainer color={"#F0F0F0"}>
        {width > 798 && (
          <SectionContent width={50} padding={"0px"}>
            <SectionImage
              image={banner1}
              height={
                width > 1300
                  ? 702
                  : width > 1091
                  ? 800
                  : width > 923
                  ? 900
                  : 1030
              }
            />
          </SectionContent>
        )}

        <SectionContent
          width={50}
          padding={width > 798 ? "20px 40px 20px 20px" : "20px"}
        >
          <SectionTitle fontSmall>
            SEM SURPRESAS E COBRAN??AS PARA CADASTRAR, TESTAR E COME??AR A USAR
          </SectionTitle>

          <SectionSubTitle padding={"10px 0px 10px 0px"}>
            E quando eu come??ar a atender, pagarei alguma taxa de intermedia????o
            ?? Efetiva Sa??de?
          </SectionSubTitle>

          <SectionDescription gap={"30px"}>
            Voc?? pagar?? uma taxa de intermedia????o somente quando realizar
            atendi- mento on-line ou presencial atrav??s da Efetiva Sa??de. Dessa
            forma, se n??o houver atendimento, voc?? n??o estar?? preso a
            mensalidades ou outros compromissos financeiros. E voc?? ?? quem
            define valor, hor??rio, local e abordagem do atendimento. N??o h??
            qualquer interfer??ncia ou outras limita????es quanto aos seus m??to-
            dos e t??cnicas.
          </SectionDescription>

          <SectionDescription gap={"30px"}>
            A taxa de intermedia????o ?? de 15% (ou m??nimo de R$15), aplic??vel a
            cada atendimento. Serve para cobrir custos transacionais de cart??o
            de cr??dito ou boleto; tarifas banc??rias; manuten????o de cadastros e
            agendas de forma segura; comunica????es com ??rg??os regulat??rios;
            divulga????o e rela????es p??blicas; hospedagem, fluxo de dados e
            seguran??a do sistema; envios de SMS e e-mails para confirmar
            agendamentos e lembretes sobre o in??cio do atendimento; concep????o,
            atualiza????es e licen??as de software; entre outros.
          </SectionDescription>
        </SectionContent>

        {width <= 798 && (
          <SectionContent width={50} padding={"0px"}>
            <SectionImage image={banner1} height={316} />
          </SectionContent>
        )}
      </SectionContainer>

      <SectionContainer color={"#FFF"}>
        <SectionContent
          width={50}
          ref={(e) => setHeightSection3(e?.clientHeight)}
          padding={"40px 20px 20px 20px"}
        >
          <SectionTitle fontSmall>
            GERENCIE SEU TEMPO, SUA AGENDA E CADASTRE SEUS CLIENTES
          </SectionTitle>

          <SectionSubTitle padding={"10px 0px 10px 0px"}>
            Posso acessar o sistema completo para controle dos meus pacientes
            sem precisar atender pela Efetiva Sa??de?
          </SectionSubTitle>

          <SectionDescription gap={"30px"}>
            Sim! Se voc?? j?? tem agenda cheia ou prefere o atendimento
            presencial, sem a intermedia????o da Efetiva Sa??de, voc?? tamb??m pode
            ter acesso ao sistema completo para cadastrar pacientes; agendar
            atendimentos; receber dash- boards com controles financeiro e por
            sess??es; criar e armazenar prontu??rio eletr??nico, ficha de anamnese,
            relat??rios em ambiente seguro e criptografado; receber notifica????es
            por SMS ou e-mail confirmando e lembrando agenda- mentos, entre
            outros.
          </SectionDescription>

          <SectionDescription gap={"30px"}>
            Para preservar a alta qualidade, confidencialidade e manter a
            plataforma moderna, criamos a seguinte op????o: voc?? pode cadastrar
            seus clientes do consult??rio, sem custo, sempre que disponibilizar
            na plataforma pelo menos 4 hor??rios de 50min por semana ou realizar
            pelo menos 1 atendimento por semana.
          </SectionDescription>

          <SectionDescription gap={"30px"}>
            Queremos te proporcionar mais visibilidade e te ajudar a cuidar da
            sa??de e do bem-estar dos seus clientes, com mais praticidade e
            conveni??ncia.
          </SectionDescription>

          <SectionDescription gap={"30px"}>
            Entretanto, se n??o disponibilizar hor??rios ou realizar atendimentos
            pela Efetiva Sa??de, a cada 30 dias, voc?? ter?? o custo de R$45 pelo
            m??s utilizado.Esse valor poder?? ser pago por meio de cart??o de
            cr??dito, pix ou boleto banc??rio.
          </SectionDescription>

          <SectionButtonContainer padding={"40px 0px 40px 0px"}>
            <Button
              text={"CADASTRE-SE E GERENCIE SEU CONSULT??RIO"}
              fontSmall
              handleButton={() => setModalAccess(true)}
              color={"#8CC63F"}
              type={"green"}
            />
          </SectionButtonContainer>
        </SectionContent>

        <SectionContent
          width={50}
          height={width > 798 ? heightSection3 : 316}
          padding={width > 798 ? "40px 0px 0px 0px" : "0px"}
        >
          <SectionImage image={banner2} height={heightSection3 - 200} />
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <Blog />
      </SectionContainer>

      <SectionContainer center column color={"#FFF"}>
        {width > 798 ? (
          <>
            <SectionTitle center fontSmall padding={"40px 20px 10px 20px"}>
              PLATAFORMA IDEALIZADA E CRIADA
            </SectionTitle>
            <SectionTitle center fontSmall padding={"0px 20px 40px 20px"}>
              POR PROFISSIONAL DE SA??DE PARA PROFISSIONAIS DE SA??DE!
            </SectionTitle>
          </>
        ) : (
          <SectionTitle center fontSmall padding={"40px 20px"}>
            PLATAFORMA IDEALIZADA E CRIADA POR PROFISSIONAL DE SA??DE PARA
            PROFISSIONAIS DE SA??DE!
          </SectionTitle>
        )}

        <SectionRow>
          <SectionContent
            width={50}
            height={width > 798 ? heightSection5 : 333}
            padding={"0px"}
          >
            <SectionImage image={banner3} height={heightSection5 - 200} />
          </SectionContent>

          <SectionContent
            width={50}
            ref={(e) => setHeightSection5(e?.clientHeight)}
            padding={"0px 20px 20px 20px"}
          >
            <SectionDescriptionIcon padding={"10px 0px"}>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Sem mensalidades e voc?? define valor, hor??rio, local e aborda-
                gem do atendimento
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Aumente sua visibilidade e seja descoberto por novos clientes
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px"}>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Receba com seguran??a pagamentos por cart??o ou boleto
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Envio de mensagens para confirmar agendamentos e pagamentos
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px"}>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Praticidade, Conforto e Seguran??a das Informa????es
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Utilize de forma simples e intuitiva, pelo computador, tablet ou
                celular
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px"}>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Seguran??a de dados cadastrais e acesso restrito aos atendimentos
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                M??dulo de videochamada pr??prio com criptografia de ponta a
                ponta, sem vulnerabilidades das redes sociais
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px"}>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Prontu??rio e anamnese em ambiente exclusivo ao profissional
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Envio de notas fiscais ou recibos ao paciente pela plataforma
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px"}>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Gest??o virtual de cadastros, agenda e pagamentos
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon>
              <DotGreen />

              <SectionDescription gap={width > 468 ? "30px" : "20px"}>
                Cuide de seus clientes e deixe a Efetiva Sa??de cuidar da parte
                administrativa
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionButtonContainer padding={"40px 0px 40px 0px"}>
              <Button
                text={"CADASTRE-SE AGORA MESMO"}
                handleButton={() => setModalAccess(true)}
                color={"#8CC63F"}
                type={"green"}
              />
            </SectionButtonContainer>
          </SectionContent>
        </SectionRow>
      </SectionContainer>

      <SectionContainer noBoxShadow>
        <CustomersAndPartners />
      </SectionContainer>

      {modalAccess && (
        <ModalAccess
          type={2}
          open={modalAccess}
          close={() => setModalAccess(false)}
        />
      )}
    </Container>
  );
};

export default ForProfessional;
