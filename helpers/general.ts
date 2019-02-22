import { equals, prop, toUpper } from "lodash/fp";
import uuid from "uuid/v4";
import { Pokemon, Type } from "../types"; // eslint-disable-line import/named
import * as variables from "./variables";

export const getUniqueId = uuid;

export const percentage = (val: number): number => (val > 100 ? 100 : val);

export const getTypeColor = (type: Type): string =>
  variables.colors[type] || variables.colors.primary;

export const sortTypes = (types: Type[]): Type[] =>
  [...types].sort((x: Type, y: Type) => {
    if (equals(x, y)) {
      return 0;
    }
    if (x > y) {
      return 1;
    }
    return -1;
  });

export const capitalize = (word: string = ""): string =>
  `${toUpper(word.charAt(0))}${word.slice(1)}`;

export const capitalizePokemonName = (pokemon: Pokemon): string =>
  capitalize(prop("name", pokemon));

export const formatPokemonName = (pokemon: Pokemon): string =>
  `#${pokemon.pokedexId} ${capitalizePokemonName(pokemon)}`;
