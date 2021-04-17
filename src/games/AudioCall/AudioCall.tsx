import React, { useState, useEffect, useRef } from "react";
import AudioBlock from "./AudioBlock";
import AnswerBlock from "./AnswerBlock";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import IUserWordData from "../../types/user-words-types";
import useTypedSelector from "../../hooks/useTypeSelector";

import "./AudioCall.scss";
import { STATUS_DELETED } from "../../constants/request-params";
import FinishGameModal from "../../components/FinishGameModal";
import { GamesNames } from "../../types/statistics-types";

interface IAudioCallParams {
  words: IUserWordData[];
}

const AudioCall: React.FunctionComponent<IAudioCallParams> = ({
  words,
}: IAudioCallParams) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsTranslations, setWordsTranslations] = useState([""]);
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState(words[currentIndex]?.audio);
  const [wordTranslate, setWordTranslate] = useState("");
  const [word, setWord] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const { updateWordInGame } = useUpdateStatistic();
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  const correctWordsArray = useRef<IUserWordData[]>([]);
  const wrongWordsArray = useRef<IUserWordData[]>([]);
  const currentChainLength = useRef(0);
  const maxChainLength = useRef(0);

  useEffect(() => {
    if (words.length < 5) return;

    if (words[currentIndex]) {
      let imageStr = "";
      let wordTranslateStr = "";
      let wordStr = "";
      if (words) {
        imageStr = words[currentIndex].image;
        wordTranslateStr = words[currentIndex].wordTranslate;
        wordStr = words[currentIndex].word;
      }
      setImage(imageStr);
      setAudio(words[currentIndex].audio);
      setWordTranslate(wordTranslateStr);
      setWord(wordStr);
      const generateRandom = (min: number, max: number): number => {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
      };
      const arrayTranslations: string[] = [];
      if (words) {
        for (let i = 0; i < 4; i += 1) {
          const wordIndex =
            words[generateRandom(0, words.length - 1)].wordTranslate;
          if (
            arrayTranslations.indexOf(wordIndex) === -1 &&
            wordIndex !== wordTranslate
          ) {
            arrayTranslations.push(wordIndex);
          } else {
            i -= 1;
          }
        }
      }
      arrayTranslations.push(wordTranslate);
      arrayTranslations.sort(() => Math.random() - 0.5);
      setWordsTranslations(arrayTranslations);
    }
  }, [words, currentIndex, wordTranslate]);

  const nextWord = () => {
    setIsAnswer(false);
    setCurrentIndex((ind) => ind + 1);
    if (currentIndex === words.length - 1) {
      setIsFinish(true);
    }
  };

  const changeAnswerBlock = (status: boolean) => {
    if (status) {
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
    } else {
      wrongWordsArray.current.push(words[currentIndex]);
      if (
        isAuthenticated &&
        words[currentIndex].userWord?.status !== STATUS_DELETED
      ) {
        updateWordInGame(words[currentIndex], 1, 0);
      }
      currentChainLength.current = 0;
    }
    setIsAnswer(true);
  };

  return (
    <>
      {isFinish || words.length < 5 ? (
        <FinishGameModal
          gamingScore={
            correctWordsArray.current.length * 2 + maxChainLength.current
          }
          gameName={GamesNames.AudioCall}
          longestSeries={maxChainLength.current}
          correctWords={correctWordsArray.current}
          mistakes={wrongWordsArray.current}
        />
      ) : (
        <div className="audio-call">
          <AudioBlock
            audio={audio}
            image={image}
            word={word}
            isAnswer={isAnswer}
          />
          <AnswerBlock
            wordsTranslations={wordsTranslations}
            wordTranslate={wordTranslate}
            changeAnswerBlock={(status: boolean) => changeAnswerBlock(status)}
            onNextWord={() => nextWord()}
            isAnswer={isAnswer}
          />
        </div>
      )}
    </>
  );
};

export default AudioCall;
