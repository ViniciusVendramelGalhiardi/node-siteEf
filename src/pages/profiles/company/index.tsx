import React, { useState, useEffect, FunctionComponent } from "react";

import {
  Container,
  BannerContent,
  ProfileImage,
  Text,
  Section,
  Row,
  Column,
  SectionVideo,
} from "./styles";

import bannerCompany from "assets/images/banners/photo-of-people-holding-each-other-s-hands-3184436.png";
import Banner from "components/banner";
import useWindowSize from "hooks/useWindowSize";
import ProfessionalCards from "components/professionalCards";

interface Props {}

const CompanyProfile: FunctionComponent<Props> = ({}) => {
  const { width } = useWindowSize();
  const [company, setCompany] = useState({
    id: 1,
    image:
      "http://logosaude.com.br/wp-content/uploads/2017/08/logoffffooter.png",
    name: "Profile Name",
    activity: "Clínica Psicológica",
  });
  const [professionals, setProfessionals] = useState([
    {
      id: 1,
      name: "Marcelo Alburque",
      crp: "04/2334",
      price: 100,
      image:
        "https://assets-br.wemystic.com.br/20191113010228/homem-capri-850x640.jpg",
    },
    {
      id: 2,
      name: "Rosana Cotton",
      crp: "02/5568",
      price: 150,
      image:
        "https://s2.glbimg.com/diAlEh7oiZxhtPxdjZudAHG6wK4=/620x430/e.glbimg.com/og/ed/f/original/2018/03/27/alessandra-bomura-perfil.jpg",
    },
    {
      id: 3,
      name: "Paulo Ramiro",
      crp: "06/2290",
      price: 200,
      image:
        "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70",
    },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container>
      <Banner
        image={bannerCompany}
        content={
          <BannerContent padding={"20px"}>
            <ProfileImage image={company.image} />

            {width > 598 && (
              <>
                <Text
                  color={"#FFF"}
                  size={"30px"}
                  bold
                  padding={"20px 0px 0px 0px"}
                >
                  {company.name}
                </Text>

                <Text color={"#FFF"} size={"13px"} padding={"0px"}>
                  {company.activity}
                </Text>
              </>
            )}
          </BannerContent>
        }
      />

      <Section
        padding={
          width > 1175
            ? "50px 10px 30px 10px"
            : width > 598
            ? "50px 10px"
            : "0px"
        }
        center={width <= 598}
      >
        <Row>
          {width <= 598 && (
            <Section center={width <= 598}>
              <Text
                color={"#002464"}
                bold
                size={"20px"}
                padding={"0px 20px 20px 20px"}
                center={true}
              >
                Um pouco sobre nós
              </Text>
            </Section>
          )}

          <Column
            width={50}
            center
            padding={width > 598 ? "" : "20px 20px 50px 20px"}
          >
            <SectionVideo />
          </Column>

          <Column width={50}>
            {width > 598 && (
              <Section center={width <= 598}>
                <Text color={"#002464"} bold size={"25px"} padding={"20px"}>
                  Um pouco sobre nós
                </Text>
              </Section>
            )}

            <Text
              color={"#797979"}
              size={"15px"}
              padding={"0px 20px 40px 20px"}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing
            </Text>
          </Column>
        </Row>
      </Section>

      <Section
        padding={
          width > 1175
            ? "50px 10px 30px 10px"
            : width > 798
            ? "50px 10px"
            : "0px"
        }
        center={width <= 598}
      >
        <Text
          color={"#797979"}
          bold
          size={"16px"}
          padding={width > 598 ? "0px 50px 30px 100px" : "0px 10px 20px 10px"}
          center={width <= 598}
        >
          Profissionais de Saúde e Bem-Estar que Atendem a Empresa
        </Text>

        <ProfessionalCards professionals={professionals} />
      </Section>
    </Container>
  );
};

export default CompanyProfile;
