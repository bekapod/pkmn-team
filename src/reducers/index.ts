import { combineReducers } from "redux";
import pokemonSearch from "./pokemonSearch";
import teamBuilder from "./teamBuilder";

const reducers = combineReducers({
  pokemonSearch: pokemonSearch as any,
  teamBuilder: teamBuilder as any
});

export default reducers;
