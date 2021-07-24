import React, { useState, FunctionComponent } from "react";

import { Container } from "./styles";

import { OTPublisher } from "opentok-react";
import useWindowSize from "hooks/useWindowSize";

interface Props {
  audio?: boolean;
  video?: boolean;
}

const Publisher: FunctionComponent<Props> = ({ audio, video }) => {
  const { width } = useWindowSize();
  const [error, setError] = useState<any>(null);
  const [videoSource, setVideoSource] = useState<string>("camera");

  const onError = (err: any) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <Container>
      {error && <div>{error}</div>}

      {width ? (
        <OTPublisher
          properties={{
            publishAudio: audio,
            publishVideo: video,
            videoSource: videoSource === "screen" ? "screen" : undefined,
            width: "100%",
            height: width > 946 ? 192 : width > 736 ? 258 : 138,
            showControls: false,
            fitMode: "cover",
          }}
          onError={onError}
        />
      ) : null}
    </Container>
  );
};

export default Publisher;
