/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "redux";
import axios from "axios";
import IUserWordData, {
  UserWordsAction,
  UserWordsActionTypes,
} from "../../types/user-words-types";

const fetchWords = (group = 0, page = 0) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_USER_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/words`,
        {
          params: { group, page },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS,
        payload: {
          words: response.data,
          totalCount: response.data.length,
        },
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке слов",
      });
    }
  };
};

const fetchGameWords = (group = 0, count = 20) => {
  return async (
    dispatch: (arg0: {
      type: UserWordsActionTypes;
      payload?: IUserWordData[] | string;
    }) => void
  ) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_GAME_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/words/group/${group}`,
        {
          params: { count },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FETCH_GAME_WORDS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR,
        payload: "Произошла ошибка при загрузке слов",
      });
    }
  };
};

const fetchAggregatedGameWords = (
  group = 0,
  count = 20,
  filter: string,
  id: string,
  token: string
) => {
  return async (
    dispatch: (arg0: {
      type: UserWordsActionTypes;
      payload?: IUserWordData[] | string;
    }) => void
  ) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_GAME_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/aggregatedWords/game`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: { group, count, filter },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FETCH_GAME_WORDS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR,
        payload: "Произошла ошибка при загрузке слов",
      });
    }
  };
};

const fillGameWords = (
  group = 0,
  page = 0,
  words: IUserWordData[],
  filter: string,
  wordsPerPage: number,
  count = 20,
  id: string,
  token: string
) => {
  return async (
    dispatch: (arg0: {
      type: UserWordsActionTypes;
      payload?:
        | { fillWords: IUserWordData[]; existWords: IUserWordData[] }
        | string;
    }) => void
  ) => {
    try {
      dispatch({ type: UserWordsActionTypes.FILL_GAME_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/aggregatedWords/fillgame`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: { group, page, count, wordsPerPage, filter },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FILL_GAME_WORDS_SUCCESS,
        payload: {
          fillWords: response.data[0].paginatedResults,
          existWords: words,
        },
      });
    } catch (e) {
      dispatch({
        type: UserWordsActionTypes.FILL_GAME_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке слов",
      });
    }
  };
};

const clearGameWords = (): UserWordsAction => {
  return { type: UserWordsActionTypes.CLEAR_GAME_WORDS };
};

export {
  fetchWords,
  fetchGameWords,
  fetchAggregatedGameWords,
  fillGameWords,
  clearGameWords,
};
