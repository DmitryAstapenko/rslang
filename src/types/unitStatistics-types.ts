export interface UnitStatistics {
  group: number;
  count: number;
  wrongAnswers: number;
  correctAnswers: number;
}

export interface UnitStatisticsState {
  unit: UnitStatistics;
  isFetching: boolean;
  error: null | string;
}

export enum UnitStatisticsActionTypes {
  GET_UNIT_STATISTICS = "GET_UNIT_STATISTICS",
  GET_UNIT_STATISTICS_SUCCESS = "GET_UNIT_STATISTICS_SUCCESS",
  GET_UNIT_STATISTICS_ERROR = "GET_UNIT_STATISTICS_ERROR",
}

interface GetUnitStatisticsAction {
  type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS;
}

interface GetUnitStatisticsSuccessAction {
  type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS_SUCCESS;
  payload: {
    group: number;
    count: number;
    wrongAnswers: number;
    correctAnswers: number;
  };
}

interface GetUnitStatisticsErrorAction {
  type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS_ERROR;
  payload: string;
}

export type UnitStatisticsAction =
  | GetUnitStatisticsAction
  | GetUnitStatisticsSuccessAction
  | GetUnitStatisticsErrorAction;
