import React, { useState, FunctionComponent } from "react";

import { Container } from "./styles";

import { OTSubscriber } from "opentok-react";
// import Checkbox from "components/checkbox";
import useWindowSize from "hooks/useWindowSize";

interface Props {}

const Subscriber: FunctionComponent<Props> = () => {
  const { width, height } = useWindowSize();
  const [error, setError] = useState<any>(null);
  const [audio, setAudio] = useState<boolean>(true);
  const [video, setVideo] = useState<boolean>(true);

  const onError = (err: any) => {
    setError(`Failed to subscribe: ${err.message}`);
  };

  if (height) {
    return (
      <Container height={height}>
        {error && <div>{error}</div>}

        <OTSubscriber
          properties={{
            subscribeToAudio: audio,
            subscribeToVideo: video,
            width: "100%",
            height: height,
            showControls: false,
            fitMode: width > 736 ? "cover" : "contain",
          }}
          onError={onError}
        />

        {/* <Checkbox
          label={"Subscribe to Audio"}
          checked={audio}
          error={false}
          onChange={(e: any) => {
            setAudio(e);
          }}
        />
  
        <Checkbox
          label={"Subscribe to Video"}
          checked={video}
          error={false}
          onChange={(e: any) => {
            setVideo(e);
          }}
        /> */}
      </Container>
    );
  } else {
    return null;
  }
};

export default Subscriber;
