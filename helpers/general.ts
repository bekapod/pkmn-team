import {
  equals,
  prop,
  toUpper,
  getOr,
  groupBy,
  omit,
  defaultTo,
  partition
} from "lodash/fp";
import uuid from "uuid/v4";
import { compose } from "redux";
import {
  Pokemon,
  Type,
  PokemonMove,
  DeduplicatedMove,
  MoveVariation
} from "../types"; // eslint-disable-line import/named
import * as variables from "./variables";

export const getUniqueId = uuid;

export const percentage = (val: number): number => (val > 100 ? 100 : val);

export const capitalize = (word: string = ""): string =>
  `${toUpper(word.charAt(0))}${word.slice(1)}`;

export const getTypeColor = (type: Type): string =>
  variables.colors[type] || variables.colors.primary;

export const sortTypes = (types: { name: Type }[]): Type[] =>
  types.map(getOr("NORMAL" as Type, "name")).sort((x: Type, y: Type) => {
    if (equals(x, y)) {
      return 0;
    }
    if (x > y) {
      return 1;
    }
    return -1;
  });

export const capitalizePokemonName = (pokemon: Pokemon): string =>
  capitalize(prop("name", pokemon));

export const formatPokemonName = (pokemon: Pokemon): string =>
  `#${pokemon.pokedexId} ${capitalizePokemonName(pokemon)}`;

const groupByMoveName = groupBy("move.name");

const deduplicateMoves = (moves: {
  [key: string]: PokemonMove[];
}): DeduplicatedMove[] =>
  Object.keys(moves).map(moveKey => {
    const moveList = moves[moveKey];
    return {
      ...moveList[0].move,
      variations: moveList.map(omit("move")) as MoveVariation[]
    };
  });

const sortMovesByName = (moves: DeduplicatedMove[]): DeduplicatedMove[] =>
  [...moves].sort((x: DeduplicatedMove, y: DeduplicatedMove) => {
    const xName = x.name;
    const yName = y.name;

    if (xName === yName) {
      return 0;
    }

    if (xName > yName) {
      return 1;
    }

    return -1;
  });

const sortMoves = (moves: DeduplicatedMove[]): DeduplicatedMove[] =>
  [...moves].sort((x: DeduplicatedMove, y: DeduplicatedMove) => {
    const xLevel = getOr(
      0,
      "levelLearnedAt",
      x.variations.find(variation => variation.learnMethod !== "machine")
    );
    const yLevel = getOr(
      0,
      "levelLearnedAt",
      y.variations.find(variation => variation.learnMethod !== "machine")
    );
    if (xLevel === yLevel) {
      return 0;
    }
    if (xLevel > yLevel) {
      return 1;
    }
    return -1;
  });

export const combineDuplicatePokemonMoves: (
  moves: PokemonMove[]
) => DeduplicatedMove[] = compose(
  (partitions: DeduplicatedMove[][]) => [
    ...partitions[0],
    ...sortMovesByName(partitions[1])
  ],
  partition((move: DeduplicatedMove) =>
    defaultTo(
      false,
      move.variations.find(variation => variation.learnMethod === "level-up")
    )
  ),
  sortMoves,
  deduplicateMoves,
  groupByMoveName
);
