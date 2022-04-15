import { Dispatch } from "redux";
import { DispatchActions } from "@store/reducers";
// import { apolloClient } from "@lib/apollo";
// import apiCaller from "@lib/axios";
// import * as API from "@api";
// import * as Gql from "@graphql";

export const requestLogin = (body: any) => async (dispatch: Dispatch<DispatchActions>) => {
  try {
    dispatch({ type: "auth/REQUEST_LOGIN" });
    dispatch({ type: "app/SET_OPEN_KEYS", payload: [] });

    console.log("requestLogin: ", body);
    // await API.CustomerAuthenticationService.customerAuthControllerLogin({ body });
    await getCustomerInfo()(dispatch);

    dispatch({ type: "auth/SUCCESS_LOGIN" });
    return Promise.resolve();
  } catch (e) {
    dispatch({ type: "auth/FAIL_LOGIN" });
    console.clear();
    return Promise.reject(e);
  }
};

export const requestLogout = () => async (dispatch: Dispatch<DispatchActions>) => {
  try {
    // await apiCaller.post("/auth/client/logout");
    dispatch({ type: "auth/SUCCESS_LOGOUT" });
    dispatch({ type: "app/INIT" });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

export const requestRevoke =
  (loader = false) =>
  async (dispatch: Dispatch<DispatchActions>) => {
    try {
      dispatch({ type: "auth/REQUEST_REVOKE", payload: loader });

      // await API.CustomerAuthenticationService.customerAuthControllerRevoke();
      await getCustomerInfo()(dispatch);

      dispatch({ type: "auth/SUCCESS_REVOKE" });
      return Promise.resolve();
    } catch (e) {
      console.clear();
      dispatch({ type: "auth/FAIL_REVOKE" });
      return Promise.resolve();
    }
  };

export const getCustomerInfo = () => async (dispatch: Dispatch<DispatchActions>) => {
  try {
    // const res = await apolloClient.query<Gql.CustomerGetMeQuery>({ query: Gql.CustomerGetMeDocument });
    dispatch({ type: "auth/UPDATE_USER", payload: {} });
  } catch (e) {
    //
  }
  return Promise.resolve();
};
