import { storiesOf } from "@storybook/react";
import React from "react";
import PokemonGrid from ".";
import PokemonCard from "../PokemonCard";

const pokemon = (
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
);

storiesOf("PokemonGrid", module)
  .add(
    "with pokemon",
    (): JSX.Element => (
      <PokemonGrid>
        {pokemon}
        {pokemon}
        {pokemon}
        {pokemon}
        {pokemon}
      </PokemonGrid>
    )
  )
  .add("empty", (): JSX.Element => <PokemonGrid />);
