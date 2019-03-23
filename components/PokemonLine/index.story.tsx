// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import PokemonLine from ".";

storiesOf("PokemonLine", module)
  .add("default", () => (
    <PokemonLine
      pokemon={{
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "ELECTRIC" }]
      }}
    />
  ))
  .add("with outdent", () => (
    <PokemonLine
      pokemon={{
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "ELECTRIC" }]
      }}
      outdent={10}
    />
  ));
