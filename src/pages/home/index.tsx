import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

import {
  Container,
  BannerContent,
  TitleBanner,
  SubTitleBanner,
  InputBanner,
  InputContentBanner,
  InputTextBanner,
  InputCalendarBanner,
  InputCalendarIconBanner,
  InputCalendarTextBanner,
  InputIconBanner,
  SectionContainer,
  SectionContent,
  SectionRow,
  SectionTitle,
  SectionSubTitle,
  SectionDescriptionIcon,
  SectionDescription,
  SectionIcon,
  Column,
  SectionButtonContainer,
  SectionImage,
  SectionVideo,
  SectionTitleSearch,
  SectionSubTitleSearch,
  DotGreen,
  ButtonSearchContainer,
  ButtonSearchContent,
  ButtonSearchSelect,
  ButtonSearch,
  ButtonSearchLabel,
  IconSearch,
  ButtonSearchIcon,
  ButtonSearchSelectLabel,
  SearchText,
  AdvancedSearch,
  AdvancedSearchContainer,
  AdvancedSearchTitle,
  AdvancedSearchContent,
  Icon,
  Click,
  AdvancedSearchRow,
  CalendarContainer,
  SliderContainer,
} from "./styles";

import { Slider, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { pt } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";

import ProfessionalCards from "components/professionalCards";
import Banner from "components/banner";
import BannerHome from "assets/images/banners/home.png";
import computer from "assets/images/banners/computer.png";
import banner5 from "assets/images/png/banner5.png";
import hvn from "assets/images/banners/hvn1.png";
import clerk from "assets/images/banners/clerk.png";
import loupe from "assets/icons/png/loupeBlue.png";
import calendar from "assets/icons/png/calendarBlue.png";
import consultation from "assets/icons/png/consultation.png";
import debit from "assets/icons/png/debit.png";

import business from "assets/icons/png/business.png";
import healthcare from "assets/icons/png/healthcare-and-medical.png";
import medical from "assets/icons/png/medical.png";
import electronics from "assets/icons/png/electronics.png";
import people from "assets/icons/png/people.png";

import Button from "components/button";
import useWindowSize from "hooks/useWindowSize";
import Input from "components/input";
import InputSelect from "components/inputSelect";
import Checkbox from "components/checkbox";
import CustomersAndPartners from "components/customersAndPartners";
import Blog from "components/blog";
import moment from "moment";
import { api } from "services/api";
import { numberToMoney } from "helpers/utils";
import Loading from "components/loading";

const CustomSlider = withStyles({
  root: {
    color: "#0878D3",
    width: "100%",
    padding: "10px 0",
  },
  thumb: {
    height: 17,
    width: 17,
    backgroundColor: "#0878D3",
    marginTop: -7,
    "&:focus, &:hover, &$active": {},
    "& .bar": {},
  },
  active: {},
  track: {
    height: 2,
  },
  rail: {
    color: "#DEDEDE",
    opacity: 1,
    height: 2,
  },
})(Slider);

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={true} enterTouchDelay={0} placement="bottom" title={value}>
      {children}
    </Tooltip>
  );
}

