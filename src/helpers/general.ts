import {
  cond,
  lt,
  always,
  T,
  identity,
  propOr,
  prop,
  sort,
  equals,
  gt,
  toUpper
} from "ramda";
import uuid from "uuid/v4";
import * as variables from "./variables";
import { Type, Pokemon } from "../types";

export const getUniqueId = uuid;

export const percentage = cond([[lt(100), always(100)], [T, identity]]);

export const getTypeColor = (type: Type) => variables.colors[type] || variables.colors.primary

export const sortTypes = sort((x: Type, y: Type) => {
  if (equals(x, y)) return 0;
  if (x > y) return 1;
  return -1;
});

export const capitalize = (word: string = "") =>
  `${toUpper(word.charAt(0))}${word.slice(1)}`;

export const capitalizePokemonName = (pokemon: Pokemon) =>
  capitalize(prop("name", pokemon));

export const formatPokemonName = (pokemon: Pokemon) =>
  `#${pokemon.pokedexId} ${capitalizePokemonName(pokemon)}`;
