// @flow
import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Dashboard from ".";

const mockData = [
  {
    id: "1",
    name: "Team 1",
    createdAt: "2018-06-08T21:15:14.723Z",
    members: [
      {
        id: "1",
        pokemon: {
          name: "bulbasaur",
          pokedexId: 1,
          sprite: "1.png",
          types: ["POISON", "GRASS"]
        }
      },
      {
        id: "2",
        pokemon: {
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      }
    ]
  },
  {
    id: "2",
    name: "Team 2",
    createdAt: "2018-06-08T21:15:14.723Z",
    members: [
      {
        id: "1",
        pokemon: {
          name: "charmander",
          pokedexId: 4,
          sprite: "4.png",
          types: ["FIRE"]
        }
      },
      {
        id: "2",
        pokemon: {
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      },
      {
        id: "3",
        pokemon: {
          name: "haunter",
          pokedexId: 93,
          sprite: "93.png",
          types: ["GHOST", "POISON"]
        }
      }
    ]
  }
];

const incompleteMockData = [
  {
    id: "1",
    name: "Team 1",
    createdAt: "2018-06-08T21:15:14.723Z",
    members: [
      {
        id: "1",
        pokemon: {
          name: "bulbasaur",
          sprite: "1.png",
          types: ["POISON", "GRASS"]
        }
      },
      {
        id: "2",
        pokemon: {
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      }
    ]
  },
  {
    id: "2",
    createdAt: "2018-06-08T21:15:14.723Z",
    members: [
      {
        id: "1"
      },
      {
        id: "2",
        pokemon: {
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      },
      {
        id: "3",
        pokemon: {
          name: "haunter",
          pokedexId: 93,
          sprite: "93.png"
        }
      }
    ]
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
          <Dashboard loading />
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

  describe("when dashboard as incomplete/invalid data", () => {
    it("doesn't crash", () => {
      const tree = renderer.create(
        <MemoryRouter initialEntries={["/"]}>
          <Dashboard teams={incompleteMockData} />
        </MemoryRouter>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
