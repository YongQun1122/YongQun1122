import storage from "redux-persist/lib/storage";
import { createStore as createReduxStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "./reducers";

export type RootState = ReturnType<typeof reducers>;

const createStore = (initialState = {}) => {
  const persistedReducer = persistReducer({ key: "root", storage }, reducers);
  let store: Store;
  if (process.env.NODE_ENV === "development") {
    store = createReduxStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware()));
  } else {
    store = createReduxStore(persistedReducer, initialState);
  }
  persistStore(store, null);

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducer(reducers(reducers));
    });
  }

  return store;
};

export const store = createStore();

export { createStore };
export * from "./reducers";
export default createStore;
