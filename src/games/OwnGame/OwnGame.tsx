/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import { Box, Button, Typography } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSound from "use-sound";
import FinishGameModal from "../../components/FinishGameModal";
import { STATUS_DELETED } from "../../constants/request-params";
import useKeyDown from "../../hooks/useKeyDown";
import useTypedSelector from "../../hooks/useTypeSelector";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import { GamesNames } from "../../types/statistics-types";
import IUserWordData from "../../types/user-words-types";
import Game from "./Game";
import "./OwnGame.scss";

interface IOwnGameProps {
  words?: IUserWordData[];
}

type PrevWord = {
  word: string;
  isCorrect: boolean;
};

const OwnGame: FC<IOwnGameProps> = (props: IOwnGameProps) => {
  const wordList = useMemo(() => props.words, [props.words]);
  const [game, setGame] = useState<Game | undefined>();
  const [currentWord, setCurrentWord] = useState<
    IUserWordData | undefined | null
  >(null);
  const [inputValue, setInputValue] = useState("");
  const numberOfSeconds = useMemo(() => 90, []);
  const [timer, setTimer] = useState<number>(numberOfSeconds);
  const [isFinish, setIsFinish] = useState(false);
  const numberOfCorrectAnswers = useRef(0);
  const series = useRef(0);
  const longestSeries = useRef(0);
  const correctWords = useRef<IUserWordData[]>([]);
  const mistakes = useRef<IUserWordData[]>([]);
  const [prevWords, setPrevWords] = useState<PrevWord[]>([]);
  const { updateWordInGame } = useUpdateStatistic();
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const [correctSound] = useSound("static/audio/correct.mp3", { volume: 0.3 });
  const [wrongSound] = useSound("static/audio/wrong.wav", { volume: 0.3 });

  const setNext = useCallback(() => {
    setCurrentWord(game?.nextWord());
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
    if (typeof currentWord === "undefined") {
      setIsFinish(true);
    }
  }, [currentWord, game]);

  useEffect(() => {
    return () => {
      if (isFinish) {
        setCurrentWord(null);
      }
    };
  }, [isFinish]);

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
          if (
            isAuthenticated &&
            currentWord.userWord?.status !== STATUS_DELETED
          ) {
            updateWordInGame(currentWord, 0, 1);
          }
          correctSound();
          setNext();
        }
      }
    },
    [
      correctSound,
      currentWord,
      game,
      isAuthenticated,
      setNext,
      updateWordInGame,
    ]
  );

  const skipHandler = useCallback(() => {
    if (currentWord && !isFinish) {
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
      if (isAuthenticated && currentWord.userWord?.status !== STATUS_DELETED) {
        updateWordInGame(currentWord, 1, 0);
      }
      wrongSound();
      setNext();
    }
  }, [
    currentWord,
    isAuthenticated,
    isFinish,
    setNext,
    updateWordInGame,
    wrongSound,
  ]);

  useKeyDown("Space", skipHandler);

  const separateText = useMemo(
    () => currentWord?.textMeaning.split(/<i>.*<\/i>/),
    [currentWord]
  );

  return (
    <>
      <div className="own-game__background" />
      {isFinish ? (
        <FinishGameModal
          gamingScore={correctWords.current.length * 5 + longestSeries.current}
          gameName={GamesNames.KnowWords}
          longestSeries={longestSeries.current}
          correctWords={correctWords.current}
          mistakes={mistakes.current}
        />
      ) : (
        <div className="own-game">
          <div className="own-game__content">
            <div className="own-game__timer-container">
              <div
                className="own-game__timer"
                style={{
                  boxShadow: `inset 0px 0px ${
                    (numberOfSeconds - timer) / 4
                  }px 0px rgb(233, 0, 0, 0.7)`,
                  border: `2px solid rgb(150, ${timer * 1.67}, ${
                    timer * 1.67
                  })`,
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
                className={`${
                  !inputValue
                    ? ""
                    : game?.startsWith(inputValue)
                    ? "correct"
                    : "wrong"
                } own-game__input ${
                  separateText?.[0]
                    ? "own-game__input_lower"
                    : "own-game__input_capitalize"
                }`}
                type="text"
                onChange={changeHandler}
                value={inputValue}
                placeholder={`starts with "${currentWord?.word[0].toUpperCase()}"`}
              />
              {separateText?.[1]}
            </Typography>
            <div className="btn-container">
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={skipHandler}
              >
                Пропустить
              </Button>
              <Box ml={2}>
                <Alert variant="filled" severity="info">
                  {`Или нажмите "ПРОБЕЛ"`}
                </Alert>
              </Box>
            </div>
          </div>
          <div className="own-game__words">
            {prevWords.map((word, i) => (
              <div key={i} className="own-game__words_item">
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
      )}
    </>
  );
};

OwnGame.defaultProps = undefined;

export default OwnGame;
