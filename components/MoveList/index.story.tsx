import { storiesOf } from "@storybook/react";
import React from "react";
import MoveList from ".";
import { PokemonMove } from "../../types";

const moves: PokemonMove[] = [
  {
    version: "yellow",
    move: {
      damageClass: "status",
      accuracy: undefined,
      power: undefined,
      pp: 10,
      type: {
        name: "Normal",
        slug: "normal"
      },
      name: "Substitute",
      slug: "substitute"
    },
    levelLearnedAt: 0,
    learnMethod: "machine"
  },
  {
    version: "yellow",
    move: {
      damageClass: "special",
      accuracy: 100,
      power: 90,
      pp: 10,
      type: {
        name: "Psychic",
        slug: "psychic"
      },
      name: "Psychic",
      slug: "psychic"
    },
    levelLearnedAt: 0,
    learnMethod: "machine"
  },
  {
    version: "yellow",
    move: {
      damageClass: "physical",
      accuracy: 100,
      power: 250,
      pp: 5,
      type: {
        name: "Normal",
        slug: "normal"
      },
      name: "Explosion",
      slug: "explosion"
    },
    levelLearnedAt: 0,
    learnMethod: "machine"
  }
];

storiesOf("MoveList", module)
  .add("with moves", (): JSX.Element => <MoveList moves={moves} />)
  .add("without moves", (): JSX.Element => <MoveList moves={[]} />);
