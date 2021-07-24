import React, { useState, FunctionComponent } from "react";

import {
  Container,
  Text,
  Section,
  CardsContainer,
  CardsBottom,
  Cards,
  Card,
} from "./styles";

import { useNavigate } from "react-router-dom";

import useWindowSize from "hooks/useWindowSize";
import Button from "components/button";

interface Props {}

const CustomersAndPartners: FunctionComponent<Props> = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "",
      image:
        "http://logosaude.com.br/wp-content/uploads/2017/08/logoffffooter.png",
    },
    {
      id: 2,
      name: "",
      image:
        "https://www.agenciavisiondesign.com.br/wp-content/uploads/2018/02/thumb-agencia-vision-design-logo-consulta-saude.jpg",
    },
    {
      id: 3,
      name: "",
      image: "https://encontresaude.com.br/static/media/logo.254e9247.png",
    },
    {
      id: 4,
      name: "",
      image:
        "https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2018%2F10%2F15%2F11%2FLogo-247416_395840_115404342_414483699.jpg",
    },
  ]);

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const handleToProfile = (id: number) => {
    navigate(`/perfil-empresa/${id}`);
  };

  return (
    <Container>
      <Section center padding={"70px 20px"} color={"#395785"}>
        <Text
          family={"Montserrat"}
          color={"#FFF"}
          bold
          size={width > 598 ? "35px" : "20px"}
          padding={width > 798 ? "0px 0px 20px 0px" : "0px"}
          center
        >
          CLIENTES E PARCEIROS
        </Text>

        {width > 798 && (
          <>
            <Text
              family={"Muli"}
              color={"#FFF"}
              size={"23px"}
              padding={"0px 0px 40px 0px"}
              center
            >
              Lorem Ipsum is simply dummy text
            </Text>

            <Text
              family={"Muli"}
              color={"#FFF"}
              size={"17px"}
              padding={
                width > 1358 ? "0px 400px 40px 400px" : "0px 100px 40px 100px"
              }
              center
              lineHeight
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum. Web page editors now use Lorem Ipsum
              as their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes ...
            </Text>

            <Button
              width={"169px"}
              text={"LER MAIS..."}
              handleButton={() => {}}
              color={"#8CC63F"}
              type={"green"}
            />
          </>
        )}
      </Section>

      <Section
        center
        color={"#395785"}
        padding={width > 798 ? "" : "0px 0px 70px 0px"}
      >
        <CardsContainer>
          <Cards>
            {companies.map((company) => (
              <Card
                key={company.id}
                image={company.image}
                onClick={() => handleToProfile(company.id)}
              />
            ))}
          </Cards>
        </CardsContainer>

        {width > 798 && <CardsBottom />}
      </Section>
    </Container>
  );
};

export default CustomersAndPartners;
