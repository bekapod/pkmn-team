// tslint:disable-next-line:no-implicit-dependencies
import configureMockStore from "redux-mock-store";
import { IPokemon } from "../../types";
import * as actions from "../pokemonSearch";

describe("Pokemon search actions", () => {
  const mockStore = configureMockStore();
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({});
  });

  describe("setCurrentSelection", () => {
    it("dispatches with current selection", () => {
      const payload: IPokemon = {
        id: "1",
        name: "Pikachu",
        pokedexId: 25,
        sprite: "pikachu.png",
        types: ["ELECTRIC"]
      };
      const expectedActions = [
        { type: "pokemon_search/set_current_selection", payload }
      ];

      store.dispatch(actions.setCurrentSelection(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
