import {
  defaultState,
  StatisticsAction,
  StatisticsActionTypes,
  StatisticsState,
} from "../../types/statistics-types";

const statisticsReducer = (
  state = defaultState,
  action: StatisticsAction
): StatisticsState => {
  switch (action.type) {
    case StatisticsActionTypes.GET_STATISTICS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case StatisticsActionTypes.GET_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        statistics: action.payload,
      };
    case StatisticsActionTypes.GET_STATISTICS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case StatisticsActionTypes.UPDATE_STATISTICS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case StatisticsActionTypes.UPDATE_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        statistics: action.payload,
      };
    case StatisticsActionTypes.UPDATE_STATISTICS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case StatisticsActionTypes.SET_IS_UPDATED:
      return {
        ...state,
        isUpdated: action.payload,
      };
    case StatisticsActionTypes.RESET_STAT:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
