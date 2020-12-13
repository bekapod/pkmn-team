import { Pokemon_Move } from '~/generated/graphql';
import * as move from './Moves';

export const substitute: Pokemon_Move = {
  move_id: 'subtitute',
  move: move.substitute
};

export const slash: Pokemon_Move = {
  move_id: 'slash',
  move: move.slash
};

export const rest: Pokemon_Move = {
  move_id: 'rest',
  move: move.rest
};

export const flash: Pokemon_Move = {
  move_id: 'flash',
  move: move.flash
};

export const explosion: Pokemon_Move = {
  move_id: 'explosion',
  move: move.explosion
};
