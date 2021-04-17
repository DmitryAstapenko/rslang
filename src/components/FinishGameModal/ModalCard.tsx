import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import useSound from "use-sound";
import React, { FC } from "react";
import IUserWordData from "../../types/user-words-types";
import { BACKEND_PATH } from "../../constants/request-params";

interface IModalCardProps {
  correct: boolean;
  word: IUserWordData;
}

const ModalCard: FC<IModalCardProps> = ({ word, correct }: IModalCardProps) => {
  const [playWord] = useSound(`${BACKEND_PATH}${word.audio}`);
  return (
    <Button
      variant="contained"
      color={correct ? "primary" : "secondary"}
      startIcon={<PlayArrowIcon />}
      onClick={() => {
        playWord();
      }}
    >
      {`${word.word} - ${word.wordTranslate}`}
    </Button>
  );
};

export default ModalCard;
