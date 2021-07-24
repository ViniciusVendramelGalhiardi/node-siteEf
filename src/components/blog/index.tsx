import React, { FunctionComponent } from "react";

import { Container, Text, Section } from "./styles";

import Button from "components/button";

interface Props {}

const Blog: FunctionComponent<Props> = () => {
  const handleToBlog = () => {
    window.open("https://efetivasaude.blog/", "_blank");
  };

  return (
    <Container>
      <Section center padding={"40px 0px"} color={"#F0F0F0"}>
        <Text family={"Montserrat"} color={"#12151d"} bold size={"35px"} center>
          BLOG, NOTÍCIAS E NOVIDADES
        </Text>

        <Text
          family={"Muli"}
          color={"#12151d"}
          bold
          size={"23px"}
          padding={"30px 0px 30px 0px"}
          center
        >
          Lorem Ipsum is simply dummy text
        </Text>

        <Text family={"Muli"} color={"#12151d"} size={"17px"} center>
          It is a long established fact that a reader will be distracted by the
          readable
        </Text>
        <Text
          family={"Muli"}
          color={"#12151d"}
          size={"17px"}
          center
          padding={"0px 0px 30px 0px"}
        >
          content of a page when looking at its layout. The point of using Lorem
        </Text>

        <Button
          text={"AMPLIE SEU CONHECIMENTO"}
          handleButton={handleToBlog}
          color={"#8CC63F"}
          type={"green"}
        />
      </Section>
    </Container>
  );
};

export default Blog;
