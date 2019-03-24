// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import PokemonSearch from ".";
import { Pokemon } from "../../types";

const pokemon: Pokemon[] = [
  {
    id: "4",
    name: "Charmander",
    slug: "charmander",
    pokedexId: 4,
    sprite: "4.png",
    types: [{ name: "Fire", slug: "fire" }]
  },
  {
    id: "25",
    name: "Pikachu",
    slug: "pikachu",
    pokedexId: 25,
    sprite: "25.png",
    types: [{ name: "Electric", slug: "electric" }]
  },
  {
    id: "93",
    name: "Haunter",
    slug: "haunter",
    pokedexId: 93,
    sprite: "93.png",
    types: [
      { name: "Ghost", slug: "ghost" },
      { name: "Poison", slug: "poison" }
    ]
  }
];

storiesOf("PokemonSearch", module).add("default", () => (
  <PokemonSearch
    pokemon={pokemon}
    setCurrentSearchPokemon={action("pokemon-result-clicked")}
  />
));
