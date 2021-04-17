import { SettingsActionsTypes } from "../../types/settings-types";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const setSettings = (settings: {
  isButtons: boolean;
  isWordTranslate: boolean;
  isSentenceTranslate: boolean;
}) => {
  return (
    dispatch: (arg0: {
      type: SettingsActionsTypes;
      payload: {
        isButtons: boolean;
        isWordTranslate: boolean;
        isSentenceTranslate: boolean;
      };
    }) => void
  ) => {
    dispatch({
      type: SettingsActionsTypes.SET_SETTINGS,
      payload: settings,
    });
  };
};

const resetSettings = () => {
  return (
    dispatch: (arg0: {
      type: SettingsActionsTypes;
      payload: {
        isButtons: boolean;
        isWordTranslate: boolean;
        isSentenceTranslate: boolean;
      };
    }) => void
  ) => {
    dispatch({
      type: SettingsActionsTypes.SET_SETTINGS,
      payload: {
        isButtons: true,
        isWordTranslate: true,
        isSentenceTranslate: true,
      },
    });
  };
};

export { setSettings, resetSettings };
