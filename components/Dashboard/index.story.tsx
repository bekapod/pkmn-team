// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import Dashboard from ".";
import { Team } from "../../types";

const mockData: Team[] = [
  {
    insertedAt: "2018-06-08T21:15:14.723Z",
    id: "1",
    members: [
      {
        id: "1",
        order: 1,
        pokemon: {
          id: "1",
          name: "bulbasaur",
          pokedexId: 1,
          sprite: "1.png",
          types: [{ name: "POISON" }, { name: "GRASS" }]
        }
      },
      {
        id: "2",
        order: 2,
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: [{ name: "ELECTRIC" }]
        }
      }
    ],
    name: "Team 1"
  },
  {
    insertedAt: "2018-06-08T21:15:14.723Z",
    id: "2",
    members: [
      {
        id: "1",
        order: 1,
        pokemon: {
          id: "4",
          name: "charmander",
          pokedexId: 4,
          sprite: "4.png",
          types: [{ name: "FIRE" }]
        }
      },
      {
        id: "2",
        order: 2,
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: [{ name: "ELECTRIC" }]
        }
      },
      {
        id: "3",
        order: 3,
        pokemon: {
          id: "93",
          name: "haunter",
          pokedexId: 93,
          sprite: "93.png",
          types: [{ name: "GHOST" }, { name: "POISON" }]
        }
      }
    ],
    name: "Team 2"
  }
];

storiesOf("Dashboard", module)
  .add("with teams", () => <Dashboard teams={mockData} />)
  .add("without teams", () => <Dashboard teams={[]} />);
