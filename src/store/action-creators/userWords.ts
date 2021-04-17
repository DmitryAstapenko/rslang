/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from "redux";
import axios from "axios";
import {
  IUserWordOptions,
  UserWordsAction,
  UserWordsActionTypes,
} from "../../types/user-words-types";
import { unauthorizedHandler } from "./auth";

const aggregateUserWords = (
  group = 0,
  page = 0,
  filter: string,
  id: string,
  token: string,
  book?: number
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.FETCH_USER_WORDS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/aggregatedWords`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: { group, page, wordsPerPage: 20, filter, book },
        }
      );
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS,
        payload: {
          words: response.data[0].paginatedResults,
          totalCount: response.data[0].totalCount[0].count,
        },
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: UserWordsActionTypes.FETCH_USER_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке слов пользователя",
      });
    }
  };
};

const fetchPages = (group = 0, id: string, token: string) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.GET_USER_WORDS_PAGES });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/aggregatedWords/group`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: { group },
        }
      );
      dispatch({
        type: UserWordsActionTypes.GET_USER_WORDS_PAGES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR,
        payload: "Произошла ошибка при загрузке страниц",
      });
    }
  };
};

const updateUserWord = (
  wordId: string,
  data: IUserWordOptions,
  id: string,
  token: string,
  remove = false
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      dispatch({ type: UserWordsActionTypes.UPDATE_USER_WORD });
      const wordResponse = await axios.put(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/words/${wordId}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: UserWordsActionTypes.UPDATE_USER_WORD_SUCCESS,
        payload: {
          userWord: {
            isLearn: wordResponse.data.isLearn,
            status: wordResponse.data.status,
            optional: wordResponse.data.optional,
          },
          id: wordId,
          remove,
        },
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: UserWordsActionTypes.UPDATE_USER_WORD_ERROR,
        payload: "Произошла ошибка при изменение слова",
      });
    }
  };
};

const changeUserWordsPages = (page: number, count: number): UserWordsAction => {
  return {
    type: UserWordsActionTypes.CHANGE_USER_WORDS_PAGES,
    payload: { page, count },
  };
};

const setIsFetching = (isFetching: boolean): UserWordsAction => {
  return {
    type: UserWordsActionTypes.SET_IS_FETCHING,
    payload: isFetching,
  };
};

export {
  aggregateUserWords,
  fetchPages,
  updateUserWord,
  changeUserWordsPages,
  setIsFetching,
};
