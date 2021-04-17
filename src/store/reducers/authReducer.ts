import { STORAGE_AUTH_NAME } from "../../constants/request-params";
import { AuthState, AuthAction, AuthActionTypes } from "../../types/auth-types";
import { loadFromLocalStorage } from "../action-creators/saveLocalStorage";

const defaultState: AuthState = {
  password: "",
  email: "",
  userImage: [""],
  nickname: "",
  isAuthenticated: false,
  loading: true,
  message: "",
  token: "",
  refreshToken: "",
  userId: "",
  name: "",
  isRegistered: false,
  signInError: null,
  signUpError: null,
};

const defaultUserData = loadFromLocalStorage(STORAGE_AUTH_NAME);

const authReducer = (
  state = { ...defaultState, ...defaultUserData },
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        message: "",
        password: "",
        token: "",
        refreshToken: "",
        userId: "",
        name: "",
        signInError: null,
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload.message,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        userImage: action.payload.userImage,
        name: action.payload.name,
        signInError: null,
      };
    case AuthActionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: "",
        password: "",
        token: "",
        refreshToken: "",
        userId: "",
        name: "",
        signInError: action.payload,
      };
    case AuthActionTypes.SIGN_UP:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        signUpError: null,
      };
    case AuthActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistered: true,
        password: action.payload.password,
        email: action.payload.email,
        name: action.payload.name,
        userImage: action.payload.userImage,
        nickname: action.payload.nickname,
        signUpError: null,
      };
    case AuthActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        signUpError: action.payload,
      };
    case AuthActionTypes.REFRESH_TOKENS:
      return {
        ...state,
        ...defaultState,
      };
    case AuthActionTypes.REFRESH_TOKENS_SUCCESS:
      return {
        ...state,
        ...defaultState,
        loading: false,
        userImage: action.payload.userImage,
        nickname: action.payload.nickname,
        isAuthenticated: true,
        message: action.payload.message,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        name: action.payload.name,
        signInError: null,
      };
    case AuthActionTypes.REFRESH_TOKENS_ERROR:
      return {
        ...state,
        ...defaultState,
        loading: false,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        ...defaultState,
        loading: false,
      };
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
