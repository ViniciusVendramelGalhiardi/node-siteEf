import React, { useState, useEffect, useMemo, FunctionComponent } from "react";

import {
  Container,
  WrapperTop,
  ContentTop,
  TextTop,
  Wrapper,
  BoxLinks,
  Box,
  Title,
  SubTitle,
  Line,
  BoxSecurity,
  Security,
  SecurityImage,
  PaymentMethod,
  Method,
  TermsAndConditionsWeb,
  TermsAndConditionsMobile,
  TermsAndConditionsText,
  CopyrightWeb,
  CopyrightMobile,
} from "./styles";

import { useLocation } from "react-router-dom";

import truste from "../../assets/images/security/truste.png";
import googleSafe from "../../assets/images/security/googleSafe.png";
import hackerSafe from "../../assets/images/security/hackerSafe.png";

import visa from "../../assets/images/paymentMethods/visa.png";
import mastercard from "../../assets/images/paymentMethods/mastercard.png";
import boleto from "../../assets/images/paymentMethods/boleto.png";
import amex from "../../assets/images/paymentMethods/amex.png";
import Logo from "assets/svg/logo";
import SocialNetworks from "components/socialNetworks";
import AppStores from "components/appStores";
import Modal from "components/modais/modal";
import Button from "components/button";
import useWindowSize from "hooks/useWindowSize";

interface OwnProps {}

type Props = OwnProps;

const paymentMethods = [
  { image: visa, width: "35px" },
  { image: mastercard, width: "60px" },
  { image: boleto, width: "45px" },
  { image: amex, width: "45px" },
];

const Footer: FunctionComponent<Props> = (props) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();

  const backgroundColorInfo = useMemo(() => {
    if (location.pathname === "/minha-conta") {
      return "#F0F0F0";
    } else {
      return "#FFF";
    }
  }, [location]);

  const display = useMemo(() => {
    if (location.pathname === "/atendimento-online") {
      return true;
    } else {
      return false;
    }
  }, [location]);

  useEffect(() => {}, []);

  return (
    <Container display={display}>
      <WrapperTop color={backgroundColorInfo}>
        <ContentTop flex={1} gap={"30px"}>
          <Logo large={width > 468} />

          <AppStores />

          <SocialNetworks />
        </ContentTop>

        <ContentTop flex={2} gap={"10px"}>
          <TextTop>
            Caso esteja passando por um momento crítico, emergencial, esteja em
            situação de violação de direitos, desastre ou violência, procure
            atendimento presencial em caráter de urgência e ligue para os
            serviços emergenciais de sua cidade, Serviço de Atendimento Móvel de
            Urgência (SAMU), número 192 ou procure um hospital mais próximo.
          </TextTop>

          <TextTop>
            Se houver ideação suicida, marque uma consulta presencial em caráter
            de urgência e ligue para o Centro de Valorização da Vida (CVV),
            número 188 (ou 141 nos estados da Bahia, Maranhão, Pará e Paraná).
          </TextTop>

          <TextTop>
            Vítimas de agressão contra a mulher devem procurar assistência nas
            Delegacias de Defesa da Mulher, na Casa da Mulher Brasileira, nos
            Centros de Acolhimento de sua cidade, ou acesse o site
            www.gov.br/mdh. O atendimento on-line não é indicado para nenhum
            desses casos.
          </TextTop>
        </ContentTop>
      </WrapperTop>

      <Wrapper>
        <BoxLinks>
          <Box>
            <Title bottom={"15px"}>LINKS</Title>

            <SubTitle pointer invisibleMobile onClick={() => setOpen(true)}>
              Termos de Uso
            </SubTitle>

            <SubTitle pointer>Saiba Mais sobre a Efetiva Saúde</SubTitle>

            <SubTitle pointer>Perguntas Frequentes</SubTitle>

            <Line />

            <SubTitle pointer>Código de Ética do CRP</SubTitle>

            <SubTitle pointer>Cadastro e-Psi</SubTitle>

            <SubTitle pointer>Conselho Federal de Psicologia (CFP)</SubTitle>

            <SubTitle pointer>
              Estatuto da Criança e do Adolescente (ECA)
            </SubTitle>

            <PaymentMethod>
              {paymentMethods.map((method) => (
                <Method
                  key={method.image}
                  image={method.image}
                  width={method.width}
                />
              ))}
            </PaymentMethod>

            <CopyrightWeb>
              <SubTitle small>
                © 2020 Efetiva Saúde - All rights reserved
              </SubTitle>

              <SubTitle small>Efetiva Serviços de Saúde Ltda.</SubTitle>

              <SubTitle small>CNPJ: 37.124.428/0001-56</SubTitle>

              <SubTitle small>
                Cadastro Nacional de Estabelecimentos de Saúde (CNES) 0278955
              </SubTitle>
            </CopyrightWeb>
          </Box>

          <Box>
            <Title bottom={"2px"}>FALE CONOSCO</Title>

            <SubTitle marginBottom>contato@efetivasaude.com.br</SubTitle>

            <Title bottom={"2px"}>IMPRENSA</Title>

            <SubTitle>imprensa@efetivasaude.com.br</SubTitle>
          </Box>

          <Box topMobile>
            <Title bottom={"2px"}>PARA PROFISSIONAIS</Title>

            <SubTitle pointer marginBottom>
              Como me cadastrar?
            </SubTitle>

            <Title bottom={"2px"}>PARA EMPRESAS</Title>

            <SubTitle pointer marginBottom>
              Entre em contato agora
            </SubTitle>

            <CopyrightMobile>
              <SubTitle small>
                © 2021 Efetiva Saúde - Todos os Direitos Reservados
              </SubTitle>

              <SubTitle small>Efetiva Serviços de Saúde Ltda.</SubTitle>

              <SubTitle small>CNPJ: 37.124.428/0001-56</SubTitle>

              <SubTitle small>Cadastro Nacional CNES: 0278955</SubTitle>
            </CopyrightMobile>
          </Box>
        </BoxLinks>

        <BoxSecurity>
          <Security>
            <SecurityImage image={truste} />
          </Security>

          <Security>
            <SecurityImage image={googleSafe} />
          </Security>

          <Security>
            <SecurityImage image={hackerSafe} />
          </Security>

          <TermsAndConditionsWeb>
            <TermsAndConditionsText pointer>
              Termos e Condições
            </TermsAndConditionsText>
            <TermsAndConditionsText>|</TermsAndConditionsText>
            <TermsAndConditionsText pointer>
              Política de Privacidade
            </TermsAndConditionsText>
          </TermsAndConditionsWeb>
        </BoxSecurity>

        <TermsAndConditionsMobile>
          <TermsAndConditionsText small pointer onClick={() => setOpen(true)}>
            Termos de Uso
          </TermsAndConditionsText>
          <TermsAndConditionsText>|</TermsAndConditionsText>
          <TermsAndConditionsText small pointer>
            Política de Privacidade
          </TermsAndConditionsText>
        </TermsAndConditionsMobile>
      </Wrapper>

      <Modal
        title={"Termos de Uso e Prestação de Serviço"}
        open={open}
        close={() => setOpen(false)}
        content={<div>Coloque o conteudo aqui</div>}
        buttons={
          <Button
            fixedWidth
            text={"Fechar"}
            handleButton={() => setOpen(false)}
          />
        }
      />
    </Container>
  );
};

export default Footer;
