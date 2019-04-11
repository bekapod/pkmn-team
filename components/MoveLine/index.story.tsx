// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import MoveLine from ".";
import { DeduplicatedMove } from "../../types";

const move: DeduplicatedMove = {
  name: "Substitute",
  slug: "substitute",
  damageClass: "physical",
  accuracy: 80,
  power: 100,
  pp: 10,
  type: {
    name: "Normal",
    slug: "normal"
  },
  variations: [
    {
      levelLearnedAt: 0,
      version: "yellow",
      learnMethod: "machine"
    }
  ]
};

storiesOf("MoveLine", module).add("default", () => <MoveLine {...move} />);
