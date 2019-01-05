import { combineReducers } from "redux";
import teamBuilder from "./teamBuilder";

const reducers = combineReducers({
  teamBuilder: <any>teamBuilder
});

export default reducers;
