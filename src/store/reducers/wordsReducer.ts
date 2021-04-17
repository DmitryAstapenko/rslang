import {
  WordsState,
  WordsAction,
  WordsActionTypes,
} from "../../types/words-types";

const defaultState: WordsState = {
  words: [],
  page: 0,
  error: null,
  isFetching: true,
};

const wordsReducer = (
  state = defaultState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.FETCH_WORDS:
      return { ...state, isFetching: true, error: null, words: [] };
    case WordsActionTypes.FETCH_WORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        words: action.payload,
      };
    case WordsActionTypes.FETCH_WORDS_ERROR:
      return { ...state, isFetching: false, error: action.payload, words: [] };
    case WordsActionTypes.SET_WORDS_PAGE:
      return { ...state, isFetching: false, page: action.payload };
    default:
      return state;
  }
};

export default wordsReducer;
