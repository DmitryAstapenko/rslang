/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import { Button, Typography } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import FinishGameModal from "../../components/FinishGameModal/FinishGameModal";
import SectionModal from "../../components/SectionModal";
import IGameProps from "../../types/IGameProps";
import IWordData from "../../types/words-types";
import Game from "./Game";
import "./OwnGame.scss";

type PrevWord = {
  word: string;
  isCorrect: boolean;
};

const OwnGame: FC<IGameProps> = (props: IGameProps) => {
  const [wordList, setWordList] = useState<IWordData[] | undefined>(
    props.wordList
  );
  const [game, setGame] = useState<Game | undefined>();
  const [currentWord, setCurrentWord] = useState<IWordData | undefined>(); // "any" will be the word interface
  const [inputValue, setInputValue] = useState("");
  const numberOfSeconds = useMemo(() => 90, []);
  const [timer, setTimer] = useState<number>(numberOfSeconds);
  const [isFinish, setIsFinish] = useState(false);
  const totalWordCount = useRef(0);
  const numberOfCorrectAnswers = useRef(0);
  const series = useRef(0);
  const longestSeries = useRef(0);
  const correctWords = useRef<IWordData[]>([]);
  const mistakes = useRef<IWordData[]>([]);
  const [prevWords, setPrevWords] = useState<PrevWord[]>([]);

  const setNext = useCallback(() => {
    setCurrentWord(game?.nextWord());
    totalWordCount.current += 1;
    setInputValue("");
  }, [game]);

  useEffect(() => {
    if (wordList) {
      setGame(new Game(wordList));
      setTimer(numberOfSeconds);
    }
  }, [numberOfSeconds, wordList]);

  useEffect(() => {
    if (game) {
      setNext();
    }
  }, [game, setNext]);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (timer) {
      timeOut = setTimeout(() => {
        if (timer === 1) {
          setIsFinish(true);
        } else {
          setTimer(timer - 1);
        }
      }, 1000);
    }
    return () => clearTimeout(timeOut);
  }, [timer]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (currentWord) {
        const { value } = e.target;
        setInputValue(value);
        if (game?.isCorrect(value)) {
          numberOfCorrectAnswers.current += 1;
          series.current += 1;
          if (longestSeries.current < series.current) {
            longestSeries.current = series.current;
          }
          correctWords.current.push(currentWord);
          setPrevWords((prev) => [
            ...prev,
            {
              word: currentWord.word,
              isCorrect: true,
            },
          ]);
          setNext();
        }
      }
    },
    [currentWord, game, setNext]
  );

  const skipHandler = useCallback(() => {
    if (currentWord) {
      if (longestSeries.current < series.current) {
        longestSeries.current = series.current;
      }
      series.current = 0;
      mistakes.current.push(currentWord);
      setPrevWords((prev) => [
        ...prev,
        {
          word: currentWord.word,
          isCorrect: false,
        },
      ]);
      setNext();
    }
  }, [currentWord, setNext]);

  const separateText = useMemo(
    () => currentWord?.textMeaning.split(/<i>.*<\/i>/),
    [currentWord]
  );

  if (!wordList) {
    return <SectionModal setWordList={setWordList} />;
  }

  if (isFinish) {
    return (
      <FinishGameModal
        totalWordCount={totalWordCount.current - 1}
        numberOfCorrectAnswers={numberOfCorrectAnswers.current}
        longestSeries={longestSeries.current}
        correctWords={correctWords.current}
        mistakes={mistakes.current}
      />
    );
  }

  return (
    <div className="own-game">
      <div className="own-game__background" />
      <div className="own-game__content">
        <div className="own-game__timer-container">
          <div
            className="own-game__timer"
            style={{
              boxShadow: `inset 0px 0px ${
                (numberOfSeconds - timer) / 4
              }px 0px rgb(233, 0, 0, 0.7)`,
              border: `2px solid rgb(150, ${timer * 1.67}, ${timer * 1.67})`,
            }}
          >
            {(timer ?? numberOfSeconds) <= 6 ? (
              <div className="own-game__timer-animate" />
            ) : null}
            <Typography component="h4" variant="h4">
              {timer < 10 ? `0${timer}` : timer}
            </Typography>
          </div>
        </div>
        <Typography component="h5" variant="h5">
          {separateText?.[0]}{" "}
          <input
            className={
              !inputValue
                ? ""
                : game?.startsWith(inputValue)
                ? "correct"
                : "wrong"
            }
            type="text"
            onChange={changeHandler}
            value={inputValue}
            placeholder={`Starts with ${currentWord?.word[0].toUpperCase()}`}
          />
          {separateText?.[1]}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={skipHandler}
        >
          Skip
        </Button>
      </div>
      <div className="own-game__words">
        {prevWords.map((word) => (
          <div className="own-game__words_item">
            {word.isCorrect ? (
              <Check className="correct" />
            ) : (
              <Close className="wrong" />
            )}
            <Typography component="h6" variant="h6">
              {word.word}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

OwnGame.defaultProps = undefined;

export default OwnGame;
