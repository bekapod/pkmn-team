// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import MoveLine from ".";
import { DeduplicatedMove } from "../../types";

const move: DeduplicatedMove = {
  name: "substitute",
  damageClass: "PHYSICAL",
  accuracy: 80,
  power: 100,
  pp: 10,
  types: [
    {
      name: "NORMAL"
    }
  ],
  variations: [
    {
      levelLearnedAt: 0,
      version: "yellow",
      learnMethod: "machine"
    }
  ]
};

storiesOf("MoveLine", module).add("default", () => <MoveLine {...move} />);
