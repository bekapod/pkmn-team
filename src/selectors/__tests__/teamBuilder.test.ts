import {
  getTeamBuilder,
  getTeamBuilderCurrentSearchPokemon,
  getTeamBuilderMembers,
  getTeamBuilderName
} from "../teamBuilder";

describe("Team builder selectors", () => {
  const state = {
    teamBuilder: {
      currentSearchPokemon: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "pikachu.png",
        types: ["ELECTRIC"]
      },
      members: {
        "1": {
          id: "1",
          pokemon: {
            id: "1",
            name: "bulbasaur",
            pokedexId: 1,
            sprite: "bulbasaur.png",
            types: ["GRASS", "POISON"]
          }
        },
        "2": {
          id: "2",
          pokemon: {
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "pikachu.png",
            types: ["ELECTRIC"]
          }
        }
      },
      name: "My Team"
    }
  };

  describe("getTeamBuilder", () => {
    it("gets the team builder slice of state", () => {
      expect(getTeamBuilder(state)).toEqual(state.teamBuilder);
    });
  });

  describe("getTeamBuilderCurrentSearchPokemon", () => {
    it("gets the current searched for pokemon from state", () => {
      expect(getTeamBuilderCurrentSearchPokemon(state)).toEqual(
        state.teamBuilder.currentSearchPokemon
      );
    });
  });

  describe("getTeamBuilderMembers", () => {
    it("gets the list of team members from state", () => {
      expect(getTeamBuilderMembers(state)).toEqual(state.teamBuilder.members);
    });
  });

  describe("getTeamBuilderName", () => {
    it("gets the current team name from state", () => {
      expect(getTeamBuilderName(state)).toEqual(state.teamBuilder.name);
    });
  });
});
