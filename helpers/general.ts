import { equals, prop, toUpper } from "lodash/fp";
import uuid from "uuid/v4";
import { IPokemon, Type } from "../types";
import * as variables from "./variables";

export const getUniqueId = uuid;

export const percentage = (val: number) => (val > 100 ? 100 : val);

export const getTypeColor = (type: Type) =>
  variables.colors[type] || variables.colors.primary;

export const sortTypes = (types: Type[]) =>
  [...types].sort((x: Type, y: Type) => {
    if (equals(x, y)) {
      return 0;
    }
    if (x > y) {
      return 1;
    }
    return -1;
  });

export const capitalize = (word: string = "") =>
  `${toUpper(word.charAt(0))}${word.slice(1)}`;

export const capitalizePokemonName = (pokemon: IPokemon) =>
  capitalize(prop("name", pokemon));

export const formatPokemonName = (pokemon: IPokemon) =>
  `#${pokemon.pokedexId} ${capitalizePokemonName(pokemon)}`;
