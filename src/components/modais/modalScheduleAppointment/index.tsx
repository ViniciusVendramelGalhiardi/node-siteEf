import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";

import {
  Container,
  Content,
  Header,
  Title,
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
  Separator,
  ButtonPaymentsContainer,
  ButtonPaymentsContent,
  ButtonPaymentsSelect,
  ButtonPaymentsIcon,
  ButtonPaymentsSelectLabel,
} from "./styles";

import { CustomModal } from "styles";
import { Fade } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import Button from "components/button";
import Input from "components/input";

import consultation1 from "assets/images/png/consultation1.png";
import consultation2 from "assets/images/png/consultation2.png";

import creditCard from "assets/icons/png/creditCard.png";
import bank from "assets/icons/png/bank.png";
import pixQr from "assets/icons/png/pixQr.png";
import billet from "assets/icons/png/billet.png";
import calendar from "assets/icons/png/calendario.png";

import InputSelect from "components/inputSelect";
import useWindowSize from "hooks/useWindowSize";
import useForm from "hooks/useForm";

import {
  calculateAge,
  convertBlobToBase64,
  days,
  genders,
  months,
  numberToMoney,
  years,
  expirationYear,
} from "helpers/utils";

import Cropper, { CroppedImage } from "components/cropper";
import Clock from "assets/svg/clock";
import AlertSuccessfullyScheduled from "components/alerts/alertSuccessfullyScheduled";
import { api } from "services/api";
import { setFormat } from "helpers/formatting";
import { schedulingStatus, userTypes } from "config/contants";
import useIugu from "hooks/useIugu";
import Loading from "components/loading";
import { useSnackbar } from "hooks/useSnackbar";
import { removeMask } from "helpers/removeMasks";
import { useAuth } from "hooks/useAuth";

interface Props {
  scheduling?: any;
  open: boolean;
  close: () => void;
}

