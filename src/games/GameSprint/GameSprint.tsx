import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Box, Paper } from "@material-ui/core";
import { Howl } from "howler";
import GameField from "./GameField";
import Score from "./Score";
import Time from "./Time";
import useTypedSelector from "../../hooks/useTypeSelector";

import "./GameSprint.scss";
import IUserWordData from "../../types/user-words-types";
import { STATUS_DELETED } from "../../constants/request-params";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import FinishGameModal from "../../components/FinishGameModal";
import { GamesNames } from "../../types/statistics-types";
import useKeyDown from "../../hooks/useKeyDown";

interface IGameSprintParams {
  words: IUserWordData[];
}

const GameSprint: FunctionComponent<IGameSprintParams> = ({
  words,
}: IGameSprintParams) => {
  const [isPlay, setIsPlay] = useState(true);
  const [score, setScore] = useState(0);
  const [levelBonus, setLevelBonus] = useState(1);
  const [currentChain, setCurrentChain] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [currentTranslate, setCurrentTranslate] = useState("");
  const correctWordsArray = useRef<IUserWordData[]>([]);
  const wrongWordsArray = useRef<IUserWordData[]>([]);
  const currentChainLength = useRef(0);
  const maxChainLength = useRef(0);
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { updateWordInGame } = useUpdateStatistic();

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

  useEffect(() => {
    if (words !== null && words[currentIndex]) {
      setCurrentWord(words[currentIndex].word);
      const random = Math.floor(Math.random() * 2);
      const generateRandom = (min: number, max: number): number => {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num === currentIndex ? generateRandom(0, words.length - 1) : num;
      };
      if (random === 0) {
        setCurrentTranslate(words[currentIndex].wordTranslate);
      } else {
        setCurrentTranslate(
          words[generateRandom(0, words.length - 1)].wordTranslate
        );
      }
    }
  }, [words, currentIndex]);

  const finishGame = useCallback(() => {
    setIsPlay(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answerClick = (e: any) => {
    let level = levelBonus;
    let chain = currentChain;
    let newScore = score;
    if (
      (e.target.innerHTML === "Верно" &&
        currentTranslate === words[currentIndex].wordTranslate) ||
      (e.target.innerHTML === "Неверно" &&
        currentTranslate !== words[currentIndex].wordTranslate)
    ) {
      correctSound.play();
      correctWordsArray.current.push(words[currentIndex]);
      if (
        isAuthenticated &&
        words[currentIndex].userWord?.status !== STATUS_DELETED
      ) {
        updateWordInGame(words[currentIndex], 0, 1);
      }
      currentChainLength.current += 1;
      if (currentChainLength.current > maxChainLength.current) {
        maxChainLength.current = currentChainLength.current;
      }
      if (levelBonus === 4) {
        chain = 0;
      } else if (currentChain === 3) {
        level += 1;
        chain = 0;
      } else {
        chain += 1;
      }
      newScore = score + 2 ** (levelBonus - 1) * 10;
    } else {
      wrongSound.play();
      wrongWordsArray.current.push(words[currentIndex]);
      if (
        isAuthenticated &&
        words[currentIndex].userWord?.status !== STATUS_DELETED
      ) {
        updateWordInGame(words[currentIndex], 1, 0);
      }
      currentChainLength.current = 0;
      level = 1;
      chain = 0;
    }
    setCurrentChain(chain);
    setLevelBonus(level);
    setScore(newScore);
    setCurrentIndex((index) => index + 1);
    if (currentIndex === words.length - 1) {
      finishGame();
    }
  };

  useKeyDown("ArrowLeft", () => {
    answerClick({ target: { innerHTML: "Неверно" } });
  });
  useKeyDown("ArrowRight", () => {
    answerClick({ target: { innerHTML: "Верно" } });
  });

  return (
    <>
      {!isPlay ? (
        <FinishGameModal
          gamingScore={score / 10 + maxChainLength.current}
          gameName={GamesNames.Sprint}
          longestSeries={maxChainLength.current}
          correctWords={correctWordsArray.current}
          mistakes={wrongWordsArray.current}
        />
      ) : (
        <div className="game-sprint">
          <Box className="game-sprint-panel">
            <Paper className="game-sprint-panel-score" elevation={3}>
              <Score score={score} />
            </Paper>
            <Paper className="game-sprint-panel-timer" elevation={3}>
              <Time finishGame={finishGame} />
            </Paper>
          </Box>
          <GameField
            currentWord={currentWord}
            currentTranslate={currentTranslate}
            onAnswerClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              answerClick(e)
            }
            levelBonus={levelBonus}
            currentChain={currentChain}
          />
        </div>
      )}
    </>
  );
};

export default GameSprint;
