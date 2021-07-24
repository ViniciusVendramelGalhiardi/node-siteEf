import React, { useState, FunctionComponent } from "react";

import {
  Container,
  Row,
  Column,
  RegistrationFormContainer,
  DotGreen,
  SectionCard,
  SectionCardTitleContainer,
  SectionCardTitle,
  SectionCardDescription,
} from "../styles";

import bannerCompany from "assets/images/banners/bannerCompany.png";
import hero from "assets/images/png/hero.png";
import banner4 from "assets/images/png/banner4.png";
import Banner from "components/banner";
import onlineRegistration from "assets/icons/png/onlineRegistration.png";
import personalInformation from "assets/icons/png/personalInformation.png";
import timer from "assets/icons/png/timer.png";
import calendar from "assets/icons/png/calendarBlue.png";

import {
  BannerContent,
  SubTitleBanner,
  TitleBanner,
  SectionContainer,
  SectionContent,
  SectionSubTitle,
  SectionTitle,
  SectionDescriptionIcon,
  SectionIcon,
  SectionDescription,
  SectionButtonContainer,
  SectionVideo,
  SectionImage,
  SectionRow,
  Center,
} from "styles";
import RegistrationForm from "components/registrationForm";
import ModalAccess from "components/modais/modalAccess";
import { userTypes } from "config/contants";
import useWindowSize from "hooks/useWindowSize";
import Button from "components/button";
import CustomersAndPartners from "components/customersAndPartners";
import Blog from "components/blog";

interface Props {}

