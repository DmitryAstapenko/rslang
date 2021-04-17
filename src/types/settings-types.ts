export interface SettingsState {
  bookSettings: {
    isButtons: boolean;
    isWordTranslate: boolean;
    isSentenceTranslate: boolean;
  };
}

export enum SettingsActionsTypes {
  SET_SETTINGS = "SET_SETTINGS",
}
