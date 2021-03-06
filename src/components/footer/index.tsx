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
            Caso esteja passando por um momento cr??tico, emergencial, esteja em
            situa????o de viola????o de direitos, desastre ou viol??ncia, procure
            atendimento presencial em car??ter de urg??ncia e ligue para os
            servi??os emergenciais de sua cidade, Servi??o de Atendimento M??vel de
            Urg??ncia (SAMU), n??mero 192 ou procure um hospital mais pr??ximo.
          </TextTop>

          <TextTop>
            Se houver idea????o suicida, marque uma consulta presencial em car??ter
            de urg??ncia e ligue para o Centro de Valoriza????o da Vida (CVV),
            n??mero 188 (ou 141 nos estados da Bahia, Maranh??o, Par?? e Paran??).
          </TextTop>

          <TextTop>
            V??timas de agress??o contra a mulher devem procurar assist??ncia nas
            Delegacias de Defesa da Mulher, na Casa da Mulher Brasileira, nos
            Centros de Acolhimento de sua cidade, ou acesse o site
            www.gov.br/mdh. O atendimento on-line n??o ?? indicado para nenhum
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

            <SubTitle pointer>Saiba Mais sobre a Efetiva Sa??de</SubTitle>

            <SubTitle pointer>Perguntas Frequentes</SubTitle>

            <Line />

            <SubTitle pointer>C??digo de ??tica do CRP</SubTitle>

            <SubTitle pointer>Cadastro e-Psi</SubTitle>

            <SubTitle pointer>Conselho Federal de Psicologia (CFP)</SubTitle>

            <SubTitle pointer>
              Estatuto da Crian??a e do Adolescente (ECA)
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
                ?? 2020 Efetiva Sa??de - All rights reserved
              </SubTitle>

              <SubTitle small>Efetiva Servi??os de Sa??de Ltda.</SubTitle>

              <SubTitle small>CNPJ: 37.124.428/0001-56</SubTitle>

              <SubTitle small>
                Cadastro Nacional de Estabelecimentos de Sa??de (CNES) 0278955
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
                ?? 2021 Efetiva Sa??de - Todos os Direitos Reservados
              </SubTitle>

              <SubTitle small>Efetiva Servi??os de Sa??de Ltda.</SubTitle>

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
              Termos e Condi????es
            </TermsAndConditionsText>
            <TermsAndConditionsText>|</TermsAndConditionsText>
            <TermsAndConditionsText pointer>
              Pol??tica de Privacidade
            </TermsAndConditionsText>
          </TermsAndConditionsWeb>
        </BoxSecurity>

        <TermsAndConditionsMobile>
          <TermsAndConditionsText small pointer onClick={() => setOpen(true)}>
            Termos de Uso
          </TermsAndConditionsText>
          <TermsAndConditionsText>|</TermsAndConditionsText>
          <TermsAndConditionsText small pointer>
            Pol??tica de Privacidade
          </TermsAndConditionsText>
        </TermsAndConditionsMobile>
      </Wrapper>

      <Modal
        title={"Termos de Uso e Presta????o de Servi??o"}
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
