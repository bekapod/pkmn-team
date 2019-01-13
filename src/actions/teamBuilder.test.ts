// tslint:disable-next-line:no-implicit-dependencies
import configureMockStore from "redux-mock-store";
import { IPokemon, ITeamMember } from "../types";
import * as actions from "./teamBuilder";

describe("Team builder actions", () => {
  const mockStore = configureMockStore();
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({});
  });

  describe("setTeamName", () => {
    it("dispatches with team name", () => {
      const payload = "Test Team";
      const expectedActions = [{ type: "team_builder/set_team_name", payload }];

      store.dispatch(actions.setTeamName(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("setTeamMembers", () => {
    it("dispatches with no team members", () => {
      const payload: ITeamMember[] = [];
      const expectedActions = [
        { type: "team_builder/set_team_members", payload }
      ];

      store.dispatch(actions.setTeamMembers(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches with team members", () => {
      const payload: ITeamMember[] = [
        {
          id: "1",
          pokemon: {
            id: "1",
            name: "Pikachu",
            pokedexId: 25,
            sprite: "pikachu.png",
            types: ["ELECTRIC"]
          }
        }
      ];

      const expectedActions = [
        { type: "team_builder/set_team_members", payload }
      ];

      store.dispatch(actions.setTeamMembers(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("addPokemonToTeam", () => {
    it("dispatches with team member", () => {
      const payload: ITeamMember = {
        id: "1",
        pokemon: {
          id: "1",
          name: "Pikachu",
          pokedexId: 25,
          sprite: "pikachu.png",
          types: ["ELECTRIC"]
        }
      };
      const expectedActions = [
        { type: "team_builder/add_pokemon_to_team", payload }
      ];

      store.dispatch(actions.addPokemonToTeam(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("removePokemonFromTeam", () => {
    it("dispatches with team member", () => {
      const payload = {
        id: "1"
      };
      const expectedActions = [
        { type: "team_builder/remove_pokemon_from_team", payload }
      ];

      store.dispatch(actions.removePokemonFromTeam(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("setCurrentSearchPokemon", () => {
    it("dispatches with pokemon", () => {
      const payload: IPokemon = {
        id: "1",
        name: "Pikachu",
        pokedexId: 25,
        sprite: "pikachu.png",
        types: ["ELECTRIC"]
      };
      const expectedActions = [
        { type: "team_builder/set_current_search_pokemon", payload }
      ];

      store.dispatch(actions.setCurrentSearchPokemon(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
