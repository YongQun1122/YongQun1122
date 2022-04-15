import { REHYDRATE } from "redux-persist";

export const ActionTypes = ["app/INIT", "app/SET_COLLAPSED", "app/SET_MOBILE_VIEW"];
export type ActionTypes = typeof ActionTypes[number];

const initialState: State = {
  rehydrated: false,
  collapsed: false,
  mobileView: false,
  tabletView: false
};

const reducer = (state: State = initialState, action: DispatchAction): State => {
  switch (action.type) {
    case "app/INIT":
      return { ...state, collapsed: false };
      break;
    case "app/SET_COLLAPSED":
      return { ...state, collapsed: action.payload };
    case "app/SET_MOBILE_VIEW":
      return { ...state, mobileView: action.payload };
    case REHYDRATE:
      if (!action.payload) return { ...state, rehydrated: true };
      return { ...state, ...action.payload.app, rehydrated: true };
    default:
      return state;
  }
};

export default reducer;

export interface DispatchAction {
  type: ActionTypes | "persist/REHYDRATE";
  payload?: any;
}

export interface State {
  rehydrated: boolean;
  collapsed: boolean;
  mobileView: boolean;
  tabletView: boolean;
}
