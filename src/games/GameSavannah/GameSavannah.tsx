/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { nanoid } from "nanoid";
import "./GameSavannah.scss";
import { GlobalHotKeys } from "react-hotkeys";
import { Howl } from "howler";
import {
  Typography,
  Grid,
  Switch,
  IconButton,
  Paper,
  Fab,
} from "@material-ui/core";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import crystal from "../../assets/savannah-crystal.png";
import heart from "../../assets/heart.png";
import emptyHeart from "../../assets/empty-heart.png";
import IUserWordData from "../../types/user-words-types";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import { STATUS_DELETED } from "../../constants/request-params";
import useTypedSelector from "../../hooks/useTypeSelector";
import FinishGameModal from "../../components/FinishGameModal";
import { GamesNames } from "../../types/statistics-types";

interface IGameSavannahParams {
  words: IUserWordData[];
}

const GameSavannah: React.FunctionComponent<IGameSavannahParams> = (
  props: IGameSavannahParams
) => {
  const { words } = props;
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { updateWordInGame } = useUpdateStatistic();
  const [index, setIndex] = useState(0);
  const [guessWord, setGuessWord] = useState(words[0]);
  const [animated, setAnimated] = useState(nanoid());
  const [options, setOptions] = useState<IUserWordData[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [attempts, setAttempts] = useState(5);
  const [crystalWidth, setCrystalWidth] = useState(100);
  const [animateCrystal, setAnimateCrystal] = useState(nanoid());
  const [langSwitchState, setLangSwitchState] = React.useState(true);
  const [playMusic, setPlayMusic] = useState(false);
  const series = useRef(0);
  const longestSeries = useRef(0);
  const correctWords = useRef<IUserWordData[]>([]);
  const mistakes = useRef<IUserWordData[]>([]);

  const [gameMusic] = useState(
    new Howl({
      src: ["static/audio/savannah-back.mp3"],
      volume: 0.15,
      loop: true,
    })
  );
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
    if (isStarted && !isFinished) {
      if (index >= words.length) {
        setIsFinished(true);
        gameMusic.stop();
        if (series.current > longestSeries.current) {
          longestSeries.current = series.current;
        }
        return;
      }
      setGuessWord(words[index]);
      setAnimated(nanoid());
      const optionWords = [...words.slice(0, index), ...words.slice(index + 1)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      optionWords.push(words[index]);
      optionWords.sort(() => Math.random() - 0.5);
      setOptions(optionWords);
    }
  }, [index, isStarted, isFinished]);

  useEffect(() => {
    return () => {
      gameMusic.stop();
      wrongSound.stop();
      correctSound.stop();
    };
  }, []);

  useEffect(() => {
    if (attempts === 0) {
      setIsFinished(true);
      gameMusic.stop();
    }
  }, [attempts]);

  const animationIterationHandler = (
    e: React.AnimationEvent<HTMLDivElement>
  ) => {
    if (e.animationName === "moveword") {
      if (isAuthenticated && guessWord.userWord?.status !== STATUS_DELETED) {
        updateWordInGame(guessWord, 1, 0);
      }
      setIndex(index + 1);
      setAttempts(attempts - 1);
      if (series.current > longestSeries.current) {
        longestSeries.current = series.current;
      }
      series.current = 0;
      mistakes.current.push(guessWord);
      wrongSound.play();
    }
  };
  const guessClickHandler = (word: IUserWordData) => {
    if (word.wordTranslate === guessWord.wordTranslate) {
      if (isAuthenticated && guessWord.userWord?.status !== STATUS_DELETED) {
        updateWordInGame(guessWord, 0, 1);
      }
      series.current += 1;
      correctWords.current.push(guessWord);
      setIndex(index + 1);
      setCrystalWidth(crystalWidth + 2);
      setAnimateCrystal(nanoid());
      correctSound.play();
    } else {
      if (isAuthenticated && guessWord.userWord?.status !== STATUS_DELETED) {
        updateWordInGame(guessWord, 1, 0);
      }
      if (series.current > longestSeries.current) {
        longestSeries.current = series.current;
      }
      series.current = 0;
      mistakes.current.push(guessWord);
      setIndex(index + 1);
      setAttempts(attempts - 1);
      wrongSound.play();
    }
  };
  const countdownCompleteHandler = () => {
    setIsStarted(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLangSwitchState(event.target.checked);
    event.currentTarget.blur();
  };

  const handelMuteButtonClick = () => {
    setPlayMusic(!playMusic);
  };

  useEffect(() => {
    if (!playMusic) {
      gameMusic.stop();
    } else if (!gameMusic.playing()) gameMusic.play();
  }, [playMusic]);

  return (
    <div className="game-container">
      {isFinished ? (
        <FinishGameModal
          gamingScore={correctWords.current.length * 2 + longestSeries.current}
          gameName={GamesNames.Savanna}
          longestSeries={longestSeries.current}
          correctWords={correctWords.current}
          mistakes={mistakes.current}
        />
      ) : (
        <>
          {isStarted ? (
            <>
              {" "}
              <div className="game-info-container">
                <Paper className="hearts">
                  {[...Array(attempts)].map(() => {
                    return (
                      <img
                        className="hearts--heart"
                        key={nanoid()}
                        src={heart}
                        alt="heart-img"
                      />
                    );
                  })}
                  {[...Array(5 - attempts)].map(() => {
                    return (
                      <img
                        className="hearts--heart"
                        key={nanoid()}
                        src={emptyHeart}
                        alt="heart-img"
                      />
                    );
                  })}
                </Paper>
                <Paper className="game-settings">
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>RU</Grid>
                      <Grid item>
                        <Switch
                          checked={langSwitchState}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item>ENG</Grid>
                    </Grid>
                  </Typography>
                  <Typography component="div">
                    <IconButton
                      aria-label="sound"
                      onClick={handelMuteButtonClick}
                    >
                      {" "}
                      {playMusic ? (
                        <VolumeUpIcon fontSize="large" />
                      ) : (
                        <VolumeOffIcon fontSize="large" />
                      )}
                    </IconButton>
                  </Typography>
                </Paper>
              </div>
              <div
                key={animated}
                className="game-container--guess-word animation"
                onAnimationIteration={(e) => {
                  animationIterationHandler(e);
                }}
              >
                {!langSwitchState ? guessWord.wordTranslate : guessWord.word}
              </div>
              <div className="game-container--buttons">
                {options.map((option, id) => {
                  return (
                    <div key={nanoid()}>
                      <GlobalHotKeys
                        keyMap={{
                          GUESS: ["1", "2", "3", "4"],
                        }}
                        handlers={{
                          GUESS: (e) => {
                            guessClickHandler(options[Number(e?.key) - 1]);
                          },
                        }}
                      />
                      <Fab
                        variant="extended"
                        className="game-container--buttons-button"
                        onClick={(e) => {
                          guessClickHandler(option);
                          e.currentTarget.blur();
                        }}
                      >
                        {`${id + 1} ${
                          !langSwitchState ? option.word : option.wordTranslate
                        }`}
                      </Fab>
                    </div>
                  );
                })}
              </div>
              <img
                className="crystal"
                key={animateCrystal}
                src={crystal}
                alt="crystal-img"
                style={{ width: crystalWidth }}
              />
            </>
          ) : (
            <Countdown
              date={Date.now() + 5000}
              onComplete={countdownCompleteHandler}
              renderer={({ seconds }) => (
                <div className="timer">
                  <div className="timer--time">{seconds}</div>
                  <div className="timer-animate" />
                </div>
              )}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GameSavannah;
