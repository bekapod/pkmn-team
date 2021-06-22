import {
  MoveLearnMethod,
  PokemonMoveFragmentFragment
} from '~/generated/graphql';
import * as move from './Moves';

export const substitute: PokemonMoveFragmentFragment = {
  move: move.substitute,
  learnMethod: MoveLearnMethod.LevelUp,
  levelLearnedAt: 22
};

export const slash: PokemonMoveFragmentFragment = {
  move: move.slash,
  learnMethod: MoveLearnMethod.Record,
  levelLearnedAt: 0
};

export const rest: PokemonMoveFragmentFragment = {
  move: move.rest,
  learnMethod: MoveLearnMethod.Record,
  levelLearnedAt: 0
};

export const flash: PokemonMoveFragmentFragment = {
  move: move.flash,
  learnMethod: MoveLearnMethod.Egg,
  levelLearnedAt: 0
};

export const explosion: PokemonMoveFragmentFragment = {
  move: move.explosion,
  learnMethod: MoveLearnMethod.Tutor,
  levelLearnedAt: 0
};
