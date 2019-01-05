import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { State } from "./types"

export default (initialState: State) => {
  const store = createStore(rootReducer, initialState, devToolsEnhancer({}));

  return store;
};
