interface PagesData {
  _id: number;
  count: number;
}

export interface IUserWordOptions {
  status: string;
  isLearn: boolean;
  optional: {
    learned: Date;
    lastLearn: Date;
    wrongAnswers: number;
    correctAnswers: number;
  };
}
interface IUserWordData {
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  _id: string;
  userWord: IUserWordOptions;
}
interface AggregatedWordsData {
  words: IUserWordData[];
  totalCount: number;
}

export interface UserWordsState {
  aggregatedWords: AggregatedWordsData;
  page: number;
  pages: PagesData[];
  isFetching: boolean;
  isPagesFetching: boolean;
  isUpdating: boolean;
  error: null | string;
  createError: null | string;
}

export enum UserWordsActionTypes {
  FETCH_USER_WORDS = "FETCH_USER_WORDS",
  FETCH_USER_WORDS_SUCCESS = "FETCH_USER_WORDS_SUCCESS",
  FETCH_USER_WORDS_ERROR = "FETCH_USER_WORDS_ERROR",
  UPDATE_USER_WORD = "UPDATE_USER_WORD",
  UPDATE_USER_WORD_SUCCESS = "UPDATE_USER_WORD_SUCCESS",
  UPDATE_USER_WORD_ERROR = "UPDATE_USER_WORD_ERROR",
  GET_USER_WORDS_PAGES = "GET_USER_WORDS_PAGES",
  GET_USER_WORDS_PAGES_SUCCESS = "GET_USER_WORDS_PAGES_SUCCESS",
  GET_USER_WORDS_PAGES_ERROR = "GET_USER_WORDS_PAGES_ERROR",
  CHANGE_USER_WORDS_PAGES = "CHANGE_USER_WORDS_PAGES",
  CLEAR_GAME_WORDS = "CLEAR_GAME_WORDS",
  SET_IS_FETCHING = "SET_IS_FETCHING",
  FETCH_GAME_WORDS = "FETCH_GAME_WORDS",
  FETCH_GAME_WORDS_SUCCESS = "FETCH_GAME_WORDS_SUCCESS",
  FETCH_GAME_WORDS_ERROR = "FETCH_GAME_WORDS_ERROR",
  FILL_GAME_WORDS = "FILL_GAME_WORDS",
  FILL_GAME_WORDS_SUCCESS = "FILL_GAME_WORDS_SUCCESS",
  FILL_GAME_WORDS_ERROR = "FETCH_GAME_WORDS_ERROR",
}

interface FetchUserWordsAction {
  type: UserWordsActionTypes.FETCH_USER_WORDS;
}

interface FetchUserWordsSuccessAction {
  type: UserWordsActionTypes.FETCH_USER_WORDS_SUCCESS;
  payload: AggregatedWordsData;
}

interface FetchUserWordsErrorAction {
  type: UserWordsActionTypes.FETCH_USER_WORDS_ERROR;
  payload: string;
}

interface UpdateUserWordAction {
  type: UserWordsActionTypes.UPDATE_USER_WORD;
}

interface UpdateUserWordSuccessAction {
  type: UserWordsActionTypes.UPDATE_USER_WORD_SUCCESS;
  payload: { id: string; userWord: IUserWordOptions; remove: boolean };
}

interface UpdateUserWordErrorAction {
  type: UserWordsActionTypes.UPDATE_USER_WORD_ERROR;
  payload: string;
}

interface GetUserWordsPagesAction {
  type: UserWordsActionTypes.GET_USER_WORDS_PAGES;
}

interface GetUserWordsPagesSuccessAction {
  type: UserWordsActionTypes.GET_USER_WORDS_PAGES_SUCCESS;
  payload: PagesData[];
}

interface GetUserWordsPagesErrorAction {
  type: UserWordsActionTypes.GET_USER_WORDS_PAGES_ERROR;
  payload: string;
}

interface ChangeUserWordsPagesAction {
  type: UserWordsActionTypes.CHANGE_USER_WORDS_PAGES;
  payload: { count: number; page: number };
}

interface ClearGameWordsAction {
  type: UserWordsActionTypes.CLEAR_GAME_WORDS;
}

interface SetIsFetchingAction {
  type: UserWordsActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

export type UserWordsAction =
  | FetchUserWordsAction
  | FetchUserWordsSuccessAction
  | FetchUserWordsErrorAction
  | GetUserWordsPagesAction
  | GetUserWordsPagesSuccessAction
  | GetUserWordsPagesErrorAction
  | UpdateUserWordAction
  | UpdateUserWordSuccessAction
  | UpdateUserWordErrorAction
  | ChangeUserWordsPagesAction
  | ClearGameWordsAction
  | SetIsFetchingAction;

export default IUserWordData;
