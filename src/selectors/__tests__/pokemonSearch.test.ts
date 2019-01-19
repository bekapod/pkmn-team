import {
  getPokemonSearch,
  getPokemonSearchCurrentSelection
} from "../pokemonSearch";

describe("PokemonSearch selectors", () => {
  const state = {
    pokemonSearch: {
      currentSelection: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "pikachu.png",
        types: ["ELECTRIC"]
      }
    }
  };

  describe("getPokemonSearch", () => {
    it("gets the pokemon search slice of state", () => {
      expect(getPokemonSearch(state)).toEqual(state.pokemonSearch);
    });
  });

  describe("getPokemonSearchCurrentSelection", () => {
    it("gets the current selection from pokemon search state", () => {
      expect(getPokemonSearchCurrentSelection(state)).toEqual(
        state.pokemonSearch.currentSelection
      );
    });
  });
});
