// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import PokemonCard from ".";

storiesOf("PokemonCard", module)
  .add("default", () => (
    <PokemonCard
      pokemon={{
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "ELECTRIC" }]
      }}
    />
  ))
  .add("when has actions to display", () => (
    <PokemonCard
      pokemon={{
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "ELECTRIC" }]
      }}
      renderCardActions={(): JSX.Element => (
        <div>Card actions that should be rendered</div>
      )}
    />
  ));
