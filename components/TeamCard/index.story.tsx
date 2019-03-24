// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import TeamCard from ".";
import { Team } from "../../types";

const team: Team = {
  insertedAt: "2018-06-08T21:15:14.723Z",
  id: "1",
  members: [
    {
      id: "1",
      order: 1,
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
        id: "25",
        name: "Pikachu",
        slug: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "Electric", slug: "electric" }]
      }
    }
  ],
  name: "Pikachu Team"
};

storiesOf("TeamCard", module).add("default", () => <TeamCard team={team} />);
