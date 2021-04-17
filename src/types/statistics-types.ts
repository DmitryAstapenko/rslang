import moment from "moment";

export enum GamesNames {
  Savanna = "savanna",
  Sprint = "sprint",
  AudioCall = "audioCall",
  KnowWords = "knowWords",
}

export interface IStatisticsData {
  learnedWords: number;
  optional: {
    today: IDayStatistics;
    allTime: AllTimeStatistic[];
  };
}
export interface AllTimeStatistic extends IDayStatistics {
  learnedWords: number;
}
export interface IDayStatistics {
  date: Date;
  dayLearns: number;
  learnedWordsToday: number;
  wrongAnswers: number;
  correctAnswers: number;
  savanna: IGameStatisticsData;
  sprint: IGameStatisticsData;
  audioCall: IGameStatisticsData;
  knowWords: IGameStatisticsData;
}

const defaultGameStatistics = {
  streak: 0,
  wrong: 0,
  correct: 0,
};

export const defaultTodayState = {
  date: new Date(moment().format("YYYY-MM-DD")),
  learnedWordsToday: 0,
  dayLearns: 0,
  wrongAnswers: 0,
  correctAnswers: 0,
  savanna: defaultGameStatistics,
  sprint: defaultGameStatistics,
  audioCall: defaultGameStatistics,
  knowWords: defaultGameStatistics,
};

export const defaultState: StatisticsState = {
  statistics: {
    learnedWords: 0,
    optional: {
      today: defaultTodayState,
      allTime: [],
    },
  },
  isUpdated: false,
  isFetching: true,
  error: null,
};

export interface IGameStatisticsData {
  streak: number;
  wrong: number;
  correct: number;
}

export interface StatisticsState {
  statistics: IStatisticsData;
  isFetching: boolean;
  isUpdated: boolean;
  error: null | string;
}

export enum StatisticsActionTypes {
  GET_STATISTICS = "GET_STATISTICS",
  GET_STATISTICS_SUCCESS = "GET_STATISTICS_SUCCESS",
  GET_STATISTICS_ERROR = "GET_STATISTICS_ERROR",
  UPDATE_STATISTICS = "UPDATE_STATISTICS",
  UPDATE_STATISTICS_SUCCESS = "UPDATE_STATISTICS_SUCCESS",
  UPDATE_STATISTICS_ERROR = "UPDATE_STATISTICS_ERROR",
  SET_IS_UPDATED = "SET_IS_UPDATED",
  RESET_STAT = "CLEAR_STAT",
}

interface GetStatisticsAction {
  type: StatisticsActionTypes.GET_STATISTICS;
}

interface GetStatisticsSuccessAction {
  type: StatisticsActionTypes.GET_STATISTICS_SUCCESS;
  payload: IStatisticsData;
}

interface GetStatisticsErrorAction {
  type: StatisticsActionTypes.GET_STATISTICS_ERROR;
  payload: string;
}

interface UpdateStatisticsAction {
  type: StatisticsActionTypes.UPDATE_STATISTICS;
}

interface UpdateStatisticsSuccessAction {
  type: StatisticsActionTypes.UPDATE_STATISTICS_SUCCESS;
  payload: IStatisticsData;
}

interface UpdateStatisticsErrorAction {
  type: StatisticsActionTypes.UPDATE_STATISTICS_ERROR;
  payload: string;
}

interface SetIsUpdatedAction {
  type: StatisticsActionTypes.SET_IS_UPDATED;
  payload: boolean;
}

interface ResetStatAction {
  type: StatisticsActionTypes.RESET_STAT;
}

export type StatisticsAction =
  | GetStatisticsAction
  | GetStatisticsSuccessAction
  | GetStatisticsErrorAction
  | UpdateStatisticsAction
  | UpdateStatisticsSuccessAction
  | UpdateStatisticsErrorAction
  | SetIsUpdatedAction
  | ResetStatAction;
