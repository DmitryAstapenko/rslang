interface ISignInData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  userImage: string[];
  nickname: string;
}

export interface AuthState extends ISignInData {
  password: string;
  email: string;
  isAuthenticated: boolean;
  isRegistered: boolean;
  loading: boolean;
  signInError: string | null;
  signUpError: string | null;
}

export enum AuthActionTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  SIGN_IN_ERROR = "SIGN_IN_ERROR",
  SIGN_UP = "SIGN_UP",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR = "SIGN_UP_ERROR",
  LOGOUT = "LOGOUT",
  SET_LOADING = "SET_LOADING",
  REFRESH_TOKENS = "REFRESH_TOKENS",
  REFRESH_TOKENS_SUCCESS = "REFRESH_TOKENS_SUCCESS",
  REFRESH_TOKENS_ERROR = "REFRESH_TOKENS_ERROR",
}

interface SignInAction {
  type: AuthActionTypes.SIGN_IN;
}

interface SignInSuccessAction {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: ISignInData;
}

interface SignInErrorAction {
  type: AuthActionTypes.SIGN_IN_ERROR;
  payload: string;
}

interface SignUpAction {
  type: AuthActionTypes.SIGN_UP;
}

interface SignUpSuccessAction {
  type: AuthActionTypes.SIGN_UP_SUCCESS;
  payload: {
    name: string;
    email: string;
    password: string;
    userImage: string[];
    nickname: string;
  };
}

interface SignUpErrorAction {
  type: AuthActionTypes.SIGN_UP_ERROR;
  payload: string;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

interface RefreshTokensAction {
  type: AuthActionTypes.REFRESH_TOKENS;
}

interface RefreshTokensSuccessAction {
  type: AuthActionTypes.REFRESH_TOKENS_SUCCESS;
  payload: ISignInData;
}

interface RefreshTokensErrorAction {
  type: AuthActionTypes.REFRESH_TOKENS_ERROR;
  payload: string;
}

interface SetLoadingAction {
  type: AuthActionTypes.SET_LOADING;
  payload: boolean;
}

export type AuthAction =
  | SignInAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpErrorAction
  | LogoutAction
  | RefreshTokensAction
  | RefreshTokensSuccessAction
  | RefreshTokensErrorAction
  | SetLoadingAction;
