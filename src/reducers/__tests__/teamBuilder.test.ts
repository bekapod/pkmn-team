import {
  addPokemonToTeam,
  removePokemonFromTeam,
  setCurrentSearchPokemon,
  setTeamName
} from "../../actions/teamBuilder";
import { IPokemon, ITeamBuilderState, ITeamMember } from "../../types";
import reducer, { initialState } from "../teamBuilder";

describe("Team builder reducer", () => {
  describe("setTeamName", () => {
    it("sets the team name", () => {
      expect(reducer(initialState, setTeamName("My Team") as any)).toEqual({
        ...initialState,
        name: "My Team"
      });
    });
  });

  describe("addPokemonToTeam", () => {
    it("adds a pokemon to an empty team", () => {
      const newTeamMember: ITeamMember = {
        id: "1",
        pokemon: {
          id: "1",
          name: "bulbasaur",
          pokedexId: 1,
          sprite: "bulbasaur.png",
          types: ["GRASS", "POISON"]
        }
      };
      expect(
        reducer(initialState, addPokemonToTeam(newTeamMember) as any)
      ).toEqual({
        ...initialState,
        members: { "1": newTeamMember }
      });
    });

    it("adds a pokemon to an existing team", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
          }
        }
      };

      const newTeamMember: ITeamMember = {
        id: "2",
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "pikachu.png",
          types: ["ELECTRIC"]
        }
      };

      expect(
        reducer(initialStateWithTeam, addPokemonToTeam(newTeamMember) as any)
      ).toEqual({
        ...initialStateWithTeam,
        members: {
          ...initialStateWithTeam.members,
          "2": newTeamMember
        }
      });
    });

    it("adds a duplicate pokemon to an existing team", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
          }
        }
      };

      const newTeamMember: ITeamMember = {
        id: "2",
        pokemon: initialStateWithTeam.members["1"].pokemon
      };

      expect(
        reducer(initialStateWithTeam, addPokemonToTeam(newTeamMember) as any)
      ).toEqual({
        ...initialStateWithTeam,
        members: {
          ...initialStateWithTeam.members,
          "2": newTeamMember
        }
      });
    });

    it("doesn't add a new team member if team member id already exists", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
          }
        }
      };

      const newTeamMember: ITeamMember = {
        id: "1",
        pokemon: initialStateWithTeam.members["1"].pokemon
      };

      expect(
        reducer(initialStateWithTeam, addPokemonToTeam(newTeamMember) as any)
      ).toEqual(initialStateWithTeam);
    });
  });

  describe("removePokemonFromTeam", () => {
    it("removes a pokemon from an existing team", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
        }
      };

      expect(
        reducer(initialStateWithTeam, removePokemonFromTeam({ id: "1" }) as any)
      ).toEqual({
        ...initialStateWithTeam,
        members: {
          "2": initialStateWithTeam.members[2]
        }
      });
    });

    it("removes the only team member in a team", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
          }
        }
      };

      expect(
        reducer(initialStateWithTeam, removePokemonFromTeam({ id: "1" }) as any)
      ).toEqual({
        ...initialStateWithTeam,
        members: {}
      });
    });

    it("only removes the specific team member if pokemon is on team twice", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
              id: "1",
              name: "bulbasaur",
              pokedexId: 1,
              sprite: "bulbasaur.png",
              types: ["GRASS", "POISON"]
            }
          }
        }
      };

      expect(
        reducer(initialStateWithTeam, removePokemonFromTeam({ id: "1" }) as any)
      ).toEqual({
        ...initialStateWithTeam,
        members: {
          "2": initialStateWithTeam.members["2"]
        }
      });
    });

    it("returns initial state when removing a team member that doesn't exist", () => {
      const initialStateWithTeam: ITeamBuilderState = {
        ...initialState,
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
          }
        }
      };

      expect(
        reducer(initialStateWithTeam, removePokemonFromTeam({ id: "2" }) as any)
      ).toEqual(initialStateWithTeam);
    });

    it("returns initial state when removing a team member from an empty team", () => {
      expect(
        reducer(initialState, removePokemonFromTeam({ id: "2" }) as any)
      ).toEqual(initialState);
    });
  });

  describe("setCurrentSearchPokemon", () => {
    it("sets the current search pokemon", () => {
      const pokemon: IPokemon = {
        id: "1",
        name: "bulbasaur",
        pokedexId: 1,
        sprite: "bulbasaur.png",
        types: ["GRASS", "POISON"]
      };

      expect(
        reducer(initialState, setCurrentSearchPokemon(pokemon) as any)
      ).toEqual({
        ...initialState,
        currentSearchPokemon: pokemon
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
