import { REHYDRATE } from "redux-persist";

export const ActionTypes = [
  "auth/REQUEST_LOGIN",
  "auth/SUCCESS_LOGIN",
  "auth/FAIL_LOGIN",
  "auth/REQUEST_REVOKE",
  "auth/SUCCESS_REVOKE",
  "auth/FAIL_REVOKE",
  "auth/UPDATE_USER",
  "auth/SUCCESS_LOGOUT"
];
export type ActionTypes = typeof ActionTypes[number];

const initialState: State = {
  isAuthenticating: false,
  isAuthenticated: false,
  isRevoking: true,
  user: null
};

export const AuthReducer = (state: State = initialState, action: DispatchAction): State => {
  switch (action.type) {
    case "auth/REQUEST_LOGIN":
      return { ...state, isAuthenticating: true };
    case "auth/SUCCESS_LOGIN":
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true
      };
    case "auth/FAIL_LOGIN":
      return { ...initialState, isRevoking: false };
    case "auth/REQUEST_REVOKE":
      return { ...state, isRevoking: action.payload };
    case "auth/SUCCESS_REVOKE":
      return { ...state, isAuthenticated: true, isRevoking: false, user: { ...state.user, ...action.payload } };
    case "auth/FAIL_REVOKE":
      return { ...initialState, isRevoking: false };
    case "auth/UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "auth/SUCCESS_LOGOUT":
      return { ...initialState, isRevoking: false };
    case REHYDRATE:
      if (!action.payload) return { ...state };
      return { ...state, ...action.payload.auth };
    default:
      return state;
  }
};

export default AuthReducer;

export interface DispatchAction {
  type: ActionTypes | "persist/REHYDRATE";
  payload?: any;
}

export interface State {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isRevoking: boolean;
  user: any;
}
