/* eslint-disable no-console */

import { AuthState } from "../../types/auth-types";
import { SettingsState } from "../../types/settings-types";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const loadFromLocalStorage = (name: string) => {
  try {
    const serialisedState = localStorage.getItem(name);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

function saveToLocalStorage(state: SettingsState | AuthState, name: string) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(name, serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function saveAuthToLocalStorage(state: AuthState) {
  try {
    const authData = {
      name: state.name,
      token: state.token,
      refreshToken: state.refreshToken,
      userId: state.userId,
    };
    const serialisedState = JSON.stringify(authData);
    localStorage.setItem("auth", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export { saveAuthToLocalStorage, saveToLocalStorage, loadFromLocalStorage };
