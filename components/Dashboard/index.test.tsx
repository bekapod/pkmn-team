import { flatten } from "lodash/fp";
import React from "react";
import { render } from "react-testing-library";
import Dashboard from ".";
import { Team } from "../../types";

const mockData: Team[] = [
  {
    createdAt: "2018-06-08T21:15:14.723Z",
    id: "1",
    members: [
      {
        id: "1",
        order: 1,
        pokemon: {
          id: "1",
          name: "Bulbasaur",
          slug: "bulbasaur",
          pokedexId: 1,
          sprite: "1.png",
          types: [
            { name: "Poison", slug: "poison" },
            { name: "Grass", slug: "grass" }
          ]
        }
      },
      {
        id: "2",
        order: 2,
        pokemon: {
          id: "25",
          name: "Pikachu",
          slug: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: [{ name: "Electric", slug: "electric" }]
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
        order: 1,
        pokemon: {
          id: "4",
          name: "Charmander",
          slug: "charmander",
          pokedexId: 4,
          sprite: "4.png",
          types: [{ name: "Fire", slug: "fire" }]
        }
      },
      {
        id: "2",
        order: 2,
        pokemon: {
          id: "25",
          name: "Pikachu",
          slug: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: [{ name: "Electric", slug: "electric" }]
        }
      },
      {
        id: "3",
        order: 3,
        pokemon: {
          id: "93",
          name: "Haunter",
          slug: "haunter",
          pokedexId: 93,
          sprite: "93.png",
          types: [
            { name: "Ghost", slug: "ghost" },
            { name: "Poison", slug: "poison" }
          ]
        }
      }
    ],
    name: "Team 2"
  }
];

describe("<Dashboard />", (): void => {
  it("renders all teams with associated pokemon", (): void => {
    const { queryByText } = render(<Dashboard teams={mockData} />);

    const expectedTeams = mockData.map((team): string => team.name);
    const expectedPokemon = flatten(
      mockData.map(
        (team): string[] =>
          team.members.map((member): string => member.pokemon.name)
      )
    );

    expect(queryByText(/Create a team/)).toBeTruthy();
    expectedTeams.forEach(
      (teamName): HTMLElement | null =>
        expect(queryByText(teamName)).toBeTruthy()
    );
    expectedPokemon.forEach(
      (pokemonName): HTMLElement | null =>
        expect(queryByText(new RegExp(pokemonName, "i"))).toBeTruthy()
    );
  });

  describe("when dashboard has no data", (): void => {
    it("renders correctly", (): void => {
      const { queryAllByTestId, queryByText } = render(
        <Dashboard teams={[]} />
      );

      expect(queryByText(/Create a team/)).toBeTruthy();
      expect(queryAllByTestId(/team-(\w+)/)).toHaveLength(0);
    });
  });
});
