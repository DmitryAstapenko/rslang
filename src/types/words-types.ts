import IUserWordData from "./user-words-types";

export interface WordsState {
  words: IUserWordData[];
  isFetching: boolean;
  error: null | string;
  page: number;
}

export enum WordsActionTypes {
  FETCH_WORDS = "FETCH_WORDS",
  FETCH_WORDS_SUCCESS = "FETCH_WORDS_SUCCESS",
  FETCH_WORDS_ERROR = "FETCH_WORDS_ERROR",
  SET_WORDS_PAGE = "SET_WORDS_PAGE",
}
interface FetchWordsAction {
  type: WordsActionTypes.FETCH_WORDS;
}
interface FetchWordsSuccessAction {
  type: WordsActionTypes.FETCH_WORDS_SUCCESS;
  payload: IUserWordData[];
}
interface FetchWordsErrorAction {
  type: WordsActionTypes.FETCH_WORDS_ERROR;
  payload: string;
}
interface SetWordsPage {
  type: WordsActionTypes.SET_WORDS_PAGE;
  payload: number;
}
export type WordsAction =
  | FetchWordsAction
  | FetchWordsSuccessAction
  | FetchWordsErrorAction
  | SetWordsPage;