const Home: React.FC = () => {
  const sectionSearchRef = useRef(null);
  const sectionSearchResultRef = useRef(null);
  const { width } = useWindowSize();
  const [date, setDate] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [professionalTypes, setProfessionalTypes] = useState([
    { id: 10, name: "Psicólogo", icon: business, actived: false },
    { id: 11, name: "Psicanalista", icon: healthcare, actived: false },
    { id: 16, name: "Outro Profissional", icon: medical, actived: false },
  ]);
  const [typesConsultation, setTypesConsultation] = useState([
    { id: 1, name: "On-line", icon: electronics, actived: false },
    { id: 0, name: "Presencial", icon: people, actived: false },
  ]);
  const [professionals, setProfessionals] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      const professional = professionalTypes.filter((type) => {
        return type.actived === true;
      })[0].id;

      const consultation = typesConsultation.filter((type) => {
        return type.actived === true;
      })[0].id;

      const newDate = moment(date).format("DD-MM-YYYY");

      const { data } = await api.get(
        `web/BuscarProfissionalPorPesq/${professional.toString()}/${consultation.toString()}/${newDate}`
      );

      if (data && data.length > 0) {
        const newData: any = [];

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          const newElement = {
            id: element.idUsuario,
            name: element.Nome,
            crp: element.RegistroCRPePsi,
            price: `R$ ${numberToMoney(element.ValorPorSessaoProf)}`,
            time: element.DuracaoAtendimentoProf,
            presentationLetter: element.CartaApresentacaoProf,
            image: element.BaseImage,
          };

          newData.push(newElement);
        }

        setProfessionals(newData);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [date, professionalTypes, typesConsultation]);

  const handleSelectProfessionalType = useCallback(
    (id: number) => {
      const newProfessionalTypes = [...professionalTypes];

      newProfessionalTypes.map((type: any) => {
        if (type.id === id) {
          type.actived = true;
        } else {
          type.actived = false;
        }
      });

      setProfessionalTypes(newProfessionalTypes);
    },
    [professionalTypes]
  );

  const handleSelectConsultation = useCallback(
    (id: number) => {
      const newTypesConsultation = [...typesConsultation];

      newTypesConsultation.map((type: any) => {
        if (type.id === id) {
          type.actived = true;
        } else {
          type.actived = false;
        }
      });

      setTypesConsultation(newTypesConsultation);
    },
    [typesConsultation]
  );

  const scrollToRef = (ref: any) =>
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });

  useEffect(() => {}, []);

  const paddingSectionVideo = useMemo(() => {
    if (width > 1130) {
      return "154px 100px";
    } else if (width > 1024) {
      return "169px 30px";
    } else if (width > 798) {
      return "212px 30px";
    } else {
      return "0px 0px 50px 0px";
    }
  }, [width]);

  const heightImageComputer = useMemo(() => {
    if (width > 1305) {
      return 400;
    } else if (width > 1206) {
      return 433;
    } else if (width > 1072) {
      return 504;
    } else if (width > 970) {
      return 504;
    } else {
      return 470;
    }
  }, [width]);

  return (
    <Container>
      <Banner
        image={BannerHome}
        content={
          <BannerContent>
            {width > 598 ? (
              <>
                <TitleBanner>Marque sua sessão de terapia</TitleBanner>
                <TitleBanner>on-line ou presencial</TitleBanner>
              </>
            ) : (
              <>
                <TitleBanner>Marque sua</TitleBanner>
                <TitleBanner>sessão de terapia</TitleBanner>
                <TitleBanner>on-line ou presencial</TitleBanner>
              </>
            )}

            <SubTitleBanner>
              Cuide de sua saúde de onde você estiver
            </SubTitleBanner>

            <InputBanner onClick={() => scrollToRef(sectionSearchRef)}>
              <InputContentBanner>
                <InputTextBanner>
                  Procure por profissional, abordagem, data...
                </InputTextBanner>

                {width > 698 && (
                  <InputCalendarBanner>
                    <InputCalendarIconBanner />
                    <InputCalendarTextBanner>dd/mm/aa</InputCalendarTextBanner>
                  </InputCalendarBanner>
                )}
              </InputContentBanner>
              <InputIconBanner />
            </InputBanner>
          </BannerContent>
        }
      />

      <SectionContainer color={"#FFF"}>
        <SectionContent
          width={width > 1229 ? 50 : 60}
          padding={width > 598 ? "40px 100px" : width > 390 ? "40px" : "20px"}
        >
          <SectionTitle>Como marcar sua</SectionTitle>
          <SectionTitle>sessão de terapia</SectionTitle>

          <SectionSubTitle padding={"0px 0px 40px 0px"}>
            Busque uma vida mais plena, veja como funciona!
          </SectionSubTitle>

          <SectionDescriptionIcon>
            <SectionIcon image={loupe} />

            <SectionDescription>
              Procure um profissional com quem se identifique
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"20px 0px"}>
            <SectionIcon image={calendar} />

            <SectionDescription>
              Marque o melhor dia e horário
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon>
            <SectionIcon image={debit} />

            <SectionDescription>
              Efetue o pagamento em plataforma segura
            </SectionDescription>
          </SectionDescriptionIcon>

          <SectionDescriptionIcon padding={"20px 0px"}>
            <SectionIcon image={consultation} />

            <Column>
              <SectionDescription>
                Seja atendido por videochamada em ambiente
              </SectionDescription>
              <SectionDescription>
                criptografado ou no consultório do profissional
              </SectionDescription>
            </Column>
          </SectionDescriptionIcon>

          <SectionButtonContainer padding={"20px 0px 10px 0px"}>
            <Button
              text={"AGENDE SEU ATENDIMENTO"}
              handleButton={() => scrollToRef(sectionSearchRef)}
              color={"#8CC63F"}
              type={"green"}
              fixedWidth
            />
          </SectionButtonContainer>
        </SectionContent>

        <SectionContent
          width={width > 1229 ? 50 : 40}
          center
          padding={paddingSectionVideo}
        >
          <SectionVideo />
        </SectionContent>
      </SectionContainer>

      <SectionContainer color={"#F0F0F0"}>
        {width > 798 && (
          <SectionContent width={60}>
            <SectionImage image={computer} height={heightImageComputer} />
          </SectionContent>
        )}

        <SectionContent
          width={70}
          padding={
            width > 1485
              ? "40px 100px"
              : width > 1200
              ? "40px 30px 40px 60px"
              : width > 598
              ? "40px 100px"
              : width > 414
              ? "40px"
              : "40px 20px"
          }
        >
          <SectionTitle fontSmall>Profissionais Especializados</SectionTitle>

          <SectionSubTitle padding={"20px 0px"}>
            Escolha o profissional mais aderente à sua demanda
          </SectionSubTitle>

          <SectionDescription>
            Psicólogo, Psicanalista ou outro profissional de saúde e bem-estar.
          </SectionDescription>
          <SectionDescription>
            Procure também por data, nome do especialista, abordagem,
          </SectionDescription>
          <SectionDescription>
            plano de saúde, valor da consulta etc.
          </SectionDescription>

          <SectionButtonContainer padding={"40px 0px 20px 0px"}>
            <Button
              text={"NOSSOS PROFISSIONAIS"}
              handleButton={() => scrollToRef(sectionSearchResultRef)}
              color={"#8CC63F"}
              type={"green"}
              fixedWidth
            />
          </SectionButtonContainer>
        </SectionContent>

        {width <= 798 && (
          <SectionContent width={100} padding={"0px 0px 20px 0px"}>
            <SectionImage image={clerk} height={width > 598 ? 400 : 270} />
          </SectionContent>
        )}
      </SectionContainer>

      <SectionContainer color={"#FFF"}>
        <SectionContent
          width={60}
          padding={
            width > 1350
              ? "80px 100px"
              : width > 1216
              ? "80px 40px"
              : width > 1024
              ? "80px 40px"
              : width > 798
              ? "40px 20px"
              : width > 414
              ? "20px"
              : "30px 20px"
          }
        >
          <SectionTitle fontSmall>Praticidade, conforto e</SectionTitle>
          <SectionTitle fontSmall>Segurança das Informações</SectionTitle>

          {width > 970 ? (
            <>
              <SectionSubTitle padding={"30px 0px 0px 0px"}>
                Faça a consulta on-line, do seu lugar preferido,
              </SectionSubTitle>
              <SectionSubTitle padding={"0px 0px 30px 0px"}>
                na data e horário que você puder
              </SectionSubTitle>
            </>
          ) : (
            <SectionSubTitle padding={"30px 0px 0px 0px"}>
              Faça a consulta on-line, do seu lugar preferido, na data e horário
              que você puder
            </SectionSubTitle>
          )}

          {width > 597 ? (
            <>
              <SectionDescription>
                Com um módulo de videochamada próprio, toda segurança que um
              </SectionDescription>
              <SectionDescription>
                atendimento de saúde e bem-estar exige, longe de redes sociais,
                e com
              </SectionDescription>
              <SectionDescription>
                criptografia de ponta a ponta.
              </SectionDescription>
              <SectionDescription>
                Ou se preferir, agende seu atendimento presencial
              </SectionDescription>
              <SectionDescription>
                no consultório do profissional com quem se identifique.
              </SectionDescription>
            </>
          ) : (
            <>
              <SectionDescription>
                Com um módulo de videochamada próprio, toda segurança que um
                atendimento de saúde e bem-estar exige, longe de redes sociais,
                e com criptografia de ponta a ponta.
              </SectionDescription>
              <SectionDescription>
                Ou se preferir, agende seu atendimento presencial no consultório
                do profissional com quem se identifique.
              </SectionDescription>
            </>
          )}

          <SectionButtonContainer padding={"40px 0px 0px 0px"}>
            <Button
              text={"AGENDE ON-LINE OU PRESENCIAL"}
              handleButton={() => scrollToRef(sectionSearchRef)}
              color={"#8CC63F"}
              type={"green"}
            />
          </SectionButtonContainer>
        </SectionContent>

        <SectionContent
          width={40}
          padding={width > 798 ? "40px 0px 0px 0px" : "40px 0px 40px 0px"}
        >
          <SectionImage
            image={hvn}
            height={
              width > 1065
                ? 610
                : width > 1024
                ? 630
                : width > 970
                ? 550
                : width > 948
                ? 450
                : width > 598
                ? 400
                : 270
            }
          />
        </SectionContent>
      </SectionContainer>

      <SectionContainer column ref={sectionSearchRef} color={"#F0F0F0"}>
        <SectionRow>
          <SectionContent center width={50} padding={"40px"}>
            <SectionTitleSearch size={"20px"}>1° Passo</SectionTitleSearch>
            <SectionSubTitleSearch>Área de Atendimento</SectionSubTitleSearch>

            <ButtonSearchContainer padding={"20px 0px"}>
              {professionalTypes.map((type: any) => (
                <ButtonSearchContent
                  key={type.id}
                  onClick={() => handleSelectProfessionalType(type.id)}
                >
                  <ButtonSearchSelect actived={type.actived}>
                    <ButtonSearchIcon image={type.icon} />
                  </ButtonSearchSelect>

                  <ButtonSearchSelectLabel actived={type.actived}>
                    {type.name}
                  </ButtonSearchSelectLabel>
                </ButtonSearchContent>
              ))}
            </ButtonSearchContainer>

            <ButtonSearchContainer>
              {typesConsultation.map((type) => (
                <ButtonSearchContent
                  key={type.id}
                  onClick={() => handleSelectConsultation(type.id)}
                >
                  <ButtonSearchSelect actived={type.actived}>
                    <ButtonSearchIcon image={type.icon} />
                  </ButtonSearchSelect>

                  <ButtonSearchSelectLabel actived={type.actived}>
                    {type.name}
                  </ButtonSearchSelectLabel>
                </ButtonSearchContent>
              ))}
            </ButtonSearchContainer>
          </SectionContent>

          <SectionContent center width={50} padding={"40px"}>
            <SectionTitleSearch size={"20px"}>2° Passo</SectionTitleSearch>
            <SectionSubTitleSearch>
              Data do seu atendimento
            </SectionSubTitleSearch>

            <CalendarContainer>
              <DatePickerCalendar
                date={date}
                onDateChange={setDate}
                locale={pt}
                minimumDate={new Date()}
              />
            </CalendarContainer>
          </SectionContent>
        </SectionRow>

        {/* <ButtonSearchContainer center padding={"20px 0px"}>
          <Click onClick={() => setAdvancedSearch(!advancedSearch)}>
            <AdvancedSearch>Pesquisa Avançada</AdvancedSearch>

            <Icon open={advancedSearch} />
          </Click>
        </ButtonSearchContainer> */}

        {/* {advancedSearch && (
          <ButtonSearchContainer center padding={"20px"}>
            <AdvancedSearchContainer>
              <AdvancedSearchTitle>
                Pesquisa Avançada - Opcional :)
              </AdvancedSearchTitle>

              <AdvancedSearchContent>
                <AdvancedSearchRow column={width <= 1112 ? true : false}>
                  <AdvancedSearchRow column={width <= 598 ? true : false}>
                    <Input
                      label={"Nome do Profissional"}
                      type={"text"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />

                    <InputSelect
                      label={"Faixa Etária do Cliente"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </AdvancedSearchRow>

                  <AdvancedSearchRow column={width <= 598 ? true : false}>
                    <InputSelect
                      label={"Gênero do Profissional"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />

                    <InputSelect
                      label={"Estado do Profissional"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </AdvancedSearchRow>
                </AdvancedSearchRow>

                <AdvancedSearchRow column={width <= 1112 ? true : false}>
                  <AdvancedSearchRow column={width <= 598 ? true : false}>
                    <InputSelect
                      label={"Demanda ou Sintoma"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />

                    <InputSelect
                      label={"Abordagem desejada"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </AdvancedSearchRow>

                  <AdvancedSearchRow column={width <= 598 ? true : false}>
                    <InputSelect
                      label={"Plano de Saúde"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />

                    <InputSelect
                      label={"Cidade do Profissional"}
                      value={""}
                      error={false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </AdvancedSearchRow>
                </AdvancedSearchRow>

                <AdvancedSearchRow start>
                  <Column gap={"15px"} flex>
                    <AdvancedSearchTitle>Faixa de Valor</AdvancedSearchTitle>

                    <SliderContainer>
                      <CustomSlider
                        ValueLabelComponent={ValueLabelComponent}
                        getAriaLabel={(index) =>
                          index === 0 ? "Minimum price" : "Maximum price"
                        }
                        defaultValue={[0, 100]}
                        valueLabelDisplay="auto"
                      />
                    </SliderContainer>
                  </Column>

                  <Column gap={"15px"}>
                    <AdvancedSearchTitle>Documento Fiscal</AdvancedSearchTitle>

                    <Checkbox
                      label="Você irá usar o documento fiscal emitido pelo profissional para reembolso pelo plano de saúde?"
                      labelColor={"#797979"}
                      checked={false}
                      error={false}
                      onChange={(e: any) => {
                        console.log("e", e);
                      }}
                    />
                  </Column>
                </AdvancedSearchRow>
              </AdvancedSearchContent>
            </AdvancedSearchContainer>
          </ButtonSearchContainer>
        )} */}

        <ButtonSearchContainer
          center
          padding={"20px 0px"}
          onClick={handleSearch}
        >
          <ButtonSearch onClick={() => scrollToRef(sectionSearchResultRef)}>
            <ButtonSearchLabel>Realizar Pesquisar</ButtonSearchLabel>

            <IconSearch />
          </ButtonSearch>
        </ButtonSearchContainer>

        {/* <ButtonSearchContainer center padding={"20px 0px"}>
          <SectionTitleSearch size={width > 360 ? "25px" : "20px"}>
            Características da pesquisa
          </SectionTitleSearch>
        </ButtonSearchContainer> */}
      </SectionContainer>

      <SectionContainer color={"#FFF"} ref={sectionSearchResultRef}>
        <SectionContent padding={"40px 0px"}>
          {professionals && professionals.length > 0 ? (
            <ProfessionalCards professionals={professionals} />
          ) : (
            <SearchText>Nenhum profissional encontrado</SearchText>
          )}
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <Blog />
      </SectionContainer>

      <SectionContainer color={"#FFF"}>
        <SectionContent width={width > 1376 ? 50 : 40}>
          <SectionImage
            image={banner5}
            height={width > 798 ? 680 : 438}
            contain
          />
        </SectionContent>

        <SectionContent
          center
          height={width > 798 ? 680 : 438}
          width={width > 1376 ? 50 : 60}
          padding={
            width > 1147
              ? "40px"
              : width > 1080
              ? "40px 20px"
              : width > 798
              ? "40px 10px 40px 0px"
              : "40px"
          }
        >
          <Column>
            <SectionTitle fontSmall>BUSQUE UMA VIDA MAIS PLENA,</SectionTitle>
            <SectionTitle fontSmall>AGENDE O SEU ATENDIMENTO!</SectionTitle>

            <SectionDescriptionIcon padding={"30px 0px 0px 0px"}>
              <DotGreen />

              <SectionDescription>
                Sem mensalidades, planos ou carência
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 0px 0px"}>
              <DotGreen />

              <SectionDescription>
                Profissionais especializados
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 0px 0px"}>
              <DotGreen />

              <SectionDescription>
                Praticidade, Conforto e Segurança das Informações
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 0px 0px"}>
              <DotGreen />

              <SectionDescription>
                Módulo de videochamada próprio com criptografia de ponta a ponta
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 0px 0px"}>
              <DotGreen />

              <SectionDescription>
                Envio de mensagens para confirmar agendamentos e pagamentos
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionDescriptionIcon padding={"10px 0px 0px 0px"}>
              <DotGreen />

              <SectionDescription>
                Amplie seu autoconhecimento, mude padrões de comportamento ou
                controle ansiedade
              </SectionDescription>
            </SectionDescriptionIcon>

            <SectionButtonContainer padding={"40px 0px 20px 0px"}>
              <Button
                text={"AGENDE SEU ATENDIMENTO"}
                handleButton={() => scrollToRef(sectionSearchRef)}
                color={"#8CC63F"}
                type={"green"}
                fixedWidth
              />
            </SectionButtonContainer>
          </Column>
        </SectionContent>
      </SectionContainer>

      <SectionContainer noBoxShadow>
        <CustomersAndPartners />
      </SectionContainer>

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default Home;
