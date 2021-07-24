import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  FunctionComponent,
} from "react";

import {
  Container,
  Content,
  Header,
  Title,
  SubTitle,
  TitleStage,
  Column,
  Row,
  ImageContainer,
  ImageLabelContainer,
  Dot,
  ImageLabel,
  ProfileImage,
  ImageProfile,
  ProfileImageIconUpload,
  IconSvg,
  IconPath,
  InputContainer,
  Image,
  StepsContainer,
  Steps,
  Step,
  Line,
  TermsAndConditions,
  ButtonContainer,
  Description,
  Required,
  DescriptionTime,
  DependentsContainer,
  DependentsContent,
  DependentsAdd,
  DependentsDescription,
  Dependents,
  Icon,
  DependentsInfo,
  OptionDependent,
  Separator,
  ButtonPaymentsContainer,
  ButtonPaymentsContent,
  ButtonPaymentsSelect,
  ButtonPaymentsIcon,
  ButtonPaymentsSelectLabel,
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

import Button from "components/button";
import Input from "components/input";

import successClient from "assets/images/png/successClient.png";
import consultation1 from "assets/images/png/consultation1.png";
import consultation2 from "assets/images/png/consultation2.png";

import creditCard from "assets/icons/png/creditCard.png";
import pixQr from "assets/icons/png/pixQr.png";
import billet from "assets/icons/png/billet.png";
import calendar from "assets/icons/png/calendario.png";

import InputSelect from "components/inputSelect";
import useWindowSize from "hooks/useWindowSize";
import useForm from "hooks/useForm";
import { calculateAge, days, months, years } from "helpers/utils";
import AlertSuccess from "components/alerts/alertSuccess";
import Clock from "assets/svg/clock";
import Switch from "components/switch";
import AlertSuccessfullySubsidy from "components/alerts/alertSuccessfullySubsidy";

interface Props {
  open: boolean;
  close: () => void;
}

const ModalSubsidy: FunctionComponent<Props> = ({
  open = false,
  close = () => {},
}) => {
  const { width } = useWindowSize();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [subsidyAllEmployees, setSubsidyAllEmployees] = useState<boolean>(
    false
  );
  const [dependentAllowance, setDependentAllowance] = useState<boolean>(false);
  const [subsidyformat, setSubsidyformat] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [allYears, setAllYears] = useState<any>([]);

  const [paymentSelected, setPaymentSelected] = useState<any>(null);
  const [paymentTypes, setPaymentTypes] = useState([
    { id: 1, name: "Cartão de Crédito", icon: creditCard, actived: false },
    { id: 2, name: "Pix", icon: pixQr, actived: false },
    { id: 3, name: "Boleto", icon: billet, actived: false },
  ]);

  const handleSuccess = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const handleSelectPayment = useCallback(
    (payment: any) => {
      setPaymentSelected(payment.id);

      const newPayment = [...paymentTypes];

      newPayment.map((type) => {
        if (type.id === payment.id) {
          type.actived = true;
        } else {
          type.actived = false;
        }
      });

      setPaymentTypes(newPayment);
    },
    [paymentTypes]
  );

  const handleNext = useCallback(async () => {
    const newStage = stage + 1;

    switch (stage) {
      case 0:
        break;

      case 1:
        break;

      case 2:
        handleClose();
        handleSuccess();
        break;

      default:
        break;
    }

    setStage(newStage);
  }, [stage]);

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  const handleClose = () => {
    setStage(0);
    setPaymentSelected(null);
    close();
  };

  async function init() {
    await getYears();
  }

  useEffect(() => {
    init();

    return () => handleClose();
  }, []);

  const renderTitle = useMemo(() => {
    if (stage === 0 || stage === 1) {
      return "Subsídio Colaboradores";
    } else {
      return "Pagamento";
    }
  }, [stage]);

  const renderContent = useMemo(() => {
    if (stage === 0) {
      return (
        <Column width={"100%"} padding={"50px 20px"}>
          <Title center>Informações sobre Beneficiários do Subsídio</Title>

          <Column width={"100%"} padding={"40px 0px"}>
            <Column start width={"40%"}>
              <Switch
                checked={subsidyAllEmployees}
                labelChecked={"Aplicável a Todos os Colaboradores"}
                labelUnchecked={"Aplicável a Colaborador Específico"}
                onChange={(e) => setSubsidyAllEmployees(e)}
              />

              {subsidyAllEmployees ? (
                <Description size={"15px"} padding={"20px 0px 0px 0px"}>
                  Todos os colaboradores da sua empresa terão acesso ao
                  subsídio, até o limite de pagamento determinado a seguir.
                </Description>
              ) : (
                <>
                  <InputContainer>
                    <Input
                      label={"Nome"}
                      type={"text"}
                      value={""}
                      error={false}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"Registro Funcional"}
                      type={"text"}
                      value={""}
                      error={false}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>
                </>
              )}
            </Column>

            <Column start width={"40%"} padding={"20px 0px"}>
              <Title center padding={"0px 0px 20px 0px"}>
                Permitir Uso do Subsídio por Dependentes?
              </Title>

              <Switch
                checked={dependentAllowance}
                labelChecked={"Sim"}
                labelUnchecked={"Não"}
                onChange={(e) => setDependentAllowance(e)}
              />

              {dependentAllowance && (
                <>
                  <InputContainer>
                    <Input
                      label={"Nome do Dependente 1"}
                      type={"text"}
                      value={""}
                      error={false}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>
                  <InputContainer>
                    <Input
                      label={"Nome do Dependente 2"}
                      type={"text"}
                      value={""}
                      error={false}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>
                </>
              )}
            </Column>
          </Column>

          <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
        </Column>
      );
    } else if (stage === 1) {
      return (
        <Column width={"100%"} padding={"50px 20px"}>
          <Title center>Informações sobre o Subsídio</Title>

          <Column width={"100%"} padding={"40px 0px"}>
            <Column start width={"40%"}>
              <Title>Tipo de Atendimento</Title>

              <InputContainer>
                <InputSelect
                  label={"Profissão"}
                  // width={"120px"}
                  options={[]}
                  error={false}
                  value={""}
                  onChange={(e) => console.log("e", e)}
                />
              </InputContainer>

              <Title padding={"20px 0px"}>Formato do Subsídio</Title>

              <Switch
                checked={subsidyformat}
                labelChecked={"Valor Específico"}
                labelUnchecked={"Quantidade"}
                onChange={(e) => setSubsidyformat(e)}
              />

              {subsidyformat ? (
                <>
                  <Title padding={"20px 0px 0px 0px"}>Qual Valor?</Title>

                  <InputContainer>
                    <Input
                      label={"Valor"}
                      type={"text"}
                      value={""}
                      error={false}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>
                </>
              ) : (
                <>
                  <Title padding={"20px 0px 0px 0px"}>
                    Quantos Atendimentos?
                  </Title>

                  <InputContainer>
                    <Input
                      label={"Quantidade"}
                      type={"text"}
                      value={""}
                      error={false}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        console.log("e", e)
                      }
                    />
                  </InputContainer>
                </>
              )}

              <Title padding={"20px 0px 0px 0px"}>
                Valor Limite por Atendimento
              </Title>

              <InputContainer>
                <Input
                  label={"R$"}
                  type={"text"}
                  value={""}
                  error={false}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    console.log("e", e)
                  }
                />
              </InputContainer>

              <Title padding={"20px 0px 0px 0px"}>
                Data Limite para Uso do Subsídio
              </Title>

              <InputContainer>
                <InputSelect
                  label={"Dia"}
                  width={"68px"}
                  options={days}
                  error={false}
                  value={""}
                  onChange={(e) => console.log("e", e)}
                />
                <InputSelect
                  label={"Mês"}
                  width={"73px"}
                  options={months}
                  error={false}
                  value={""}
                  onChange={(e) => console.log("e", e)}
                />
                <InputSelect
                  label={"Ano"}
                  width={"80px"}
                  options={allYears}
                  error={false}
                  value={""}
                  onChange={(e) => console.log("e", e)}
                />
              </InputContainer>
            </Column>
          </Column>

          <Button fixedWidth text={"Continuar"} handleButton={handleNext} />
        </Column>
      );
    } else {
      return (
        <Row padding={"40px 20px"}>
          <Column width={"50%"}>
            <TitleStage left={width > 630}>Forma de Pagamento</TitleStage>

            <ButtonPaymentsContainer padding={"40px 0px"}>
              {paymentTypes.map((type: any) => (
                <ButtonPaymentsContent
                  key={type.id}
                  onClick={() => handleSelectPayment(type)}
                >
                  <ButtonPaymentsSelect actived={type.actived}>
                    <ButtonPaymentsIcon image={type.icon} />
                  </ButtonPaymentsSelect>

                  <ButtonPaymentsSelectLabel actived={type.actived}>
                    {type.name}
                  </ButtonPaymentsSelectLabel>
                </ButtonPaymentsContent>
              ))}
            </ButtonPaymentsContainer>

            {paymentSelected && paymentSelected === 1 && (
              <Column padding={width > 630 ? "" : "0px 0px 40px 0px"}>
                <Description size={"15px"} center>
                  Subsídio será debitado no cartão
                </Description>

                <InputContainer>
                  <Input
                    label={"Nº do Cartão de Crédito"}
                    type={"text"}
                    value={""}
                    error={false}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log("e", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Nome do Titular"}
                    type={"text"}
                    value={""}
                    error={false}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log("e", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Validade"}
                    type={"text"}
                    value={""}
                    error={false}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log("e", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"CVV"}
                    type={"text"}
                    value={""}
                    error={false}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log("e", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"CPF do Titular do Cartão"}
                    type={"text"}
                    value={""}
                    error={false}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log("e", e)
                    }
                  />
                </InputContainer>

                <Description
                  width={width > 630 ? "100%" : "250px"}
                  size={"13px"}
                  padding={"20px 0px 0px 0px"}
                >
                  Data de Vencimento &nbsp;<Required>*</Required>
                </Description>

                <InputContainer>
                  <InputSelect
                    label={"Mês"}
                    width={"120px"}
                    options={months}
                    error={false}
                    value={""}
                    onChange={(e) => console.log("e", e)}
                  />
                  <InputSelect
                    label={"Ano"}
                    width={"120px"}
                    options={allYears}
                    error={false}
                    value={""}
                    onChange={(e) => console.log("e", e)}
                  />
                </InputContainer>
              </Column>
            )}
          </Column>

          {width > 630 && <Separator vertical />}

          <Column width={"50%"} padding={width > 630 ? "0px 40px" : "0px"}>
            <TitleStage left={width > 630}>Resumo do Subsídio</TitleStage>

            <Row padding={"20px 0px 0px 0px"} center noWrap>
              <ProfileImage width={"53px"} height={"53px"}>
                {true ? (
                  <ImageProfile
                    width={"53px"}
                    height={"53px"}
                    image={
                      "https://expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
                    }
                  />
                ) : (
                  <IconSvg viewBox="9.437 8.001 16.794 22.21">
                    <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                  </IconSvg>
                )}
              </ProfileImage>

              <Column width={"100%"} padding={"0px 10px"}>
                <Title>Colaborador</Title>
                <Description size={"15px"}>Marcelo Alburque</Description>
                <Description size={"15px"}>Registro - 04/2334</Description>
              </Column>
            </Row>

            <Row padding={"10px 0px"} center noWrap>
              <ProfileImage width={"53px"} height={"53px"}>
                {false ? (
                  <ImageProfile width={"53px"} height={"53px"} image={""} />
                ) : (
                  <IconSvg viewBox="9.437 8.001 16.794 22.21">
                    <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                  </IconSvg>
                )}
              </ProfileImage>

              <Column width={"100%"} padding={"0px 10px"}>
                <Title>Paciente</Title>
                <Description size={"15px"}>Dependente</Description>
              </Column>
            </Row>

            <Separator />

            <Row padding={"10px 0px"} center noWrap>
              <Icon image={calendar} />

              <Column width={"100%"} padding={"0px 20px"}>
                <Description size={"15px"}>Data Limite para Uso</Description>
                <DescriptionTime>17/04/2020 (Quarta-feira)</DescriptionTime>
                <DescriptionTime>Às 08:00</DescriptionTime>
              </Column>
            </Row>

            <Separator />

            <Row padding={"20px 0px"} center noWrap>
              <Column width={"50%"}>
                <Row
                  center
                  noWrap
                  padding={width > 630 ? "" : "0px 20px 0px 0px"}
                >
                  <Column>
                    <Description size={"15px"}>
                      Limite por Atendimento
                    </Description>
                    <DescriptionTime>R$ 100,00</DescriptionTime>
                  </Column>
                </Row>
              </Column>

              <Separator vertical height={"60px"} />

              <Column width={"50%"} padding={"0px 20px"}>
                <Description size={"15px"}>Valor Total do Subsídio</Description>
                <DescriptionTime>R$ 1.000,00</DescriptionTime>
              </Column>
            </Row>

            <ButtonContainer padding={"20px 10px 0px 10px"}>
              <Button
                height={"46px"}
                text={"Confirmar Pagamento"}
                handleButton={handleNext}
              />
            </ButtonContainer>
          </Column>
        </Row>
      );
    }
  }, [
    stage,
    width,
    subsidyAllEmployees,
    dependentAllowance,
    subsidyformat,
    paymentTypes,
    paymentSelected,
  ]);

  return (
    <>
      <CustomModal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Container>
            <Header>{renderTitle}</Header>

            <Content>{renderContent}</Content>
          </Container>
        </Fade>
      </CustomModal>

      <AlertSuccessfullySubsidy
        open={success}
        close={() => setSuccess(false)}
      />
    </>
  );
};

export default ModalSubsidy;
