import React from "react";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
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
    const tree = renderer.create(
      <MemoryRouter initialEntries={["/"]}>
        <Dashboard teams={mockData} />
      </MemoryRouter>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe("when dashboard is loading", () => {
    it("renders correctly", () => {
      const tree = renderer.create(
        <MemoryRouter initialEntries={["/"]}>
          <Dashboard loading={true} />
        </MemoryRouter>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when dashboard has no data", () => {
    it("renders correctly", () => {
      const tree = renderer.create(
        <MemoryRouter initialEntries={["/"]}>
          <Dashboard teams={[]} />
        </MemoryRouter>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
