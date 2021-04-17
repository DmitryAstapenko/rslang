import { STORAGE_SETTING_NAME } from "../../constants/request-params";
import {
  SettingsActionsTypes,
  SettingsState,
} from "../../types/settings-types";
import { loadFromLocalStorage } from "../action-creators/saveLocalStorage";

const localStorageState = loadFromLocalStorage(STORAGE_SETTING_NAME);

const defaultState = {
  bookSettings: {
    isButtons: true,
    isWordTranslate: true,
    isSentenceTranslate: true,
  },
};

const settingsReducer = (
  state = localStorageState || defaultState,
  action: {
    type: SettingsActionsTypes;
    payload: {
      isButtons: boolean;
      isWordTranslate: boolean;
      isSentenceTranslate: boolean;
    };
  }
): SettingsState => {
  switch (action.type) {
    case SettingsActionsTypes.SET_SETTINGS:
      return {
        ...state,
        bookSettings: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
