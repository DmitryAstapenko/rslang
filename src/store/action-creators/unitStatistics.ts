/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { Dispatch } from "react";
import {
  UnitStatisticsAction,
  UnitStatisticsActionTypes,
} from "../../types/unitStatistics-types";
import { unauthorizedHandler } from "./auth";

const getUnitStatisticsAction = (
  group = 0,
  id: string,
  token: string,
  filter?: string
) => {
  return async (dispatch: Dispatch<UnitStatisticsAction>) => {
    try {
      dispatch({ type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/aggregatedWords/stat`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: { group, filter },
        }
      );
      dispatch({
        type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS_SUCCESS,
        payload: {
          group,
          count: response?.data[0]?.count || 0,
          wrongAnswers: response?.data[0]?.wrongAnswers || 0,
          correctAnswers: response?.data[0]?.correctAnswers || 0,
        },
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: UnitStatisticsActionTypes.GET_UNIT_STATISTICS_ERROR,
        payload: "Произошла ошибка при загрузке статистики раздела",
      });
    }
  };
};

export { getUnitStatisticsAction };
