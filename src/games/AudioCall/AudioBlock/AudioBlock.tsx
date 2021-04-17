/* eslint-disable react/jsx-curly-brace-presence */
import React, { FunctionComponent, useEffect } from "react";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import useSound from "use-sound";
import "./AudioBlock.scss";
import { Avatar, Box, Fab, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { BACKEND_PATH } from "../../../constants/request-params";
import useKeyDown from "../../../hooks/useKeyDown";

interface IAudioProps {
  audio: string;
  image: string;
  isAnswer: boolean;
  word: string;
}

const AudioBlock: FunctionComponent<IAudioProps> = ({
  audio,
  image = "",
  isAnswer = false,
  word = "",
}: IAudioProps) => {
  const [play] = useSound(`${BACKEND_PATH}${audio}`);
  useEffect(() => {
    play();
  }, [play]);

  useKeyDown("Space", play);

  const imageElement = (
    <Avatar
      alt="answer-image"
      className="audio-block-image"
      src={`${BACKEND_PATH}${image}`}
    />
  );

  const SpaceLabel = (
    <Box mt={2}>
      <Alert
        variant="filled"
        severity="info"
      >{`Нажмите "ПРОБЕЛ", чтобы воспроизвести слово`}</Alert>
    </Box>
  );

  if (isAnswer) {
    return (
      <>
        {imageElement}
        <Box mt={2} className="audio-block-container">
          <Fab
            color="secondary"
            className="audio-block-answer"
            onClick={() => play()}
          >
            <VolumeDownIcon className="audio-block-icon" />
          </Fab>
          <Typography variant="h5" className="audio-block-word">
            {word}
          </Typography>
        </Box>
        {SpaceLabel}
      </>
    );
  }
  return (
    <>
      <Fab color="secondary" className="audio-block" onClick={() => play()}>
        <VolumeDownIcon className="audio-block-icon" />
      </Fab>
      {SpaceLabel}
    </>
  );
};

export default AudioBlock;
