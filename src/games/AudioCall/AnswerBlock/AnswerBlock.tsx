/* eslint-disable react/jsx-curly-brace-presence */
import React, { FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import { Box, Fab } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Howl } from "howler";
import useKeyDown from "../../../hooks/useKeyDown";
import "./AnswerBlock.scss";

interface IAnswerBlock {
  wordsTranslations: string[];
  onNextWord: () => void;
  wordTranslate: string;
  changeAnswerBlock: (flag: boolean) => void;
  isAnswer: boolean;
}

const AnswerBlock: FunctionComponent<IAnswerBlock> = (props: IAnswerBlock) => {
  const {
    wordsTranslations = [],
    onNextWord,
    wordTranslate,
    changeAnswerBlock,
    isAnswer,
  } = props;

  const [wrongSound] = useState(
    new Howl({
      src: ["static/audio/wrong.wav"],
      volume: 0.3,
    })
  );
  const [correctSound] = useState(
    new Howl({
      src: ["static/audio/correct.mp3"],
      volume: 0.3,
    })
  );

  const getAnswer = (e: React.MouseEvent<HTMLButtonElement> | null = null) => {
    let flag = false;
    if (e) {
      const value = e.currentTarget.innerText.substr(2).toLocaleLowerCase();
      if (value === wordTranslate) {
        flag = true;
      }
    }

    if (flag) {
      correctSound.play();
    } else {
      wrongSound.play();
    }
    changeAnswerBlock(flag);
  };

  const listItems = wordsTranslations.map((word: string, index: number) => {
    let correctWord = "";
    const randomKey = `${Math.random() * 1000}${word}`;
    if (word === wordTranslate && isAnswer) {
      correctWord = "correctWord";
    }
    return (
      <Fab
        key={randomKey}
        variant="extended"
        aria-hidden="true"
        className="answer-list-item"
        color={correctWord ? "primary" : "default"}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => getAnswer(e)}
      >
        {`${index + 1} ${word}`}
      </Fab>
    );
  });

  const EnterLabel = (
    <Box mt={2}>
      <Alert variant="filled" severity="info">
        {`Или нажмите "ENTER"`}
      </Alert>
    </Box>
  );

  useKeyDown("Enter", () => {
    if (isAnswer) {
      onNextWord();
    } else {
      getAnswer();
    }
  });

  if (isAnswer) {
    return (
      <div className="answer-block">
        <div className="answer-block-list list-answer">{listItems}</div>
        <Button
          variant="contained"
          color="primary"
          className="answer-block-button"
          onClick={() => onNextWord()}
        >
          Слудующее
        </Button>
        {EnterLabel}
      </div>
    );
  }
  return (
    <div className="answer-block">
      <div className="answer-block-list">{listItems}</div>
      <Button
        variant="contained"
        color="primary"
        className="answer-block-button"
        onClick={() => getAnswer()}
      >
        Не знаю
      </Button>
      {EnterLabel}
    </div>
  );
};

export default AnswerBlock;
