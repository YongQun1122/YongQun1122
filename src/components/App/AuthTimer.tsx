import { useEffect, useRef } from "react";
import { requestRevoke } from "@actions/auth.actions";
import { RootState, store } from "@store";
import { useDispatch, useSelector } from "react-redux";

const timeout = 5 * 60 * 1000; // 5 minutes

const AuthTimer = () => {
  const dispatch = useDispatch();
  const interval = useRef<NodeJS.Timeout>();
  const state = useSelector((state: RootState) => state);
  const { rehydrated } = state.app;

  useEffect(() => {
    if (interval.current) clearInterval(interval.current);

    if (state.auth.isAuthenticated) {
      requestRevoke(false)(dispatch);
    }

    interval.current = setInterval(() => {
      const state: RootState = store.getState();
      if (state.auth.isAuthenticated) {
        requestRevoke(false)(dispatch);
      }
    }, timeout);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (rehydrated) requestRevoke(true)(dispatch);
  }, [rehydrated]);

  return null;
};

export { AuthTimer };
export default AuthTimer;