const ForCompany: FunctionComponent<Props> = () => {
  const { width } = useWindowSize();
  const [modalAccess, setModalAccess] = useState<boolean>(false);

  return (
    <Container>
      <Banner
        image={bannerCompany}
        content={
          <BannerContent padding={width > 1334 ? "" : "20px"}>
            <Row>
              <Column>
                {width > 598 ? (
                  <>
                    <TitleBanner
                      size={width > 1168 ? "" : "40px"}
                      textAlign={width > 968 ? "left" : "center"}
                    >
                      Cuide do bem-estar
                    </TitleBanner>
                    <TitleBanner
                      size={width > 1168 ? "" : "40px"}
                      textAlign={width > 968 ? "left" : "center"}
                    >
                      dos seus colaboradores
                    </TitleBanner>
                  </>
                ) : (
                  <TitleBanner
                    size={width > 1168 ? "" : "40px"}
                    textAlign={width > 968 ? "left" : "center"}
                  >
                    Cuide do bem-estar dos seus colaboradores
                  </TitleBanner>
                )}

                {width > 1040 ? (
                  <>
                    <SubTitleBanner
                      size={width > 1168 ? "" : "30px"}
                      textAlign={"left"}
                      padding={"10px 0px 0px 0px"}
                    >
                      Assim estará cuidando da saúde do
                    </SubTitleBanner>
                    <SubTitleBanner
                      size={width > 1168 ? "" : "30px"}
                      textAlign={"left"}
                      padding={"0px"}
                    >
                      seu negócio
                    </SubTitleBanner>
                  </>
                ) : width > 598 ? (
                  <SubTitleBanner
                    size={"30px"}
                    textAlign={width > 968 ? "left" : "center"}
                    padding={"10px 0px 0px 0px"}
                  >
                    Assim estará cuidando da saúde do seu negócio
                  </SubTitleBanner>
                ) : (
                  <>
                    <SubTitleBanner
                      size={"15px"}
                      textAlign={"center"}
                      padding={"40px 0px 0px 0px"}
                    >
                      Assim estará cuidando
                    </SubTitleBanner>

                    <SubTitleBanner
                      padding={"0px"}
                      size={"15px"}
                      textAlign={"center"}
                    >
                      da saúde do seu negócio
                    </SubTitleBanner>
                  </>
                )}
              </Column>

              <RegistrationFormContainer>
                <RegistrationForm type={userTypes.company} />
              </RegistrationFormContainer>
            </Row>
          </BannerContent>
        }
      />

      <SectionContainer color={"#FFF"}>
        <SectionContent
          width={60}
          padding={
            width > 968
              ? "80px 50px"
              : width > 420
              ? "400px 50px 0px 50px"
              : "400px 20px 0px 20px"
          }
        >
          <SectionTitle fontSmall>
            MELHORE O CLIMA ORGANIZACIONAL, INCREMENTE O ORGULHO CORPORATIVO,
            ESTIMULE ENGAJAMENTO E AJUDE A DESENVOLVER LIDERANÇAS.
          </SectionTitle>

          <SectionSubTitle
            padding={"10px 0px 40px 0px"}
            lineHeight={width > 798 ? "32px" : "20px"}
          >
            Cuidar preventivamente reduz gastos com sinistralidade e diminui
            afastamentos por depressão, ansiedade, burn out, veja como funciona!
          </SectionSubTitle>

          <SectionDescriptionIcon>
            <SectionIcon image={onlineRegistration} />

            <SectionDescription>
              Preencha um cadastro com os dados da sua empresa. Entraremos em
              contato na maior brevidade possível.
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"20px 0px"}>
            <SectionIcon image={personalInformation} />

            <SectionDescription>
              Firmada nossa parceria, sua empresa poderá anexar logomarca e um
              breve descritivo para serem exibidos aos colaboradores em nossa
              plataforma.
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <SectionIcon image={timer} />

            <SectionDescription>
              Selecione o perfil dos profissionais da nossa base que atenderão
              sua empresa, por abordagem, valor de atendimento, plano de saúde,
              entre outros
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"20px 0px"}>
            <SectionIcon image={calendar} />

            <SectionDescription>
              Pronto! Seus colaboradores poderão acessar a plataforma e cuidar
              da saúde mental e bem-estar. Sucesso!
            </SectionDescription>
          </SectionDescriptionIcon>

          {width <= 798 && (
            <SectionButtonContainer padding={"30px 0px 10px 0px"}>
              <Button
                text={"QUERO FAZER PARTE"}
                handleButton={() => setModalAccess(true)}
                color={"#8CC63F"}
                type={"green"}
                fixedWidth
              />
            </SectionButtonContainer>
          )}
        </SectionContent>

        <SectionContent
          width={40}
          contentAlign={"center"}
          padding={
            width > 968
              ? "200px 50px 50px 50px"
              : width > 798
              ? "400px 50px 50px 50px"
              : width > 580
              ? "50px"
              : "50px 0px"
          }
        >
          <SectionVideo />

          {width > 798 && (
            <SectionButtonContainer padding={"100px 0px 10px 0px"}>
              <Button
                text={"SOLICITE NOSSO CONTATO"}
                handleButton={() => setModalAccess(true)}
                color={"#8CC63F"}
                type={"green"}
                fixedWidth
              />
            </SectionButtonContainer>
          )}
        </SectionContent>
      </SectionContainer>

      <SectionContainer center column color={"#F0F0F0"}>
        {width > 798 ? (
          <>
            <SectionTitle center fontSmall padding={"40px 20px 10px 20px"}>
              MANEIRAS DE CUIDAR DA SAÚDE E
            </SectionTitle>
            <SectionTitle center fontSmall padding={"0px 20px 20px 20px"}>
              BEM-ESTAR DOS COLABORADORES
            </SectionTitle>
          </>
        ) : (
          <SectionTitle center fontSmall padding={"40px 20px 20px 20px"}>
            MANEIRAS DE CUIDAR DA SAÚDE E BEM-ESTAR DOS COLABORADORES
          </SectionTitle>
        )}

        <SectionSubTitle center={width <= 798} padding={"0px 20px 40px 20px"}>
          Inclusive sem custos para a empresa, veja como funciona!
        </SectionSubTitle>

        <SectionRow gap={"20px"} forceColumn center padding={"20px"}>
          <SectionCard left>
            <SectionCardTitleContainer left>
              <SectionCardTitle left bold size={"18px"}>
                ATRAVÉS DE INCENTIVO AOS COLABORADORES
              </SectionCardTitle>

              <SectionCardTitle left size={"16px"}>
                Não há necessidade de suporte financeiro
              </SectionCardTitle>
            </SectionCardTitleContainer>

            <SectionDescriptionIcon padding={"40px 0px 0px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Comece alertando sobre importância dos colaboradores manterem
                saúde e bem-estar
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Disponibilize profissionais da nossa base utilizando filtros por
                especialidade, localização ou valor de atendimento
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Se possível, ofereça um pequeno ambiente privado para aos
                colaboradores realizarem os atendimentos
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Acolha um horário semanal para realização dos atendimentos (em
                média 50 minutos)
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Aos executivos da sua empresa, eleja profissionais da nossa base
                com ampla experiência, extensa formação acadêmica e que ofereçam
                desconto a colaboradores de empresas parceiras
              </SectionCardDescription>
            </SectionDescriptionIcon>
          </SectionCard>

          <SectionCard>
            <SectionCardTitleContainer>
              <SectionCardTitle bold size={"18px"}>
                ATRAVÉS DO PLANO DE SAÚDE
              </SectionCardTitle>

              <SectionCardTitle size={"16px"}>
                Sem custos adicionais ou impacto em sinistralidade
              </SectionCardTitle>
            </SectionCardTitleContainer>

            <SectionDescriptionIcon padding={"40px 0px 0px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Evidencie aos seus colaboradores a atenção da empresa por saúde
                e bem estar, propagando o uso da plataforma sem custos aos
                beneficiários do plano de saúde
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Filtre na plataforma os profissionais da nossa base que atendam
                pelo plano de saúde da sua empresa
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Demonstre a inquietação da empresa para mitigar acidentes,
                afastamentos ou situações de burn out e depressão
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px"}>
              <DotGreen />

              <SectionCardDescription>
                Gere valor e orgulho corporativo estendendo os cuidados aos
                dependentes dos colaboradores, observadas as regras do plano de
                saúde e a respectiva sinistralidade
              </SectionCardDescription>
            </SectionDescriptionIcon>
          </SectionCard>

          <SectionCard right>
            <SectionCardTitleContainer right>
              <SectionCardTitle right bold size={"18px"}>
                ATRAVÉS DE UM SUBSÍDIO CORPORATIVO
              </SectionCardTitle>

              <SectionCardTitle right size={"16px"}>
                Pode ser parcial ou total e pelo período que desejar
              </SectionCardTitle>
            </SectionCardTitleContainer>

            <SectionDescriptionIcon padding={"40px 0px 0px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Em situações específicas, ampare os colaboradores que precisam
                de cuidados com saúde e bem-estar
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Filtre alguns profissionais da nossa base para atender sua
                empresa de forma recorrente e que ofereçam desconto a empresas
                parceiras
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Selecione por abordagem, localização, valor de atendimento ou
                maior/menor experiencia e formação acadêmica
              </SectionCardDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"0px 0px 10px 0px"}>
              <DotGreen />

              <SectionCardDescription>
                Escolha entre oferecer subsídio parcial ou integral; fixo ou
                variável; por colaborador ou para um grupo de pessoas. A sua
                empresa decide sobre valores de atendimento são compatíveis com
                seu negócio
              </SectionCardDescription>
            </SectionDescriptionIcon>
          </SectionCard>
        </SectionRow>

        <SectionButtonContainer
          padding={width > 798 ? "0px 0px 40px 0px" : "40px 0px"}
        >
          <Button
            text={"SOLICITE NOSSO CONTATO"}
            handleButton={() => setModalAccess(true)}
            color={"#8CC63F"}
            type={"green"}
          />
        </SectionButtonContainer>
      </SectionContainer>

      <SectionContainer color={"#FFF"}>
        {width > 798 && (
          <SectionContent
            width={50}
            padding={width > 798 ? "40px 0px 20px 0px" : "0px"}
          >
            <SectionImage image={hero} height={460} />
          </SectionContent>
        )}

        <SectionContent
          width={50}
          padding={width > 1352 ? "40px 40px 20px 40px" : "40px 20px 20px 20px"}
        >
          <SectionTitle center={width < 798} fontSmall>
            PRATICIDADE, CONFORTO E SEGURANÇA DAS INFORMAÇÕES
          </SectionTitle>

          <Center>
            <SectionSubTitle center={width < 798} padding={"10px 0px 10px 0px"}>
              Sistema seguro de videochamada
            </SectionSubTitle>
          </Center>

          <SectionDescription center={width < 798} gap={"30px"}>
            A Efetiva Saúde utiliza um sistema de videochamada próprio e
            criptografado, para garantir todo sigilo e segurança que um
            atendimento de saúde exige. Seus colaboradores não ficarão
            vulneráveis nos aplicativos tradicionais das redes sociais.
          </SectionDescription>

          <SectionDescription center={width < 798} gap={"30px"}>
            Todas as videochamadas são criptografadas de ponta a ponta para
            segurança de dados. Gravações ou compartilhamentos não são
            permitidos.
          </SectionDescription>

          <SectionButtonContainer padding={"40px 0px 40px 0px"}>
            <Button
              text={"SOLICITE NOSSO CONTATO"}
              handleButton={() => setModalAccess(true)}
              color={"#8CC63F"}
              type={"green"}
            />
          </SectionButtonContainer>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <Blog />
      </SectionContainer>

      <SectionContainer color={"#FFF"}>
        <SectionContent
          width={50}
          padding={width > 798 ? "50px 20px 20px 20px" : "20px 0px 0px 0px"}
        >
          <SectionImage
            image={banner4}
            height={width > 798 ? 800 : 525}
            contain
          />
        </SectionContent>

        <SectionContent width={50} padding={"50px 20px 20px 20px"}>
          <SectionTitle fontSmall>
            DEIXE QUE A EFETIVA SAÚDE AJUDE A CUIDAR DA SAÚDE MENTAL E BEM-ESTAR
            DOS SEUS COLABORADORES!
          </SectionTitle>

          <SectionSubTitle padding={"10px 0px 10px 0px"}>
            As empresas têm acesso:
          </SectionSubTitle>

          <SectionDescriptionIcon padding={"10px 0px"}>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Perfil na Busca do Profissional
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Seleção de profissionais por abordagem, valor de atendimento,
              plano de saúde etc.
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"10px 0px"}>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Envios de SMS ou e-mail aos colaboradores para confirmar
              agendamentos e lembretes sobre o início do atendimento
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Zero custo ou Opção por investimento mensal fixo ou variável, por
              colaborador ou para um grupo de pessoas
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"10px 0px"}>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Gestão Virtual do número de atendimentos, pagamento particular ou
              por plano de saúde, filtros por Colaboradores e por Profissionais
              de Saúde
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Manutenção de dados cadastrais, dos colaboradores e da empresa, em
              plataforma segura e criptografada
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"10px 0px"}>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Suporte por e-mail
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Acesso ao blog com notícias e conteúdo técnico de saúde e
              bem-estar
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"10px 0px"}>
            <DotGreen />

            <SectionDescription gap={width > 468 ? "30px" : "20px"}>
              Entre outros benefícios
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionButtonContainer padding={"40px 0px 40px 0px"}>
            <Button
              text={"SOLICITE NOSSO CONTATO"}
              handleButton={() => setModalAccess(true)}
              color={"#8CC63F"}
              type={"green"}
            />
          </SectionButtonContainer>
        </SectionContent>
      </SectionContainer>

      <SectionContainer noBoxShadow>
        <CustomersAndPartners />
      </SectionContainer>

      {modalAccess && (
        <ModalAccess
          type={3}
          open={modalAccess}
          close={() => setModalAccess(false)}
        />
      )}
    </Container>
  );
};

export default ForCompany;
