export interface IStatisticsData {
  learnedWords: number;
  optional: {
    today: IDayStatistics;
    allTime: IDayStatistics[];
  };
}

interface IDayStatistics {
  date: Date;
  todayLearn: number;
  savannah: IGameStatisticsData;
  sprint: IGameStatisticsData;
  audioCall: IGameStatisticsData;
  knowWords: IGameStatisticsData;
}

interface IGameStatisticsData {
  streak: number;
  wrong: number;
  answers: number;
}

export interface StatisticsState {
  statistics: IStatisticsData;
  isFetching: boolean;
  error: null | string;
}

export enum StatisticsActionTypes {
  GET_STATISTICS = "GET_STATISTICS",
  GET_STATISTICS_SUCCESS = "GET_STATISTICS_SUCCESS",
  GET_STATISTICS_ERROR = "GET_STATISTICS_ERROR",
  UPDATE_STATISTICS = "UPDATE_STATISTICS",
  UPDATE_STATISTICS_SUCCESS = "UPDATE_STATISTICS_SUCCESS",
  UPDATE_STATISTICS_ERROR = "UPDATE_STATISTICS_ERROR",
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

export type StatisticsAction =
  | GetStatisticsAction
  | GetStatisticsSuccessAction
  | GetStatisticsErrorAction
  | UpdateStatisticsAction
  | UpdateStatisticsSuccessAction
  | UpdateStatisticsErrorAction;