const ModalScheduleAppointment: FunctionComponent<Props> = ({
  scheduling,
  open = false,
  close = () => {},
}) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const iugu = useIugu(process.env.REACT_APP_ACCOUNT_ID);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [userData, setUserData] = useState<any>({});
  const [professionalData, setProfessionalData] = useState<any>({});

  const [allYears, setAllYears] = useState<any>([]);
  const [expirationYears, setExpirationYears] = useState<any>([]);

  const [blobImage, setBlobImage] = useState<any>({});
  const [healthPlan, setHealthPlan] = useState<any>([]);
  const [modalAddDependents, setModalAddDependents] = useState<any>(false);
  const [careForDependent, setCareForDependent] = useState<any>(false);
  const [dependentSelected, setDependentSelected] = useState<any>({});
  const [dependents, setDependents] = useState<any>([]);

  const [paymentSelected, setPaymentSelected] = useState<any>(null);
  const [paymentTypes, setPaymentTypes] = useState([
    { id: 1, name: "Cartão de Crédito", icon: creditCard, actived: false },
    { id: 2, name: "Plano de Saúde", icon: bank, actived: false },
    // { id: 3, name: "Pix", icon: pixQr, actived: false },
    // { id: 4, name: "Boleto", icon: billet, actived: false },
  ]);

  const dependent = useForm({
    name: { type: "name", required: true },
    surname: { type: "name", required: false },
    birthdateDay: { type: "", required: false },
    birthdateMonth: { type: "", required: false },
    birthdateYear: { type: "", required: false },
    gender: { type: "", required: true },
    cellphone: { type: "phone", required: false },
    email: { type: "email", required: false },
    cpf: { type: "cpf", required: true },
    image: { type: "", required: false },
  });

  const cardPayment = useForm({
    holder: { type: "name", required: true },
    cpf: { type: "cpf", required: true },
    number: { type: "cardNumber", required: true },
    expirationMonth: { type: "", required: true },
    expirationYear: { type: "", required: true },
    cvv: { type: "", required: true },
  });

  const planPayment = useForm({
    healthPlan: { type: "", required: true },
    code: { type: "", required: true },
    cpf: { type: "cpf", required: true },
  });

  const handleSuccess = () => {
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      handleClose();

      const type: any = user.userType;

      navigate("/minha-conta", { state: type });
    }, 2000);
  };

  const makeScheduling = useCallback(
    async (payment: any, sessionId: string) => {
      try {
        const dependentId =
          dependentSelected && Object.keys(dependentSelected).length > 0
            ? dependentSelected.id
            : "NULL";

        const params = {
          Idexpediente: scheduling.officeHourId,
          IdUsuario: userData.id,
          IdUsuarioProfissional: parseInt(professionalData.id),
          IdDependente: dependentId,
          StatusPagamento: payment.status,
          IdTransacao: payment.IdTransacao,
          statusAgendamento: schedulingStatus.scheduled,
          IDSessao: sessionId,
        };

        const { data } = await api.post("web/efetuaAgendamento", params);

        if (data) {
          handleSuccess();
        }
      } catch (error) {
        console.log("error agendamento", error);

        setLoading(false);

        showSnackbar({
          image: userData.image,
          name: "Deseja tentar novamente?",
          message: "Ocorreu um erro ao tentar realizar o agendamento",
          cancelText: "Sim",
          submitText: "Não",
          onSubmit: () => {},
          onCancel: () => makeScheduling(payment, sessionId),
        });
      }
    },
    [userData, dependentSelected, professionalData, scheduling]
  );

  const generateSessionTokbok = async () => {
    try {
      const { data } = await api.get("tokbox/gerarSessao");

      console.log("data session", data);

      return data.value;
    } catch (error) {
      console.log("error session", error);
    }
  };

  const makePayment = async (params: any) => {
    try {
      const { data } = await api.post("pgtoIugu/Efetuarpagamento", params);

      console.log("data pagamento", data);

      if (data && Object.keys(data).length > 0) {
        return data;
      }
    } catch (error) {
      console.log("error pagamento", error);

      return false;
    }
  };

  const linkUserSubAccount = useCallback(
    async (sub: any) => {
      try {
        const { data } = await api.post(
          `pgtoIugu/VincularClienteSubConta/?IdUsuarioSubConta=${sub.IdUsuarioSubConta}&IdUsuarioContaMaster=${sub.IdUsuarioContaMaster}&UserTokenDaSubConta=${professionalData.tokenProdIugu}`
        );

        console.log("data VincularClienteSubConta", data);

        if (data && Object.keys(data).length > 0) {
          return data;
        }
      } catch (error) {
        console.log("error VincularClienteSubConta", error);
      }
    },
    [professionalData]
  );

  const createUserSubAccount = useCallback(async () => {
    try {
      const { data } = await api.post(
        `pgtoIugu/CadastrarUsuarioNaSubConta/${userData.id}/1/{TokenSubContaPrd}?UserTokenSubContaPrd=${professionalData.tokenProdIugu}`
      );

      console.log("data CadastrarUsuarioNaSubConta", data);

      if (data && Object.keys(data).length > 0) {
        return data;
      }
    } catch (error) {
      console.log("error CadastrarUsuarioNaSubConta", error);
    }
  }, [professionalData, userData]);

  const generateToken = useCallback(async () => {
    console.log("Aqui");

    const validateCardNumber = await iugu.validateCreditCardNumber(
      cardPayment.form.number
    );

    if (!validateCardNumber) {
      cardPayment.setError({
        ...cardPayment.error,
        number: "O número do cartão está inválido.",
      });
      return false;
    }

    const expiration = `${cardPayment.form.expirationMonth}/${cardPayment.form.expirationYear}`;

    const validateExpiration = await iugu.validateExpiration(expiration);

    if (!validateExpiration) {
      cardPayment.setError({
        ...cardPayment.error,
        expirationMonth: "A validade do cartão está inválida.",
      });
      cardPayment.setError({
        ...cardPayment.error,
        expirationYear: "A validade do cartão está inválida.",
      });
      return false;
    }

    const brand = await iugu.getBrandByCreditCardNumber(
      cardPayment.form.number
    );

    const validateCVV = await iugu.validateCVV(cardPayment.form.cvv, brand);

    if (!validateCVV) {
      cardPayment.setError({
        ...cardPayment.error,
        cvv: "O CVV do cartão está inválido.",
      });
      return false;
    }

    const objCreditCard = await iugu.creditCard(cardPayment.form);

    console.log("objCreditCard", objCreditCard);

    if (!objCreditCard.valid()) {
      cardPayment.setError({
        ...cardPayment.error,
        number: "O número do cartão está inválido.",
      });
      return false;
    }

    const token: any = await iugu.createPaymentToken(objCreditCard.toData());

    console.log("token", token);

    if ((token && !token.id) || !token) {
      return false;
    }

    return token.id;
  }, [cardPayment, iugu]);

  const createPayment = useCallback(async () => {
    try {
      const token: any = await generateToken();

      if (!token) {
        setLoading(false);

        return false;
      }

      const params = {
        tokenGeradoIugu: token,
        idClienteIugu: userData.userIdIugu,
        Descricao: "Meu cartão",
        CartaoPrincipal: true,
      };

      const { data } = await api.post(`pgtoIugu/criarformaPagamento`, params);

      console.log("Criar forma pagamento", data);

      if (data && Object.keys(data).length > 0 && !data.errors) {
        return data;
      }

      return false;
    } catch (error) {
      console.log("error criar forma pagamento", error);

      setLoading(false);

      return false;
    }
  }, [userData, generateToken]);

  const getPaymentsIugu = useCallback(async () => {
    try {
      const { data } = await api.get(
        `pgtoIugu/BuscarFormaPagto/${userData.userIdIugu}`
      );

      if ((data && Object.keys(data).length === 0) || !data) {
        return await createPayment();
      }

      const dataLastNumber = data.NumeroCartao.substr(-4);
      const lastNumber = cardPayment.form.number.substr(-4);

      const cardBrand = await iugu.getBrandByCreditCardNumber(
        cardPayment.form.number
      );

      console.log("dataLastNumber", dataLastNumber);
      console.log("lastNumber", lastNumber);
      console.log("cardBrand", cardBrand);
      console.log("data.BandeiraCartao", data.BandeiraCartao);

      const brand = cardBrand === "mastercard" ? "Master" : cardBrand;

      if (dataLastNumber === lastNumber && data.BandeiraCartao === brand) {
        const holder = cardPayment.form.holder
          ? cardPayment.form.holder.toUpperCase()
          : "";
        const expMonth = parseInt(cardPayment.form.expirationMonth);
        const expYear = cardPayment.form.expirationYear;

        if (
          data.NomeCartao === holder &&
          expMonth === data.Mes &&
          expYear === data.AnoVencimento
        ) {
          return data;
        }
      }

      return await createPayment();
    } catch (error) {
      console.log("error busca forma pagamento", error);

      setLoading(false);

      return false;
    }
  }, [cardPayment, userData, createPayment, iugu]);

  const formatParams = useCallback(async () => {
    let paymentData: any = null;
    const result = {
      error: false,
      type: "",
    };

    if (paymentSelected === 1) {
      const validate = cardPayment.validateForm();

      if (!validate) {
        setLoading(false);

        result.error = true;
        result.type = "validateCard";

        return result;
      }

      paymentData = await getPaymentsIugu();
    } else if (paymentSelected === 2) {
      const validate = planPayment.validateForm();

      if (!validate) {
        setLoading(false);

        result.error = true;
        result.type = "validatePlan";

        return result;
      }
    }

    if (!paymentData) {
      setLoading(false);

      result.error = true;
      result.type = "payment";

      return result;
    }

    const subAccount = await createUserSubAccount();

    if (!subAccount) {
      setLoading(false);

      result.error = true;
      result.type = "payment";

      return result;
    }

    const linkUser = await linkUserSubAccount(subAccount);

    if (!linkUser) {
      setLoading(false);

      result.error = true;
      result.type = "payment";

      return result;
    }

    console.log("paymentData", paymentData);

    return {
      DescricaoProduto: "Consulta médica",
      Valor: "1,00",
      // Valor: numberToMoney(professionalData.price),
      IdFormaPagtoIugu: paymentData.IdFormaPgtoIugu,
      IdUsuarioSubConta: subAccount.IdUsuarioSubConta,
      EmailUsuario: userData.email,
      tokenSubConta: professionalData.tokenProdIugu,
    };
  }, [
    paymentSelected,
    cardPayment,
    planPayment,
    getPaymentsIugu,
    createUserSubAccount,
    linkUserSubAccount,
    userData,
    professionalData,
  ]);

  const handleConfirmSchedule = useCallback(async () => {
    setLoading(true);

    const params: any = await formatParams();

    console.log("params", params);

    if (params.error) {
      setLoading(false);

      if (params.type === "payment") {
        showSnackbar({
          image: userData.image,
          name: "Deseja tentar novamente?",
          message: "Ocorreu um erro ao tentar realizar o pagamento",
          cancelText: "Sim",
          submitText: "Não",
          onSubmit: () => {},
          onCancel: () => handleConfirmSchedule(),
        });
      }

      return;
    }

    const payment = await makePayment(params);

    if (!payment || (payment && Object.keys(payment).length === 0)) {
      setLoading(false);

      showSnackbar({
        image: userData.image,
        name: "Deseja tentar novamente?",
        message: "Ocorreu um erro ao tentar realizar o pagamento",
        cancelText: "Sim",
        submitText: "Não",
        onSubmit: () => {},
        onCancel: () => handleConfirmSchedule(),
      });

      return;
    }

    if (
      payment &&
      payment.status !== "captured" &&
      payment.status !== "Autorizado"
    ) {
      setLoading(false);

      showSnackbar({
        image: userData.image,
        name: "Deseja tentar novamente?",
        message: "O seu pagamento não foi autorizado",
        cancelText: "Sim",
        submitText: "Não",
        onSubmit: () => {},
        onCancel: () => handleConfirmSchedule(),
      });

      return;
    }

    let session = await generateSessionTokbok();

    if (!session) {
      session = await generateSessionTokbok();
    }

    await makeScheduling(payment, session);
  }, [formatParams, makeScheduling, userData, showSnackbar]);

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

  const handleSelectDependent = (dep: any) => {
    setDependentSelected(dep);
    setCareForDependent(false);
  };

  const formatDependentParams = useCallback(async () => {
    let base64: any = "";

    if (blobImage && Object.keys(blobImage).length > 0) {
      base64 = await convertBlobToBase64(blobImage.blob);
    }

    return {
      Nome: dependent.form.name,
      Imagem: base64,
      Apelido: dependent.form.surname,
      DataNascimento: `${dependent.form.birthdateDay}-${dependent.form.birthdateMonth}-${dependent.form.birthdateYear}`,
      Genero: dependent.form.gender,
      Telefone: removeMask(dependent.form.cellphone, "phone"),
      Email: dependent.form.email,
      Cpf: removeMask(dependent.form.cpf, "cpf"),
      IdUsuario: user.id,
    };
  }, [dependent, blobImage, user]);

  const handleAddDependent = useCallback(async () => {
    try {
      const status = dependent.validateForm();

      if (!status) {
        return;
      }

      setLoading(true);

      const age = await calculateAge(
        parseInt(dependent.form.birthdateDay),
        parseInt(dependent.form.birthdateMonth),
        parseInt(dependent.form.birthdateYear)
      );

      const params = await formatDependentParams();

      const { data } = await api.post("web/cadastraDependente", params);

      if (!data) {
        console.log("error data", data);
        return;
      }

      const newDependent = {
        id: data,
        age,
        ...dependent.form,
      };

      const newDependents = [...dependents];
      newDependents.push(newDependent);
      setDependents(newDependents);

      setModalAddDependents(false);
      dependent.clearForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [dependents, dependent, formatDependentParams]);

  const handleNext = useCallback(
    async (dependent: boolean = false) => {
      const newStage = stage + 1;

      if (dependent) {
        setCareForDependent(true);
      }

      switch (stage) {
        case 0:
          break;

        default:
          break;
      }

      setStage(newStage);
    },
    [stage]
  );

  const handleClose = () => {
    setStage(0);
    setCareForDependent(false);
    setDependentSelected(false);
    setPaymentSelected(null);
    close();
  };

  const getPlans = async () => {
    try {
      const { data } = await api.get("web/ListaPlanos");
      setHealthPlan(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function getYears() {
    const newYears = await years();
    setAllYears(newYears);
  }

  async function getExpirationYear() {
    const newYears = await expirationYear();
    setExpirationYears(newYears);
  }

  const formatUserData = async (data: any) => {
    setUserData({
      id: data.idUsuario,
      image: data.Imagem,
      name: data.Nome,
      email: data.Email,
      userIdIugu: data.IdUsuarioIugu,
    });

    if (data.Dependentes && data.Dependentes.length > 0) {
      const newDependents: any = [];

      for (let i = 0; i < data.Dependentes.length; i++) {
        const element = data.Dependentes[i];

        const splited: any = element.DataNascimento.split("-");

        const newElement = {
          id: element.IdDependente,
          name: element.Nome,
          surname: element.Apelido,
          birthdateDay: splited[0],
          birthdateMonth: splited[1],
          birthdateYear: parseInt(splited[2]),
          gender: element.Genero,
          cellphone: element.Telefone,
          email: element.Email,
          cpf: await setFormat(element.Cpf, "cpf"),
          image: element.Imagem,
          age: await calculateAge(
            parseInt(splited[0]),
            parseInt(splited[1]),
            parseInt(splited[2])
          ),
        };

        newDependents.push(newElement);
      }

      setDependents(newDependents);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await api.get(`web/BuscarUsuario/${user.id}/1`);

      await formatUserData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfessionalData = async () => {
    try {
      const { data } = await api.get(
        `web/BuscarUsuario/${scheduling.professionalId}/2`
      );

      if (data) {
        const res = await api.get(
          `pgtoIugu/BuscarSubContaUsuario/${data.idUsuarioIugu}`
        );

        const newProfessional = {
          id: scheduling.professionalId,
          name: data.Nome,
          image: data.BaseImage,
          profession: await getProfession(data.IdProfissao),
          crp: data.RegistroCRPePsi,
          price: data.ValorPorSessaoProf,
          duration: data.DuracaoAtendimentoProf,
          userIdIugu: data.idUsuarioIugu,
          idSubAccountIugu: res.data.IdSubConta,
          tokenProdIugu: res.data.TokenPrd,
        };

        setProfessionalData(newProfessional);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfession = async (id: number) => {
    try {
      const { data } = await api.get("web/ListaProfissao");

      const newProfession = data.filter((p: any) => p.Id === id)[0].Nome;

      return newProfession;
    } catch (error) {
      console.log("error", error);
    }
  };

  async function init() {
    await getProfessionalData();
    await getUserData();
    await getYears();
    await getExpirationYear();
    await getPlans();
  }

  useEffect(() => {
    init();

    return () => handleClose();
  }, []);

  const renderTitle = useMemo(() => {
    if (stage === 0) {
      return "Agendar Atendimento";
    } else if (stage === 1) {
      if (careForDependent) {
        if (modalAddDependents) {
          return "Adicionar Dependente menor de 18 anos";
        } else {
          return "Dependente";
        }
      } else {
        return "Pagamento";
      }
    }
  }, [stage, careForDependent, modalAddDependents]);

  const isDependent = useMemo(() => {
    if (dependentSelected && Object.keys(dependentSelected).length > 0) {
      return true;
    } else {
      return false;
    }
  }, [dependentSelected]);

  const renderContent = useMemo(() => {
    if (stage === 0) {
      return (
        <Column width={"100%"} padding={"50px 20px"}>
          <TitleStage>Quem será atendido?</TitleStage>

          <Row>
            <Column width={"50%"} padding={"40px 0px"}>
              <ImageContainer pointer onClick={() => handleNext(false)}>
                <Image image={consultation1} />

                <ImageLabelContainer padding={"10px 0px"}>
                  <Dot />

                  <ImageLabel>Eu serei o cliente</ImageLabel>
                </ImageLabelContainer>
              </ImageContainer>
            </Column>

            <Column width={"50%"} padding={"40px 0px"}>
              <ImageContainer pointer onClick={() => handleNext(true)}>
                <Image image={consultation2} />

                <ImageLabelContainer padding={"10px 0px"}>
                  <Dot />

                  <ImageLabel>Sou responsável pelo cliente</ImageLabel>
                </ImageLabelContainer>
              </ImageContainer>
            </Column>
          </Row>
        </Column>
      );
    } else if (stage === 1) {
      if (careForDependent && !modalAddDependents) {
        return (
          <Column width={"100%"} padding={"50px 20px"}>
            <TitleStage>Quem será atendido?</TitleStage>

            <Row>
              {width <= 630 && (
                <Column width={"50%"} padding={"40px 0px 0px 0px"}>
                  <ImageContainer>
                    <Image image={consultation2} />
                  </ImageContainer>
                </Column>
              )}

              <Column width={"50%"} padding={"40px 0px"}>
                <Row
                  padding={
                    width > 630 ? "0px 0px 20px 0px" : "0px 0px 20px 20px"
                  }
                >
                  <ImageLabel>Lista de Dependentes</ImageLabel>
                </Row>

                <DependentsContainer>
                  {dependents.map((dependent: any) => (
                    <Dependents
                      key={dependent.id}
                      onClick={() => handleSelectDependent(dependent)}
                    >
                      <Row gap={"20px"}>
                        <Dot />

                        <DependentsDescription>
                          {dependent.name}
                        </DependentsDescription>
                      </Row>

                      <DependentsInfo>
                        {dependent.gender} | {dependent.age} anos | CPF{" "}
                        {dependent.cpf}
                      </DependentsInfo>
                    </Dependents>
                  ))}

                  <DependentsContent
                    onClick={() => {
                      setModalAddDependents(true);
                    }}
                  >
                    <DependentsAdd>+</DependentsAdd>

                    <DependentsDescription>
                      Adicionar Dependente menor de 18 anos
                    </DependentsDescription>
                  </DependentsContent>
                </DependentsContainer>
              </Column>

              {width > 630 && (
                <Column width={"50%"} padding={"40px 0px"}>
                  <ImageContainer>
                    <Image image={consultation2} />
                  </ImageContainer>
                </Column>
              )}
            </Row>
          </Column>
        );
      } else if (careForDependent && modalAddDependents) {
        return (
          <Column width={"100%"} padding={"50px 20px"}>
            <Title center padding={"0px 20px 40px 20px"}>
              Informações do dependente menor de 18 anos
            </Title>

            <Cropper
              onCrop={(image: CroppedImage) => {
                setBlobImage(image);
                dependent.setValueForm("image", image.url);
              }}
            >
              <ProfileImage pointer marginBootom>
                {dependent.form.image ? (
                  <ImageProfile image={dependent.form.image} />
                ) : (
                  <IconSvg viewBox="9.437 8.001 16.794 22.21">
                    <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                  </IconSvg>
                )}

                <ProfileImageIconUpload />
              </ProfileImage>
            </Cropper>

            <Row>
              <Column
                width={"50%"}
                padding={
                  width > 768
                    ? "0px 10px 20px 20px"
                    : width > 630
                    ? "20px"
                    : "20px 20px 0px 20px"
                }
              >
                <InputContainer>
                  <Input
                    label={"Nome do Dependente"}
                    type={"text"}
                    value={dependent.form.name}
                    error={dependent.error.name}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dependent.onChange("name", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Como prefere ser chamado?"}
                    type={"text"}
                    value={dependent.form.surname}
                    error={dependent.error.surname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dependent.onChange("surname", e)
                    }
                  />
                </InputContainer>

                <Title width={"250px"} padding={"20px 0px 0px 0px"}>
                  Data de Nascimento &nbsp;<Required>*</Required>
                </Title>

                <InputContainer>
                  <InputSelect
                    label={"Dia"}
                    width={"70px"}
                    options={days}
                    error={dependent.error.birthdateDay}
                    value={dependent.form.birthdateDay}
                    onChange={(e) => dependent.setValueForm("birthdateDay", e)}
                  />
                  <InputSelect
                    label={"Mês"}
                    width={"73px"}
                    options={months}
                    error={dependent.error.birthdateMonth}
                    value={dependent.form.birthdateMonth}
                    onChange={(e) =>
                      dependent.setValueForm("birthdateMonth", e)
                    }
                  />
                  <InputSelect
                    label={"Ano"}
                    width={"80px"}
                    options={allYears}
                    error={dependent.error.birthdateYear}
                    value={dependent.form.birthdateYear}
                    onChange={(e) => dependent.setValueForm("birthdateYear", e)}
                  />
                </InputContainer>
              </Column>

              <Column
                width={"50%"}
                padding={
                  width > 768
                    ? "0px 20px 20px 10px"
                    : width > 630
                    ? "20px"
                    : "0px 20px 20px 20px"
                }
              >
                <InputContainer>
                  <InputSelect
                    label={"Gênero"}
                    options={genders}
                    required
                    value={dependent.form.gender}
                    error={dependent.error.gender}
                    onChange={(e: any) => dependent.setValueForm("gender", e)}
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Telefone"}
                    type={"text"}
                    maxLength={15}
                    value={dependent.form.cellphone}
                    error={dependent.error.cellphone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dependent.onChange("cellphone", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"E-mail"}
                    type={"text"}
                    value={dependent.form.email}
                    error={dependent.error.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dependent.onChange("email", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"CPF"}
                    type={"text"}
                    maxLength={14}
                    value={dependent.form.cpf}
                    error={dependent.error.cpf}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dependent.onChange("cpf", e)
                    }
                  />
                </InputContainer>
              </Column>
            </Row>

            <ButtonContainer gap={"20px"} padding={"20px 0px 0px 0px"}>
              <Button
                fixedWidth
                text={"Cancelar"}
                handleButton={() => setModalAddDependents(false)}
              />

              <Button
                fixedWidth
                text={"Concluir"}
                handleButton={handleAddDependent}
              />
            </ButtonContainer>
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
                    Consulta será debitada no seu cartão
                  </Description>

                  <InputContainer>
                    <Input
                      label={"Nº do Cartão de Crédito"}
                      type={"text"}
                      value={cardPayment.form.number}
                      error={cardPayment.error.number}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        cardPayment.onChange("number", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"Nome do Titular"}
                      type={"text"}
                      value={cardPayment.form.holder}
                      error={cardPayment.error.holder}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        cardPayment.onChange("holder", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"CPF do Titular do Cartão"}
                      type={"text"}
                      value={cardPayment.form.cpf}
                      error={cardPayment.error.cpf}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        cardPayment.onChange("cpf", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"CVV"}
                      type={"text"}
                      value={cardPayment.form.cvv}
                      error={cardPayment.error.cvv}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        cardPayment.onChange("cvv", e)
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
                      value={cardPayment.form.expirationMonth}
                      error={cardPayment.error.expirationMonth}
                      onChange={(e: any) =>
                        cardPayment.setValueForm("expirationMonth", e)
                      }
                    />

                    <InputSelect
                      label={"Ano"}
                      width={"120px"}
                      options={expirationYears}
                      value={cardPayment.form.expirationYear}
                      error={cardPayment.error.expirationYear}
                      onChange={(e: any) =>
                        cardPayment.setValueForm("expirationYear", e)
                      }
                    />
                  </InputContainer>
                </Column>
              )}

              {paymentSelected && paymentSelected === 2 && (
                <Column padding={width > 630 ? "" : "0px 0px 40px 0px"}>
                  <Description size={"15px"} center>
                    Consulta será aprovada pelo seu plano
                  </Description>

                  <InputContainer>
                    <InputSelect
                      label={"Planos de Saúde"}
                      options={healthPlan}
                      value={planPayment.form.healthPlan}
                      error={planPayment.error.healthPlan}
                      required
                      onChange={(e: any) =>
                        planPayment.setValueForm("healthPlan", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"Código Convênio"}
                      type={"text"}
                      value={planPayment.form.code}
                      error={planPayment.error.code}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        planPayment.onChange("code", e)
                      }
                    />
                  </InputContainer>

                  <InputContainer>
                    <Input
                      label={"CPF"}
                      type={"text"}
                      value={planPayment.form.cpf}
                      error={planPayment.error.cpf}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        planPayment.onChange("cpf", e)
                      }
                    />
                  </InputContainer>
                </Column>
              )}
            </Column>

            {width > 630 && <Separator vertical />}

            <Column width={"50%"} padding={width > 630 ? "0px 40px" : "0px"}>
              <TitleStage left={width > 630}>Resumo do Atendimento</TitleStage>

              <Row padding={"20px 0px 0px 0px"} center noWrap>
                <ProfileImage width={"53px"} height={"53px"}>
                  {professionalData.image ? (
                    <ImageProfile
                      width={"53px"}
                      height={"53px"}
                      image={professionalData.image}
                    />
                  ) : (
                    <IconSvg viewBox="9.437 8.001 16.794 22.21">
                      <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                    </IconSvg>
                  )}
                </ProfileImage>

                <Column width={"100%"} padding={"0px 10px"}>
                  <Title>Profissional</Title>
                  <Description size={"15px"}>
                    {professionalData.name}
                  </Description>
                  <Description size={"15px"}>
                    {professionalData.profession} - CRP {professionalData.crp}
                  </Description>
                </Column>
              </Row>

              <Row padding={"10px 0px"} center noWrap>
                <ProfileImage width={"53px"} height={"53px"}>
                  {isDependent && dependentSelected.image ? (
                    <ImageProfile
                      width={"53px"}
                      height={"53px"}
                      image={dependentSelected.image}
                    />
                  ) : !isDependent && userData.image ? (
                    <ImageProfile
                      width={"53px"}
                      height={"53px"}
                      image={userData.image}
                    />
                  ) : (
                    <IconSvg viewBox="9.437 8.001 16.794 22.21">
                      <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
                    </IconSvg>
                  )}
                </ProfileImage>

                <Column width={"100%"} padding={"0px 10px"}>
                  <Title>Paciente</Title>
                  {isDependent ? (
                    <Description size={"15px"}>
                      {dependentSelected.name}
                    </Description>
                  ) : (
                    <Description size={"15px"}>{userData.name}</Description>
                  )}
                </Column>
              </Row>

              <Separator />

              <Row padding={"10px 0px"} center noWrap>
                <Icon image={calendar} />

                <Column width={"100%"} padding={"0px 20px"}>
                  <Description size={"15px"}>Agendamento</Description>
                  <DescriptionTime>
                    {scheduling && scheduling.date} (
                    {scheduling && scheduling.weekDay})
                  </DescriptionTime>
                  <DescriptionTime>
                    Às {scheduling && scheduling.hour}
                  </DescriptionTime>
                </Column>
              </Row>

              <Separator />

              <Row padding={"20px 0px"} center noWrap>
                <Column width={"50%"}>
                  <Row
                    center
                    gap={"20px"}
                    noWrap
                    padding={width > 630 ? "" : "0px 20px 0px 0px"}
                  >
                    <Column>
                      <Clock />
                    </Column>

                    <Column>
                      <Description size={"15px"}>Duração estimada</Description>
                      <DescriptionTime>
                        {professionalData.duration}
                      </DescriptionTime>
                    </Column>
                  </Row>
                </Column>

                <Separator vertical height={"60px"} />

                <Column width={"50%"} padding={"0px 20px"}>
                  <Description size={"15px"}>Valor da Consulta</Description>
                  <DescriptionTime>
                    R$ {numberToMoney(professionalData.price)}
                  </DescriptionTime>
                </Column>
              </Row>

              <ButtonContainer padding={"20px 10px 0px 10px"}>
                <Button
                  height={"46px"}
                  text={"Confirmar Agendamento"}
                  handleButton={handleConfirmSchedule}
                />
              </ButtonContainer>
            </Column>
          </Row>
        );
      }
    }
  }, [
    stage,
    careForDependent,
    modalAddDependents,
    dependents,
    dependent,
    width,
    cardPayment,
    planPayment,
    healthPlan,
    userData,
    dependentSelected,
    professionalData,
    allYears,
    expirationYears,
  ]);

  return (
    <>
      <CustomModal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Container>
            <Header>{renderTitle}</Header>

            <Content>{renderContent}</Content>

            {loading && <Loading open={loading} />}
          </Container>
        </Fade>
      </CustomModal>

      {success && (
        <AlertSuccessfullyScheduled
          open={success}
          close={() => setSuccess(false)}
        />
      )}
    </>
  );
};

export default ModalScheduleAppointment;
