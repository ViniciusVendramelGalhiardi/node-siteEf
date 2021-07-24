import React, { useState, useEffect, useMemo } from "react";

import { Container, ControlsContainer, Control } from "./styles";

import { useNavigate, useLocation } from "react-router-dom";

import {
  OTSession,
  OTStreams,
  preloadScript,
  createSession,
} from "opentok-react";

import { Backdrop, CircularProgress } from "@material-ui/core";
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
} from "@material-ui/icons";

import { useAuth } from "hooks/useAuth";
import { userTypes } from "config/contants";
import Publisher from "components/tokbox/publisher";
import Subscriber from "components/tokbox/subscribe";
import useWindowSize from "hooks/useWindowSize";
import { api } from "services/api";

interface Props {}

const VideoCall: React.FC = () => {
  const routeParams: any = useLocation();
  const { sessionId, professionalId, schedulingId } = routeParams.state;
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { user } = useAuth();
  const [connection, setConnection] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const [audio, setAudio] = useState<boolean>(true);
  const [video, setVideo] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey: any = process.env.REACT_APP_TOKBOX_API_KEY;

  function handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }

  const cancelAppointment = async () => {
    try {
      await api.post(
        `web/atualizarStatusAgendamento/?IdAgenda=${schedulingId}&StatusAgendamento=0`
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  async function disconnectSession() {
    await createSession({ apiKey, sessionId, token }).disconnect();
    await cancelAppointment();

    if (user && user.userType === userTypes.client) {
      navigate("/avaliar-atendimento", { state: professionalId });
    } else {
      navigate("/minha-conta");
    }
  }

  const sessionEvents = {
    sessionConnected: () => {
      setConnection(true);
    },
    sessionDisconnected: () => {
      setConnection(false);
    },
  };

  const onError = (err: any) => {
    setError(`Failed to connect: ${err.message}`);
  };

  const createToken = async () => {
    try {
      const { data } = await api.get(
        `tokbox/gerarTokenParaSessao/${sessionId}`
      );

      setToken(data.value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const init = async () => {
    await createToken();
  };

  useEffect(() => {
    init();
  }, []);

  const iconStyle: any = useMemo(() => {
    if (width > 736) {
      return { width: 40, height: 40, color: "#F2F2F2" };
    } else {
      return { width: 20, height: 20, color: "#F2F2F2" };
    }
  }, [width]);

  const iconOffStyle: any = useMemo(() => {
    if (width > 736) {
      return { width: 40, height: 40, color: "#FC0606" };
    } else {
      return { width: 20, height: 20, color: "#FC0606" };
    }
  }, [width]);

  return (
    <Container>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <OTSession
            apiKey={apiKey}
            sessionId={sessionId}
            token={token}
            eventHandlers={sessionEvents}
            onError={onError}
          >
            {error ? <div>{error}</div> : null}

            <label>{connection}</label>

            <Publisher audio={audio} video={video} />

            <OTStreams>
              <Subscriber />
            </OTStreams>
          </OTSession>

          <ControlsContainer>
            <Control
              color={!audio ? "#FC0606" : "#F2F2F2"}
              onClick={() => setAudio(!audio)}
            >
              {audio ? (
                <Mic style={iconStyle} />
              ) : (
                <MicOff style={iconOffStyle} />
              )}
            </Control>

            <Control color={"#FC0606"} onClick={disconnectSession}>
              <CallEnd style={iconOffStyle} />
            </Control>

            <Control
              color={!video ? "#FC0606" : "#F2F2F2"}
              onClick={() => setVideo(!video)}
            >
              {video ? (
                <Videocam style={iconStyle} />
              ) : (
                <VideocamOff style={iconOffStyle} />
              )}
            </Control>
          </ControlsContainer>
        </>
      )}
    </Container>
  );
};

export default preloadScript(VideoCall);
