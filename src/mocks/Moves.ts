import { Moves } from '~/generated/graphql';
import { normal, psychic } from './Types';

export const substitute: Moves = {
  id: 'substitute',
  type: normal,
  name: 'Substitute',
  slug: 'substitute',
  damage_class: { value: 'status' }
};

export const slash: Moves = {
  id: 'slash',
  type: normal,
  name: 'Slash',
  slug: 'slash',
  damage_class: { value: 'physical' }
};

export const rest: Moves = {
  id: 'rest',
  type: psychic,
  name: 'Rest',
  slug: 'rest',
  damage_class: { value: 'status' }
};

export const flash: Moves = {
  id: 'flash',
  type: normal,
  name: 'Flash',
  slug: 'flash',
  damage_class: { value: 'status' }
};

export const explosion: Moves = {
  id: 'explosion',
  type: normal,
  name: 'Explosion',
  slug: 'explosion',
  damage_class: { value: 'physical' }
};
