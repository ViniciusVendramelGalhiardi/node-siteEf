import Button from "components/button";
import Input from "components/input";
import InputSelect from "components/inputSelect";
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
  Title,
  SubTitle,
  Row,
  Column,
  InputContainer,
  Label,
  ButtonContainer,
  Image,
  TermsAndConditions,
} from "../styles";

import registerCompany from "assets/images/png/registerCompany.png";
import successClient from "assets/images/png/successClient.png";

import { useNavigate } from "react-router-dom";

import Checkbox from "components/checkbox";
import Modal from "components/modais/modal";
import AlertSuccess from "components/alerts/alertSuccess";
import useForm from "hooks/useForm";
import useWindowSize from "hooks/useWindowSize";
import { api } from "services/api";
import { removeMask } from "helpers/removeMasks";
import { userTypes } from "config/contants";
import Loading from "components/loading";
import { useAuth } from "hooks/useAuth";

interface Props {}

const CompanyRegistration: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { width } = useWindowSize();
  const [stage, setStage] = useState(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [metUs, setMetUs] = useState<any>([]);
  const [healthPlan, setHealthPlan] = useState<any>([]);
  const [codeSms, setCodeSms] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalTermAndCondition, setOpenModalTermAndCondition] =
    useState<boolean>(false);

  const companyStage1 = useForm({
    name: { type: "name", required: true },
    cellphone: { type: "phone", required: true },
    email: { type: "email", required: false },
    idMet: { type: "", required: false },
    companyName: { type: "name", required: true },
    companyPhone: { type: "phone", required: true },
    companyEmail: { type: "email", required: true },
    state: { type: "", required: false },
    city: { type: "", required: false },
    site: { type: "", required: false },
    linkedin: { type: "", required: false },
    instagram: { type: "", required: false },
    numberEmployees: { type: "number", required: false },
    cnpj: { type: "cnpj", required: false },
    healthPlan: { type: "", required: false },
  });

  const companyStage2 = useForm({
    code: { type: "", required: true },
    password: { type: "password", required: true },
    confirmPassword: { type: "password", required: true },
    termAndCondition: { type: "", required: true },
    privacyPolicy: { type: "", required: true },
  });

  const companyStageMobile1 = useForm({
    name: { type: "name", required: true },
    cellphone: { type: "phone", required: true },
    email: { type: "email", required: false },
    idMet: { type: "", required: false },
  });

  const companyStageMobile2 = useForm({
    companyName: { type: "name", required: true },
    companyPhone: { type: "phone", required: true },
    companyEmail: { type: "email", required: true },
    state: { type: "", required: false },
    city: { type: "", required: false },
    site: { type: "", required: false },
    linkedin: { type: "", required: false },
    instagram: { type: "", required: false },
    numberEmployees: { type: "number", required: false },
    cnpj: { type: "cnpj", required: false },
    healthPlan: { type: "", required: false },
  });

  const handleSuccess = () => {
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      navigate("/minha-conta", { state: userTypes.company });
    }, 2000);
  };

  const clearForm = useCallback(() => {
    companyStage1.clearForm();
    companyStage2.clearForm();
    companyStageMobile1.clearForm();
    companyStageMobile2.clearForm();
  }, [companyStage1, companyStage2, companyStageMobile1, companyStageMobile2]);

  const sendSms = useCallback(async () => {
    try {
      const phone = removeMask(
        width > 720
          ? companyStage1.form.cellphone
          : companyStageMobile1.form.cellphone,
        "phone"
      );

      const name =
        width > 720 ? companyStage1.form.name : companyStageMobile1.form.name;

      const { data } = await api.post(`web/EnviarSMS/${phone}/${name}`);

      // setCodeSms(data.value);
      setCodeSms(1234);
    } catch (error) {
      console.log("error", error);
    }
  }, [width, companyStage1, companyStageMobile1]);

  const formatData = useCallback(() => {
    return {
      Nome:
        width > 720 ? companyStage1.form.name : companyStageMobile1.form.name,
      Telefone: removeMask(
        width > 720
          ? companyStage1.form.cellphone
          : companyStageMobile1.form.cellphone,
        "phone"
      ),
      Email:
        width > 720 ? companyStage1.form.email : companyStageMobile1.form.email,
      Cidade:
        width > 720 ? companyStage1.form.city : companyStageMobile2.form.city,
      Estado:
        width > 720 ? companyStage1.form.state : companyStageMobile2.form.state,
      Cep: "",
      IdConheceu:
        width > 720
          ? companyStage1.form.idMet
            ? parseInt(companyStage1.form.idMet)
            : null
          : companyStageMobile1.form.idMet
          ? parseInt(companyStageMobile1.form.idMet)
          : null,
      Senha: companyStage2.form.password,
      Senha_Confirmar: companyStage2.form.confirmPassword,
      TermosCondicoes: companyStage2.form.termAndCondition,
      PoliticaPrivacidade: companyStage2.form.privacyPolicy,
      Apelido: "",
      NomeEmpresaEmp:
        width > 720
          ? companyStage1.form.companyName
          : companyStageMobile2.form.companyName,
      TelefoneCorporativoEmp:
        width > 720
          ? companyStage1.form.companyPhone
          : companyStageMobile2.form.companyPhone,
      EmailCorporativoEmp:
        width > 720
          ? companyStage1.form.companyEmail
          : companyStageMobile2.form.companyEmail,
      SiteEmpr:
        width > 720 ? companyStage1.form.site : companyStageMobile2.form.site,
      LinkedinEmpr:
        width > 720
          ? companyStage1.form.linkedin
          : companyStageMobile2.form.linkedin,
      InstagramEmp:
        width > 720
          ? companyStage1.form.instagram
          : companyStageMobile2.form.instagram,
      CargoFuncaoEmp: "",
      Cnpj:
        width > 720
          ? removeMask(companyStage1.form.cnpj, "cnpj")
          : removeMask(companyStageMobile2.form.cnpj, "cnpj"),
      NumeroColaboradoresEmp:
        width > 720
          ? companyStage1.form.numberEmployees
            ? parseInt(companyStage1.form.numberEmployees)
            : null
          : companyStageMobile2.form.numberEmployees
          ? parseInt(companyStageMobile2.form.numberEmployees)
          : null,
      PlanodeSaudeEmpresa: [
        {
          IdPlanoCredenciado:
            width > 720
              ? companyStage1.form.healthPlan
                ? parseInt(companyStage1.form.healthPlan)
                : null
              : companyStageMobile2.form.healthPlan
              ? parseInt(companyStageMobile2.form.healthPlan)
              : null,
        },
      ],
      ContasCorrente: null,
    };
  }, [
    companyStage1,
    companyStage2,
    companyStageMobile1,
    companyStageMobile2,
    width,
  ]);

  const handleRegistration = useCallback(async () => {
    try {
      setLoading(true);

      const dataFormated = await formatData();

      const { data } = await api.post("web/cadastrarUsuario/3", dataFormated);

      if (data) {
        const paramsLogin = {
          email:
            width > 720
              ? companyStage1.form.email
              : companyStageMobile1.form.email,
          password: companyStage2.form.password,
          type: 3,
        };

        const success = await signIn(paramsLogin);

        if (success) {
          await handleSuccess();
          clearForm();
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [
    formatData,
    clearForm,
    width,
    companyStage1,
    companyStageMobile1,
    companyStage2,
    signIn,
  ]);

  const handleNext = useCallback(
    async (mobile: boolean) => {
      switch (stage) {
        case 0:
          let stage1: any = null;

          if (!mobile) {
            stage1 = companyStage1.validateForm();
          } else {
            stage1 = companyStageMobile1.validateForm();
          }

          if (!stage1) {
            return;
          }

          if (!mobile) {
            await sendSms();
          }

          setStage(stage + 1);

          break;

        case 1:
          let stage2: any = null;

          if (!mobile) {
            stage2 = companyStage2.validateForm();
          } else {
            stage2 = companyStageMobile2.validateForm();
          }

          if (!stage2) {
            return;
          }

          if (!mobile) {
            if (companyStage2.form.code != codeSms) {
              companyStage2.setError({
                ...companyStage2.error,
                code: "Código inválido!",
              });

              return;
            }

            if (
              companyStage2.form.password !== companyStage2.form.confirmPassword
            ) {
              companyStage2.setError({
                ...companyStage2.error,
                confirmPassword: "As senhas devem ser iguais!",
              });

              return;
            }

            await handleRegistration();
          } else {
            await sendSms();
            setStage(stage + 1);
          }

          break;

        case 2:
          const stage3 = companyStage2.validateForm();

          if (!stage3) {
            return;
          }

          if (companyStage2.form.code != codeSms) {
            companyStage2.setError({
              ...companyStage2.error,
              code: "Código inválido!",
            });

            return;
          }

          if (
            companyStage2.form.password !== companyStage2.form.confirmPassword
          ) {
            companyStage2.setError({
              ...companyStage2.error,
              confirmPassword: "As senhas devem ser iguais!",
            });

            return;
          }

          await handleRegistration();

          break;

        default:
          break;
      }
    },
    [
      stage,
      companyStage1,
      companyStage2,
      companyStageMobile1,
      companyStageMobile2,
      codeSms,
    ]
  );

  const getPlans = async () => {
    try {
      const { data } = await api.get("web/ListaPlanos");
      setHealthPlan(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMet = async () => {
    try {
      const { data } = await api.get("web/ListaNosConheceu");
      setMetUs(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function init() {
    await getMet();
    await getPlans();
  }

  useEffect(() => {
    if (width > 720 && stage === 2) {
      setStage(1);
    }
  }, [width, stage]);

  useEffect(() => {
    init();
  }, []);

  const renderStage = useMemo(() => {
    if (width > 720) {
      if (stage === 0) {
        return (
          <Content padding={"50px 10px"}>
            <Row gap={width > 870 ? "200px" : "50px"} start>
              <Column center>
                <SubTitle padding={"0px 0px 20px 0px"}>
                  Informações do Responsável pelo Cadastro
                </SubTitle>

                <InputContainer>
                  <Input
                    label={"Nome"}
                    type={"text"}
                    value={companyStage1.form.name}
                    error={companyStage1.error.name}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("name", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Telefone"}
                    type={"text"}
                    maxLength={15}
                    value={companyStage1.form.cellphone}
                    error={companyStage1.error.cellphone}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("cellphone", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"E-mail"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.email}
                    error={companyStage1.error.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("email", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <InputSelect
                    label={"Como nos conheceu?"}
                    options={metUs}
                    value={companyStage1.form.idMet}
                    onChange={(e: any) =>
                      companyStage1.setValueForm("idMet", e)
                    }
                  />
                </InputContainer>

                <Image
                  image={registerCompany}
                  width={"374px"}
                  height={"370px"}
                  margin={"100px 0px 0px 0px"}
                />
              </Column>

              <Column center>
                <SubTitle padding={"0px 0px 20px 0px"}>
                  Informações sobre a Sede da Empresa
                </SubTitle>

                <InputContainer>
                  <Input
                    label={"Nome da Empresa"}
                    type={"text"}
                    value={companyStage1.form.companyName}
                    error={companyStage1.error.companyName}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("companyName", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Telefone corporativo"}
                    type={"text"}
                    maxLength={15}
                    value={companyStage1.form.companyPhone}
                    error={companyStage1.error.companyPhone}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("companyPhone", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"E-mail corporativo"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.companyEmail}
                    error={companyStage1.error.companyEmail}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("companyEmail", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Estado"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.state}
                    error={false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("state", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Cidade"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.city}
                    error={false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("city", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Site da empresa"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.site}
                    error={companyStage1.error.site}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("site", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Linkedin"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.linkedin}
                    error={companyStage1.error.linkedin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("linkedin", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Instagram"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.instagram}
                    error={companyStage1.error.instagram}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("instagram", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"Número de Colaboradores"}
                    type={"text"}
                    maxLength={100}
                    value={companyStage1.form.numberEmployees}
                    error={companyStage1.error.numberEmployees}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("numberEmployees", e)
                    }
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    label={"CNPJ"}
                    type={"text"}
                    maxLength={18}
                    value={companyStage1.form.cnpj}
                    error={companyStage1.error.cnpj}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      companyStage1.onChange("cnpj", e)
                    }
                  />
                </InputContainer>

                <Label bold padding={"20px 0px 0px 0px"} width={"100%"} center>
                  Oferece Plano de Saúde
                </Label>

                <InputContainer>
                  <InputSelect
                    label={"Selecione..."}
                    options={healthPlan}
                    value={companyStage1.form.healthPlan}
                    onChange={(e: any) =>
                      companyStage1.setValueForm("healthPlan", e)
                    }
                  />
                </InputContainer>

                <ButtonContainer padding={"50px 10px 0px 10px"}>
                  <Button
                    fixedWidth
                    text={"Continuar"}
                    handleButton={() => handleNext(false)}
                  />
                </ButtonContainer>
              </Column>
            </Row>
          </Content>
        );
      } else if (stage === 1) {
        return (
          <Content>
            <SubTitle padding={"30px 10px 20px 10px"}>Dados de Acesso</SubTitle>

            <InputContainer>
              <Input
                label={"Código Recebido"}
                type={"text"}
                value={companyStage2.form.code}
                error={companyStage2.error.code}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStage2.onChange("code", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Senha"}
                type={"password"}
                value={companyStage2.form.password}
                error={companyStage2.error.password}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStage2.onChange("password", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Confirme a senha"}
                type={"password"}
                value={companyStage2.form.confirmPassword}
                error={companyStage2.error.confirmPassword}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStage2.onChange("confirmPassword", e)
                }
              />
            </InputContainer>

            <TermsAndConditions padding={"20px 0px 10px 0px"}>
              <Checkbox
                checked={companyStage2.form.termAndCondition}
                error={companyStage2.error.termAndCondition}
                label={"Termos e Condições"}
                onChange={(e: any) => {
                  companyStage2.setValueForm("termAndCondition", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            <TermsAndConditions>
              <Checkbox
                checked={companyStage2.form.privacyPolicy}
                error={companyStage2.error.privacyPolicy}
                label={"Política de Privacidade"}
                onChange={(e: any) => {
                  companyStage2.setValueForm("privacyPolicy", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            <ButtonContainer padding={"50px 10px 0px 10px"}>
              <Button
                fixedWidth
                text={"Continuar"}
                handleButton={() => handleNext(false)}
              />
            </ButtonContainer>
          </Content>
        );
      }
    } else {
      if (stage === 0) {
        return (
          <Content padding={"30px 10px"}>
            <SubTitle padding={"0px 0px 20px 0px"}>
              Informações do Responsável pelo Cadastro
            </SubTitle>

            <InputContainer>
              <Input
                label={"Nome"}
                type={"text"}
                value={companyStageMobile1.form.name}
                error={companyStageMobile1.error.name}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile1.onChange("name", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Telefone"}
                type={"text"}
                maxLength={15}
                value={companyStageMobile1.form.cellphone}
                error={companyStageMobile1.error.cellphone}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile1.onChange("cellphone", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"E-mail"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile1.form.email}
                error={companyStageMobile1.error.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile1.onChange("email", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <InputSelect
                label={"Como nos conheceu?"}
                options={metUs}
                value={companyStageMobile1.form.idMet}
                onChange={(e: any) =>
                  companyStageMobile1.setValueForm("idMet", e)
                }
              />
            </InputContainer>

            <ButtonContainer padding={"50px 10px 0px 10px"}>
              <Button
                fixedWidth
                text={"Continuar"}
                handleButton={() => handleNext(true)}
              />
            </ButtonContainer>

            <Image
              image={registerCompany}
              width={width > 374 ? "374px" : "100%"}
              height={"370px"}
              margin={"80px 0px 0px 0px"}
            />
          </Content>
        );
      } else if (stage === 1) {
        return (
          <Content padding={"30px 10px"}>
            <SubTitle padding={"0px 0px 20px 0px"}>
              Informações sobre a Sede da Empresa
            </SubTitle>

            <InputContainer>
              <Input
                label={"Nome da Empresa"}
                type={"text"}
                value={companyStageMobile2.form.companyName}
                error={companyStageMobile2.error.companyName}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("companyName", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Telefone corporativo"}
                type={"text"}
                maxLength={15}
                value={companyStageMobile2.form.companyPhone}
                error={companyStageMobile2.error.companyPhone}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("companyPhone", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"E-mail corporativo"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.companyEmail}
                error={companyStageMobile2.error.companyEmail}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("companyEmail", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Estado"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.state}
                error={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("state", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Cidade"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.city}
                error={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("city", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Site da empresa"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.site}
                error={companyStageMobile2.error.site}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("site", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Linkedin"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.linkedin}
                error={companyStageMobile2.error.linkedin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("linkedin", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Instagram"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.instagram}
                error={companyStageMobile2.error.instagram}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("instagram", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Número de Colaboradores"}
                type={"text"}
                maxLength={100}
                value={companyStageMobile2.form.numberEmployees}
                error={companyStageMobile2.error.numberEmployees}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("numberEmployees", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"CNPJ"}
                type={"text"}
                maxLength={18}
                value={companyStageMobile2.form.cnpj}
                error={companyStageMobile2.error.cnpj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStageMobile2.onChange("cnpj", e)
                }
              />
            </InputContainer>

            <Label bold padding={"20px 0px 0px 0px"} width={"100%"} center>
              Oferece Plano de Saúde
            </Label>

            <InputContainer>
              <InputSelect
                label={"Selecione..."}
                options={healthPlan}
                value={companyStageMobile2.form.healthPlan}
                onChange={(e: any) =>
                  companyStageMobile2.setValueForm("healthPlan", e)
                }
              />
            </InputContainer>

            <ButtonContainer padding={"50px 10px 0px 10px"}>
              <Button
                fixedWidth
                text={"Continuar"}
                handleButton={() => handleNext(true)}
              />
            </ButtonContainer>
          </Content>
        );
      } else if (stage === 2) {
        return (
          <Content>
            <SubTitle padding={"30px 10px 20px 10px"}>Dados de Acesso</SubTitle>

            <InputContainer>
              <Input
                label={"Código Recebido"}
                type={"text"}
                value={companyStage2.form.code}
                error={companyStage2.error.code}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStage2.onChange("code", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Senha"}
                type={"password"}
                value={companyStage2.form.password}
                error={companyStage2.error.password}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStage2.onChange("password", e)
                }
              />
            </InputContainer>

            <InputContainer>
              <Input
                label={"Confirme a senha"}
                type={"password"}
                value={companyStage2.form.confirmPassword}
                error={companyStage2.error.confirmPassword}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  companyStage2.onChange("confirmPassword", e)
                }
              />
            </InputContainer>

            <TermsAndConditions padding={"20px 0px 10px 0px"}>
              <Checkbox
                checked={companyStage2.form.termAndCondition}
                error={companyStage2.error.termAndCondition}
                label={"Termos e Condições"}
                onChange={(e: any) => {
                  companyStage2.setValueForm("termAndCondition", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            <TermsAndConditions>
              <Checkbox
                checked={companyStage2.form.privacyPolicy}
                error={companyStage2.error.privacyPolicy}
                label={"Política de Privacidade"}
                onChange={(e: any) => {
                  companyStage2.setValueForm("privacyPolicy", e);
                }}
                labelDynamic={() => setOpenModalTermAndCondition(true)}
              />
            </TermsAndConditions>

            <ButtonContainer padding={"50px 10px 0px 10px"}>
              <Button
                fixedWidth
                text={"Continuar"}
                handleButton={() => handleNext(true)}
              />
            </ButtonContainer>
          </Content>
        );
      }
    }
  }, [
    stage,
    companyStage1,
    companyStage2,
    companyStageMobile1,
    companyStageMobile2,
    width,
    metUs,
    healthPlan,
  ]);

  return (
    <Container>
      <Title>Para empresas</Title>

      {renderStage}

      {openModalTermAndCondition && (
        <Modal
          title={"Termos de Uso e Prestação de Serviço"}
          open={openModalTermAndCondition}
          close={() => setOpenModalTermAndCondition(false)}
          content={<div>Coloque o conteudo aqui</div>}
          buttons={
            <Button
              fixedWidth
              text={"Fechar"}
              handleButton={() => setOpenModalTermAndCondition(false)}
            />
          }
        />
      )}

      {success && (
        <AlertSuccess
          open={success}
          message={"Cadastro concluído :)"}
          image={successClient}
          close={() => setSuccess(false)}
        />
      )}

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default CompanyRegistration;
