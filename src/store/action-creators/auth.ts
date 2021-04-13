/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Dispatch } from "react";
import { STORAGE_NAME } from "../../constants/request-params";
import { AuthAction, AuthActionTypes } from "../../types/auth-types";

const setLoading = (loading: boolean) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_LOADING,
      payload: loading,
    });
  };
};

const logout = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    localStorage.removeItem(STORAGE_NAME);
    dispatch({
      type: AuthActionTypes.LOGOUT,
    });
  };
};

const unauthorizedHandler = (e: { response: { status: number } }) => {
  if (e.response.status === 401) {
    logout();
  }
};

const signIn = (form: { email: string; password: string }) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.SIGN_IN });
      const response = await axios.post(
        "https://rnovikov-rs-lang-back.herokuapp.com/signin",
        form
      );
      dispatch({
        type: AuthActionTypes.SIGN_IN_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: AuthActionTypes.SIGN_IN_ERROR,
        payload: "Ошибка авторизации. Проверьте правильность введенных данных",
      });
    }
  };
};

const signUp = (form: { email: string; name: string; password: string }) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.SIGN_UP });
      const response = await axios.post(
        "https://rnovikov-rs-lang-back.herokuapp.com/users",
        form
      );
      dispatch({
        type: AuthActionTypes.SIGN_UP_SUCCESS,
        payload: {
          name: response.data.name,
          email: response.data.email,
          password: form.password,
          nickname: response.data.nickname,
          userImage: response.data.userImage,
        },
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: AuthActionTypes.SIGN_UP_ERROR,
        payload: "Ошибка регистрации. Проверьте правильность введенных данных",
      });
    }
  };
};

const refreshTokens = (id: string, token: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.REFRESH_TOKENS });
      const response = await axios.get(
        `https://rnovikov-rs-lang-back.herokuapp.com/users/${id}/tokens`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: AuthActionTypes.REFRESH_TOKENS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      unauthorizedHandler(e);
      dispatch({
        type: AuthActionTypes.REFRESH_TOKENS_ERROR,
        payload: "Ошибка входа",
      });
    }
  };
};

export {
  signUp,
  signIn,
  refreshTokens,
  logout,
  unauthorizedHandler,
  setLoading,
};
