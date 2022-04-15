import { combineReducers, Dispatch } from "redux";

import app, * as App from "./app.reducer";
import auth, * as Auth from "./auth.reducer";

export const reducers = combineReducers({ auth, app });
export default reducers;

export type ActionTypes = App.ActionTypes | Auth.ActionTypes;

export interface DispatchActions {
  payload?: any;
  type: ActionTypes;
}

export type Dispatcher = Dispatch<DispatchActions>;
