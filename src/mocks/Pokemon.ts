import { Pokemon } from '~/generated/graphql';
import { explosion, flash, rest, slash, substitute } from './Pokemon_Move';
import { electric, fire, ghost, poison } from './Pokemon_Type';

export const charmander: Pokemon = {
  id: '4',
  name: 'Charmander',
  slug: 'charmander',
  pokedex_id: 4,
  sprite: '4.png',
  types: [fire],
  learnable_moves: [substitute, slash, rest]
};

export const pikachu: Pokemon = {
  id: '25',
  name: 'Pikachu',
  slug: 'pikachu',
  pokedex_id: 25,
  sprite: '25.png',
  types: [electric],
  learnable_moves: [substitute, rest, flash]
};

export const haunter: Pokemon = {
  id: '93',
  name: 'Haunter',
  slug: 'haunter',
  pokedex_id: 93,
  sprite: '93.png',
  types: [ghost, poison],
  learnable_moves: [substitute, rest, explosion]
};
