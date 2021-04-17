import {
  UnitStatistics,
  UnitStatisticsAction,
  UnitStatisticsActionTypes,
  UnitStatisticsState,
} from "../../types/unitStatistics-types";

const defaultState: UnitStatisticsState = {
  unit: {} as UnitStatistics,
  isFetching: true,
  error: null,
};

const unitStatisticsReducer = (
  state = defaultState,
  action: UnitStatisticsAction
): UnitStatisticsState => {
  switch (action.type) {
    case UnitStatisticsActionTypes.GET_UNIT_STATISTICS:
      return {
        ...state,
        isFetching: true,
        error: null,
        unit: {} as UnitStatistics,
      };
    case UnitStatisticsActionTypes.GET_UNIT_STATISTICS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        unit: action.payload,
      };
    }
    case UnitStatisticsActionTypes.GET_UNIT_STATISTICS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        unit: {} as UnitStatistics,
      };
    default:
      return state;
  }
};

export default unitStatisticsReducer;
