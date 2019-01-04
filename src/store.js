/* eslint-disable global-require */
// @flow
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./reducers";
import type { State } from "./types";

export default (initialState: State) => {
  const store = createStore(rootReducer, initialState, devToolsEnhancer());

  // $FlowFixMe
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
