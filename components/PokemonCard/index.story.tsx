// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import PokemonCard from ".";

storiesOf("PokemonCard", module)
  .add("default", () => (
    <PokemonCard
      pokemon={{
        id: "25",
        name: "Pikachu",
        slug: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "Electric", slug: "electric" }]
      }}
    />
  ))
  .add("when has actions to display", () => (
    <PokemonCard
      pokemon={{
        id: "25",
        name: "Pikachu",
        slug: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "Electric", slug: "electric" }]
      }}
      renderCardActions={(): JSX.Element => (
        <div>Card actions that should be rendered</div>
      )}
    />
  ));
