// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import PokemonGrid from ".";
import PokemonCard from "../PokemonCard";

const pokemon = (
  <PokemonCard
    pokemon={{
      id: "25",
      name: "pikachu",
      pokedexId: 25,
      sprite: "25.png",
      types: [{ name: "ELECTRIC" }]
    }}
  />
);

storiesOf("PokemonGrid", module)
  .add("with pokemon", () => (
    <PokemonGrid>
      {pokemon}
      {pokemon}
      {pokemon}
      {pokemon}
      {pokemon}
    </PokemonGrid>
  ))
  .add("empty", () => <PokemonGrid />);
