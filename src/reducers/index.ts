import { combineReducers } from "redux";
import teamBuilder from "./teamBuilder";

const reducers = combineReducers({
  teamBuilder: teamBuilder as any
});

export default reducers;
