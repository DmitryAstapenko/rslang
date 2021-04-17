/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Howl } from "howler";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  BACKEND_PATH,
  NO_STATUS,
  STATUS_DELETED,
  STATUS_HARD,
} from "../constants/request-params";
import IUserWordData from "../types/user-words-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";
import useUpdateStatistic from "./useUpdateStatistic";

const useWordCard = (word: IUserWordData) => {
  const { updateUserWord } = useActions();
  const { updateLearnedWords } = useUpdateStatistic();
  const { userId, token } = useTypedSelector((state) => state.auth);

  const [playSound, setPlaySound] = useState(false);

  const [audioExample] = useState(
    new Howl({
      src: [`${BACKEND_PATH}${word.audioExample}`],
      volume: 0.5,
      onend: () => {
        setPlaySound(false);
      },
    })
  );
  const [audioMeaning] = useState(
    new Howl({
      src: [`${BACKEND_PATH}${word.audioMeaning}`],
      volume: 0.5,
      onend: () => {
        audioExample.play();
      },
    })
  );
  const [wordAudio] = useState(
    new Howl({
      src: [`${BACKEND_PATH}${word.audio}`],
      volume: 0.5,
      onend: () => {
        audioMeaning.play();
      },
    })
  );

  useEffect(() => {
    if (!playSound) {
      wordAudio.stop();
      audioMeaning.stop();
      audioExample.stop();
    } else if (
      !wordAudio.playing() &&
      !audioMeaning.playing() &&
      !audioExample.playing()
    )
      wordAudio.play();
  }, [playSound]);

  useEffect(() => {
    return () => {
      audioExample.stop();
      wordAudio.stop();
      audioMeaning.stop();
    };
  }, []);

  const handelMuteButtonClick = () => {
    setPlaySound(!playSound);
  };

  const changeHardStatusHandler = () => {
    const isLearn = word.userWord?.isLearn;
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    if (!isLearn) {
      updateUserWord(
        word._id,
        {
          status: STATUS_HARD,
          isLearn: true,
          optional: {
            lastLearn: new Date(yesterday.format("YYYY-MM-DD")),
            learned: new Date(now.format("YYYY-MM-DD")),
            wrongAnswers: 0,
            correctAnswers: 0,
          },
        },
        userId,
        token
      );
      updateLearnedWords(1, 1);
    } else {
      updateUserWord(
        word._id,
        {
          ...word.userWord,
          status: STATUS_HARD,
          isLearn: true,
        },
        userId,
        token
      );
    }
  };

  const changeNoStatusHandler = () => {
    const status = word.userWord?.status;
    let isLearn = false;
    if (status === STATUS_HARD) {
      isLearn = true;
    }
    updateUserWord(
      word._id,
      {
        ...word.userWord,
        status: NO_STATUS,
        isLearn,
      },
      userId,
      token,
      true
    );
  };

  const changeDeletedStatusHandler = () => {
    const isLearn = word.userWord?.isLearn;
    const now = moment();
    if (isLearn) {
      if (moment(word.userWord.optional.learned).isSame(now, "day")) {
        updateLearnedWords(-1, -1);
      } else {
        updateLearnedWords(-1);
      }
      updateUserWord(
        word._id,
        {
          ...word.userWord,
          optional: {
            ...word.userWord.optional,
            correctAnswers: 0,
            wrongAnswers: 0,
          },
          status: STATUS_DELETED,
          isLearn: false,
        },
        userId,
        token,
        true
      );
    } else {
      updateUserWord(
        word._id,
        {
          ...word.userWord,
          status: STATUS_DELETED,
          isLearn: false,
        },
        userId,
        token,
        true
      );
    }
  };

  return {
    handelMuteButtonClick,
    changeHardStatusHandler,
    changeDeletedStatusHandler,
    changeNoStatusHandler,
    playSound,
  };
};

export default useWordCard;
