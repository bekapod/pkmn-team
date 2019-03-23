// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import PokemonSearch from ".";
import { Pokemon } from "../../types";

const pokemon: Pokemon[] = [
  {
    id: "4",
    name: "charmander",
    pokedexId: 4,
    sprite: "4.png",
    types: [{ name: "FIRE" }]
  },
  {
    id: "25",
    name: "pikachu",
    pokedexId: 25,
    sprite: "25.png",
    types: [{ name: "ELECTRIC" }]
  },
  {
    id: "93",
    name: "haunter",
    pokedexId: 93,
    sprite: "93.png",
    types: [{ name: "GHOST" }, { name: "POISON" }]
  }
];

storiesOf("PokemonSearch", module).add("default", () => (
  <PokemonSearch
    pokemon={pokemon}
    setCurrentSearchPokemon={action("pokemon-result-clicked")}
  />
));
