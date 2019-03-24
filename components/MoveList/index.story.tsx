// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import MoveList from ".";
import { PokemonMove } from "../../types";

const moves: PokemonMove[] = [
  {
    version: "yellow",
    move: {
      damageClass: "STATUS",
      accuracy: undefined,
      power: undefined,
      pp: 10,
      types: [
        {
          name: "NORMAL"
        }
      ],
      name: "substitute"
    },
    levelLearnedAt: 0,
    learnMethod: "machine"
  },
  {
    version: "yellow",
    move: {
      damageClass: "SPECIAL",
      accuracy: 100,
      power: 90,
      pp: 10,
      types: [
        {
          name: "PSYCHIC"
        }
      ],
      name: "psychic"
    },
    levelLearnedAt: 0,
    learnMethod: "machine"
  },
  {
    version: "yellow",
    move: {
      damageClass: "PHYSICAL",
      accuracy: 100,
      power: 250,
      pp: 5,
      types: [
        {
          name: "NORMAL"
        }
      ],
      name: "explosion"
    },
    levelLearnedAt: 0,
    learnMethod: "machine"
  }
];

storiesOf("MoveList", module)
  .add("with moves", () => <MoveList moves={moves} />)
  .add("without moves", () => <MoveList moves={[]} />);
