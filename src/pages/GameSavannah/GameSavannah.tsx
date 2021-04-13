/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { nanoid } from "nanoid";
import "./GameSavannah.scss";
import { GlobalHotKeys } from "react-hotkeys";
import { Howl } from "howler";
import crystal from "../../assets/savannah-crystal.png";
import heart from "../../assets/heart.png";
import emptyHeart from "../../assets/empty-heart.png";
import IUserWordData from "../../types/user-words-types";

interface IGameSavannahParams {
  words: IUserWordData[];
}

const GameSavannah: React.FunctionComponent<IGameSavannahParams> = (
  props: IGameSavannahParams
) => {
  const { words } = props;
  const [index, setIndex] = useState(0);
  const [guessWord, setGuessWord] = useState(words[0]);
  const [animated, setAnimated] = useState(nanoid());
  const [options, setOptions] = useState<IUserWordData[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [attempts, setAttempts] = useState(5);
  const [crystalWidth, setCrystalWidth] = useState(100);
  const [animateCrystal, setAnimateCrystal] = useState(nanoid());

  const gameMusic = new Howl({
    src: ["static/audio/savannah-back.mp3"],
    volume: 0.2,
    loop: true,
  });
  const wrongSound = new Howl({
    src: ["static/audio/wrong.wav"],
    volume: 0.3,
  });
  const correctSound = new Howl({
    src: ["static/audio/correct.mp3"],
    volume: 0.3,
  });

  useEffect(() => {
    if (isStarted && !isFinished) {
      if (index >= words.length) {
        setIsFinished(true);
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
    if (attempts === 0) {
      setIsFinished(true);
    }
  }, [attempts]);

  const animationIterationandler = (
    e: React.AnimationEvent<HTMLDivElement>
  ) => {
    if (e.animationName === "moveword") {
      setIndex(index + 1);
      setAttempts(attempts - 1);
      wrongSound.play();
    }
  };
  const guessClickHandler = (word: IUserWordData) => {
    if (word.wordTranslate === guessWord.wordTranslate) {
      setIndex(index + 1);
      setCrystalWidth(crystalWidth + 2);
      setAnimateCrystal(nanoid());
      correctSound.play();
    } else {
      setAttempts(attempts - 1);
      setIndex(index + 1);
      wrongSound.play();
    }
  };
  const countdownCompleteHandler = () => {
    setIsStarted(true);
  };

  return (
    <div className="game-container">
      {isFinished ? (
        ""
      ) : (
        <>
          {isStarted ? (
            <>
              {" "}
              <div className="hearts-container">
                {[...Array(attempts)].map(() => {
                  return (
                    <img
                      className="hearts-container--heart"
                      key={nanoid()}
                      src={heart}
                      alt="heart-img"
                    />
                  );
                })}
                {[...Array(5 - attempts)].map(() => {
                  return (
                    <img
                      className="hearts-container--heart"
                      key={nanoid()}
                      src={emptyHeart}
                      alt="heart-img"
                    />
                  );
                })}
              </div>
              <div
                key={animated}
                className="game-container--guess-word animation"
                onAnimationIteration={(e) => {
                  animationIterationandler(e);
                }}
              >
                {guessWord.word}
              </div>
              <div className="game-container--buttons">
                {options.map((option, id) => {
                  return (
                    <GlobalHotKeys
                      key={nanoid()}
                      keyMap={{
                        GUESS: ["1", "2", "3", "4"],
                      }}
                      handlers={{
                        GUESS: (e) => {
                          guessClickHandler(options[Number(e?.key) - 1]);
                        },
                      }}
                    >
                      <button
                        type="button"
                        className="game-container--buttons-button"
                        onClick={(e) => {
                          guessClickHandler(option);
                          e.currentTarget.blur();
                        }}
                      >
                        {`${id + 1} ${option.wordTranslate}`}
                      </button>
                    </GlobalHotKeys>
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
