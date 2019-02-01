import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { IState } from "./types";

export default (initialState: IState) => {
  const store = createStore(rootReducer, initialState, devToolsEnhancer({}));

  return store;
};
