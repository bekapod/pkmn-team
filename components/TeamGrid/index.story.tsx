// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import TeamGrid from ".";
import TeamCard from "../TeamCard";
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
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "ELECTRIC" }]
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
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "ELECTRIC" }]
      }
    }
  ],
  name: "Pikachu Team"
};

const card = <TeamCard team={team} />;

storiesOf("TeamGrid", module)
  .add("with teams", () => (
    <TeamGrid>
      {card}
      {card}
      {card}
      {card}
      {card}
    </TeamGrid>
  ))
  .add("empty", () => <TeamGrid />);
