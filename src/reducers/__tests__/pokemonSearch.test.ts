import { setCurrentSelection } from "../../actions/pokemonSearch";
import { IPokemon } from "../../types";
import reducer, { initialState } from "../pokemonSearch";

describe("Pokemon search reducer", () => {
  describe("setCurrentSelection", () => {
    it("sets the team members", () => {
      const pokemon: IPokemon = {
        id: "1",
        name: "bulbasaur",
        pokedexId: 1,
        sprite: "bulbasaur.png",
        types: ["GRASS", "POISON"]
      };
      expect(
        reducer(initialState, setCurrentSelection(pokemon) as any)
      ).toEqual({
        ...initialState,
        currentSelection: pokemon
      });
    });
  });

  describe("unknown action", () => {
    it("returns the initial state", () => {
      expect(reducer(initialState, { type: "random action" } as any)).toEqual(
        initialState
      );
    });
  });

  describe("no action", () => {
    it("returns the initial state", () => {
      expect(reducer(initialState, {} as any)).toEqual(initialState);
    });
  });
});
