import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoriesReducer from "./categoriesReducer";
import gameWordsReducer from "./gameWordsReducer";
import scoreReducer from "./scoreReducer";
import settingsReducer from "./settingsReducer";
import statisticsReducer from "./statisticsReducer";
import unitStatisticsReducer from "./unitStatisticsReducer";
import userWordsReducer from "./userWordsReducer";
import wordsReducer from "./wordsReducer";

export const rootReducer = combineReducers({
  words: wordsReducer,
  userWords: userWordsReducer,
  gameWords: gameWordsReducer,
  categories: categoriesReducer,
  statistics: statisticsReducer,
  unitStatistics: unitStatisticsReducer,
  auth: authReducer,
  settings: settingsReducer,
  score: scoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
