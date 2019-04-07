import {
  equals,
  prop,
  toUpper,
  getOr,
  groupBy,
  omit,
  defaultTo,
  partition,
  get,
  sortBy
} from "lodash/fp";
import uuid from "uuid/v4";
import { compose } from "redux";
import {
  Pokemon,
  Type,
  TypeSlug, // eslint-disable-line import/named
  PokemonMove,
  DeduplicatedMove,
  MoveVariation
} from "../types";
import * as variables from "./variables";

export const getUniqueId = uuid;

export const percentage = (val: number): number => (val > 100 ? 100 : val);

export const capitalize = (word: string = ""): string =>
  `${toUpper(word.charAt(0))}${word.slice(1)}`;

export const getTypeColor = (type: TypeSlug): string =>
  variables.colors[type] || variables.colors.primary;

export const sortTypes = (types: Type[]): Type[] =>
  types.sort((x: Type, y: Type) => {
    const xSlug = get("slug", x);
    const ySlug = get("slug", y);

    if (equals(xSlug, ySlug)) {
      return 0;
    }
    if (xSlug > ySlug) {
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

type SortMovesByName = (moves: DeduplicatedMove[]) => DeduplicatedMove[];
const sortMovesByName: SortMovesByName = sortBy((move: DeduplicatedMove) =>
  get("name", move)
);

type SortMoves = (moves: DeduplicatedMove[]) => DeduplicatedMove[];
const sortMoves: SortMoves = sortBy((move: DeduplicatedMove) =>
  getOr(
    0,
    "levelLearnedAt",
    move.variations.find(variation => variation.learnMethod !== "machine")
  )
);

export const combineDuplicatePokemonMoves: (
  moves: PokemonMove[]
) => DeduplicatedMove[] = compose(
  (partitions: DeduplicatedMove[][]) => [...partitions[0], ...partitions[1]],
  partition((move: DeduplicatedMove) =>
    defaultTo(
      false,
      move.variations.find(variation => variation.learnMethod === "level-up")
    )
  ),
  sortMoves,
  sortMovesByName,
  deduplicateMoves,
  groupByMoveName
);
