/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from "moment";
import { NO_STATUS } from "../constants/request-params";
import {
  defaultTodayState,
  GamesNames,
  IGameStatisticsData,
  IStatisticsData,
} from "../types/statistics-types";
import IUserWordData from "../types/user-words-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useUpdateStatistic = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);
  const { userId, token } = useTypedSelector((state) => state.auth);
  const { updateStatisticsAction, updateUserWord, setIsUpdated } = useActions();

  const updateStatisticState = (statistic: IStatisticsData) => {
    const now = moment();
    if (
      new Date(now.format("YYYY-MM-DD")) >
      new Date(statistic.optional.today.date)
    ) {
      const today = {
        ...defaultTodayState,
        date: new Date(now.format("YYYY-MM-DD")),
      };
      const previousDay = statistic.optional.today;
      statistic.optional.allTime.push({
        ...previousDay,
        learnedWords: statistic.learnedWords,
      });
      statistic.optional.today = today;
    }
    setIsUpdated(true);
    return statistic;
  };

  const updateWordInGame = (
    word: IUserWordData,
    wrong: number,
    correct: number
  ) => {
    const isLearn = word.userWord?.isLearn;
    const now = moment();
    const stat = updateStatisticState({ ...statistics });
    stat.optional.today.correctAnswers += correct;
    stat.optional.today.wrongAnswers += wrong;
    if (isLearn) {
      if (moment(word.userWord.optional.lastLearn).isBefore(now, "day")) {
        stat.optional.today.dayLearns += 1;
      }
      const userWord = { ...word.userWord };
      userWord.optional.lastLearn = new Date(now.format("YYYY-MM-DD"));
      userWord.optional.correctAnswers += correct;
      userWord.optional.wrongAnswers += wrong;
      updateUserWord(word._id, userWord, userId, token);
      updateStatisticsAction(stat, userId, token);
      return;
    }
    updateUserWord(
      word._id,
      {
        isLearn: true,
        status: NO_STATUS,
        optional: {
          correctAnswers: correct,
          wrongAnswers: wrong,
          lastLearn: new Date(now.format("YYYY-MM-DD")),
          learned: new Date(now.format("YYYY-MM-DD")),
        },
      },
      userId,
      token
    );
    stat.optional.today.dayLearns += 1;
    updateStatisticsAction(stat, userId, token, 1, 1);
  };

  const updateLearnedWords = (learnedWords: number, learnedWordsToday = 0) => {
    const stat = updateStatisticState({ ...statistics });
    updateStatisticsAction(
      stat,
      userId,
      token,
      learnedWords,
      learnedWordsToday
    );
  };

  const updateDayLearnsStatistic = (wrong: number, correct: number) => {
    const stat = updateStatisticState({ ...statistics });
    stat.optional.today.correctAnswers += correct;
    stat.optional.today.wrongAnswers += wrong;
  };

  const updateGameStatistics = (
    gameName: GamesNames,
    gameResult: IGameStatisticsData
  ) => {
    const { wrong, correct, streak } = gameResult;
    const stat = updateStatisticState({ ...statistics });
    const gameStat = stat.optional.today[gameName] as IGameStatisticsData;
    let newStreak = gameStat.streak;
    if (streak > gameStat.streak) newStreak = streak;
    const newGameStat = {
      streak: newStreak,
      wrong: stat.optional.today[gameName].wrong + wrong,
      correct: stat.optional.today[gameName].correct + correct,
    };
    stat.optional.today[gameName] = newGameStat;

    updateStatisticsAction(stat, userId, token);
  };

  return {
    updateStatisticState,
    updateGameStatistics,
    updateLearnedWords,
    updateDayLearnsStatistic,
    updateWordInGame,
    statistics,
  };
};

export default useUpdateStatistic;
