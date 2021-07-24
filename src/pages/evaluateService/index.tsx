import React, { useState, useEffect, useCallback } from "react";

import {
  Container,
  Row,
  Column,
  Text,
  ProfileImage,
  ImageProfile,
  IconSvg,
  IconPath,
} from "./styles";

import { useNavigate, useLocation } from "react-router-dom";

import Rating from "@material-ui/lab/Rating";

import { useAuth } from "hooks/useAuth";
import TextArea from "components/textarea";
import Button from "components/button";
import AlertSuccess from "components/alerts/alertSuccess";
import useWindowSize from "hooks/useWindowSize";

import professionalReview from "assets/images/png/professionalReview.png";
import { api } from "services/api";
import { userTypes } from "config/contants";
import Loading from "components/loading";

const EvaluateService: React.FC = () => {
  const { width } = useWindowSize();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [professionalData, setProfessionalData] = useState<any>({});
  const [ratingEfetivaSaude, setRatingEfetivaSaude] = useState<number>(0);
  const [ratingProfessional, setRatingProfessional] = useState<number>(0);
  const [ratingContinueService, setRatingContinueService] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSuccess = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      navigate("/minha-conta");
    }, 2500);
  };

  const submitReview = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        IdProfissional: state,
        IdUsuario: user.id,
        NotaEfetivaSaude: ratingEfetivaSaude,
        NotaProfissional: ratingProfessional,
        DarContinuidade: ratingContinueService,
        Descricao_atendimento: description,
        Sugestoes: suggestion,
      };

      console.log("params", params);

      const { data } = await api.post("web/cadastraAvaliacaoService", params);

      console.log("data", data);

      setLoading(false);
      await handleSuccess();
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }, [
    ratingEfetivaSaude,
    ratingProfessional,
    ratingContinueService,
    description,
    suggestion,
    user,
  ]);

  const getProfession = async (prof: any) => {
    try {
      const { data } = await api.get(`web/ListaProfissao`);

      prof.Profissao = data.filter(
        (element: any) => element.Id == prof.IdProfissao
      )[0].Nome;

      console.log("prof", prof);

      setProfessionalData(prof);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const getProfessional = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `web/BuscarUsuario/${state}/${userTypes.professional}`
      );

      await getProfession(data);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const init = async () => {
    await getProfessional();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Row
        padding={"50px 20px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          color={"#002464"}
          size={width > 598 ? "30px" : "20px"}
          bold
          center
        >
          Sua avaliação é muito importante ;)
        </Text>
      </Row>

      <Row padding={"0px 20px"} alignItems={"center"} justifyContent={"center"}>
        <ProfileImage width={"88px"} height={"88px"}>
          {professionalData.Imagem ? (
            <ImageProfile
              width={"88px"}
              height={"88px"}
              image={professionalData.Imagem}
            />
          ) : (
            <IconSvg
              width={"80px"}
              height={"80px"}
              viewBox="9.437 8.001 16.794 22.21"
            >
              <IconPath d="M 13.9658842086792 24.56034660339355 L 10.06332588195801 26.68905639648438 C 9.834314346313477 26.81392669677734 9.628500938415527 26.96742248535156 9.437000274658203 27.13474082946777 C 11.71230030059814 29.05319786071777 14.6494607925415 30.21059226989746 17.85857391357422 30.21059226989746 C 21.04399299621582 30.21059226989746 23.96239852905273 29.07047271728516 26.23128318786621 27.17817306518555 C 26.02201461791992 27.00147819519043 25.79497909545898 26.84255409240723 25.54326438903809 26.71718978881836 L 21.36431121826172 24.62796020507813 C 20.82435989379883 24.35798454284668 20.48331069946289 23.80618858337402 20.48331069946289 23.20256614685059 L 20.48331069946289 21.56296920776367 C 20.60077857971191 21.42921447753906 20.73502540588379 21.2574577331543 20.8786506652832 21.05460548400879 C 21.44821548461914 20.25010681152344 21.87909126281738 19.36515808105469 22.17769432067871 18.43677711486816 C 22.71369743347168 18.27143478393555 23.10854339599609 17.77639579772949 23.10854339599609 17.18807601928711 L 23.10854339599609 15.43792152404785 C 23.10854339599609 15.05294609069824 22.93727874755859 14.70893669128418 22.67125129699707 14.46808052062988 L 22.67125129699707 11.9381046295166 C 22.67125129699707 11.9381046295166 23.19096755981445 8.000996589660645 17.85906600952148 8.000996589660645 C 12.5271635055542 8.000996589660645 13.04687976837158 11.9381046295166 13.04687976837158 11.9381046295166 L 13.04687976837158 14.46808052062988 C 12.78035831451416 14.70893669128418 12.60958766937256 15.05294609069824 12.60958766937256 15.43792152404785 L 12.60958766937256 17.18807601928711 C 12.60958766937256 17.6490592956543 12.85192394256592 18.05476379394531 13.21469020843506 18.28920364379883 C 13.65198135375977 20.1928539276123 14.79703426361084 21.56296920776367 14.79703426361084 21.56296920776367 L 14.79703426361084 23.16209602355957 C 14.79654121398926 23.7444953918457 14.47770214080811 24.28099250793457 13.9658842086792 24.56034660339355 Z" />
            </IconSvg>
          )}
        </ProfileImage>

        <Column padding={width > 320 ? "0px 20px" : "0px 0px 0px 10px"}>
          <Text color={"#797979"} size={"15px"} bold>
            Profissional
          </Text>
          <Text color={"#797979"} size={"15px"}>
            {professionalData.Nome}
          </Text>
          <Text color={"#797979"} size={"15px"}>
            {professionalData.Profissao} - CRP{" "}
            {professionalData.RegistroCRPePsi}
          </Text>
        </Column>
      </Row>

      <Row padding={"50px 20px"} gap={"20px"} startMobile={"598px"}>
        <Column flex gap={"20px"}>
          <Column gap={"10px"}>
            <Text color={"#797979"} size={"15px"} bold>
              Como foi sua experiência com a Efetiva Saúde?
            </Text>

            <Rating
              size="large"
              value={ratingEfetivaSaude}
              onChange={(event, newValue: any) => {
                setRatingEfetivaSaude(newValue);
              }}
            />
          </Column>

          <Column gap={"10px"}>
            <Text color={"#797979"} size={"15px"} bold>
              Você recomendaria o profissional que o(a) atendeu?
            </Text>

            <Rating
              size="large"
              value={ratingProfessional}
              onChange={(event, newValue: any) => {
                setRatingProfessional(newValue);
              }}
            />
          </Column>

          <Column gap={"10px"}>
            <Text color={"#797979"} size={"15px"} bold>
              Você pretende dar continuidade ao atendimento?
            </Text>

            <Rating
              size="large"
              value={ratingContinueService}
              onChange={(event, newValue: any) => {
                setRatingContinueService(newValue);
              }}
            />
          </Column>
        </Column>

        <Column flex>
          <Column flex gap={"20px"}>
            <Column gap={"10px"}>
              <Text color={"#797979"} size={"15px"} bold>
                Se puder, conte-nos mais sobre seu atendimento
              </Text>

              <TextArea
                placeholder={"Máximo 500 caracteres."}
                minHeight={width > 598 ? "108px" : "252px"}
                maxHeight={width > 598 ? "108px" : "252px"}
                padding={"10px"}
                value={description}
                error={false}
                maxLength={500}
                onChange={(e: any) => setDescription(e.target.value)}
              />
            </Column>

            <Column gap={"10px"}>
              <Text color={"#797979"} size={"15px"} bold>
                Estamos muito interessados em suas sugestões, elogios e críticas
              </Text>

              <TextArea
                placeholder={"Máximo 500 caracteres."}
                minHeight={width > 598 ? "108px" : "252px"}
                maxHeight={width > 598 ? "108px" : "252px"}
                padding={"10px"}
                value={suggestion}
                error={false}
                maxLength={500}
                onChange={(e: any) => setSuggestion(e.target.value)}
              />
            </Column>
          </Column>
        </Column>
      </Row>

      <Row alignItems={"center"} justifyContent={"center"}>
        <Button
          fixedWidth
          text={"Enviar Avaliação"}
          handleButton={submitReview}
        />
      </Row>

      <AlertSuccess
        open={success}
        message={"Sessão concluída, muito obrigado :)"}
        image={professionalReview}
        close={() => setSuccess(false)}
      />

      {loading && <Loading open={loading} />}
    </Container>
  );
};

export default EvaluateService;
