/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Dispatch } from "redux";
import { BACKEND_PATH } from "../../constants/request-params";

export const fetchScore = (id: string, token: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get(
        `${BACKEND_PATH}users/${id}/statistics/score`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "FETCH_SCORE",
        payload: {
          score: response.data.score,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);
    }
  };
};

export const updateScore = (id: string, token: string, updateWith: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.put(
        `${BACKEND_PATH}users/${id}/statistics/score`,
        {
          score: updateWith,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "UPDATE_SCORE",
        payload: {
          score: response.data.score,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);
    }
  };
};
