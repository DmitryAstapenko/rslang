/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IUserWordData, {
  UserWordsActionTypes,
} from "../../types/user-words-types";

interface GameWordsState {
  gameWords: IUserWordData[];
  error: null | string;
  isGameWordsFetching: boolean;
}

const defaultState: GameWordsState = {
  gameWords: [],
  error: null,
  isGameWordsFetching: true,
};

const gameWordsReducer = (
  state = defaultState,
  action: { type: any; payload: any }
): GameWordsState => {
  switch (action.type) {
    case UserWordsActionTypes.FETCH_GAME_WORDS:
      return {
        ...state,
        gameWords: [],
        error: null,
        isGameWordsFetching: true,
      };
    case UserWordsActionTypes.FETCH_GAME_WORDS_SUCCESS:
      return {
        ...state,
        gameWords: action.payload,
        error: null,
        isGameWordsFetching: false,
      };
    case UserWordsActionTypes.FETCH_GAME_WORDS_ERROR:
      return {
        ...state,
        isGameWordsFetching: false,
        error: action.payload,
      };
    case UserWordsActionTypes.FILL_GAME_WORDS:
      return {
        ...state,
        gameWords: [],
        error: null,
        isGameWordsFetching: true,
      };
    case UserWordsActionTypes.FILL_GAME_WORDS_SUCCESS:
      return {
        ...state,
        isGameWordsFetching: false,
        gameWords: [...action.payload.existWords, ...action.payload.fillWords]
          .slice(0, 20)
          .sort(() => Math.random() - 0.5),
        error: null,
      };
    case UserWordsActionTypes.FILL_GAME_WORDS_ERROR:
      return {
        ...state,
        error: null,
        isGameWordsFetching: false,
      };
    case UserWordsActionTypes.CLEAR_GAME_WORDS:
      return {
        gameWords: [],
        error: null,
        isGameWordsFetching: true,
      };
    default:
      return state;
  }
};

export default gameWordsReducer;
