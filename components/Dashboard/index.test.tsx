import { flatten } from "lodash/fp";
import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import Dashboard from ".";
import { ITeam } from "../../types";

const mockData: ITeam[] = [
  {
    createdAt: "2018-06-08T21:15:14.723Z",
    id: "1",
    members: [
      {
        id: "1",
        pokemon: {
          id: "1",
          name: "bulbasaur",
          pokedexId: 1,
          sprite: "1.png",
          types: ["POISON", "GRASS"]
        }
      },
      {
        id: "2",
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      }
    ],
    name: "Team 1"
  },
  {
    createdAt: "2018-06-08T21:15:14.723Z",
    id: "2",
    members: [
      {
        id: "1",
        pokemon: {
          id: "4",
          name: "charmander",
          pokedexId: 4,
          sprite: "4.png",
          types: ["FIRE"]
        }
      },
      {
        id: "2",
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      },
      {
        id: "3",
        pokemon: {
          id: "93",
          name: "haunter",
          pokedexId: 93,
          sprite: "93.png",
          types: ["GHOST", "POISON"]
        }
      }
    ],
    name: "Team 2"
  }
];

describe("<Dashboard />", () => {
  it("renders all teams with associated pokemon", () => {
    const { queryByText } = render(<Dashboard teams={mockData} />);

    const expectedTeams = mockData.map(team => team.name);
    const expectedPokemon = flatten(
      mockData.map(team => team.members.map(member => member.pokemon.name))
    );

    expect(queryByText(/Create a team/)).toBeTruthy();
    expectedTeams.forEach(teamName =>
      expect(queryByText(teamName)).toBeTruthy()
    );
    expectedPokemon.forEach(pokemonName =>
      expect(queryByText(new RegExp(pokemonName, "i"))).toBeTruthy()
    );
  });

  describe("when dashboard has no data", () => {
    it("renders correctly", () => {
      const { queryAllByTestId, queryByText } = render(
        <Dashboard teams={[]} />
      );

      expect(queryByText(/Create a team/)).toBeTruthy();
      expect(queryAllByTestId(/team-(\w+)/)).toHaveLength(0);
    });
  });
});
