// @flow
import { combineReducers, type Reducer } from "redux";
import teamBuilder from "./teamBuilder";

const reducers: Reducer = combineReducers({
  teamBuilder
});

export default reducers;
