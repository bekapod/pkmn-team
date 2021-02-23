import { Pokemon } from '~/generated/graphql';
import {
  blaze,
  lightningRod,
  solarPower,
  staticc,
  levitate
} from './Pokemon_Ability';
import { explosion, flash, rest, slash, substitute } from './Pokemon_Move';
import { electric, fire, ghost, poison } from './Pokemon_Type';

export const charmander: Pokemon = {
  id: '4',
  name: 'Charmander',
  slug: 'charmander',
  pokedex_id: 4,
  sprite: '4.png',
  types: [fire],
  learnable_moves: [substitute, slash, rest],
  hp: 39,
  attack: 52,
  defense: 43,
  special_attack: 60,
  special_defense: 50,
  speed: 65,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  description:
    'The flame at the tip of its tail makes a sound as\nit burns. You can only hear it in quiet places.',
  abilities: [blaze, solarPower]
};

export const pikachu: Pokemon = {
  id: '25',
  name: 'Pikachu',
  slug: 'pikachu',
  pokedex_id: 25,
  sprite: '25.png',
  hp: 35,
  attack: 55,
  defense: 40,
  special_attack: 50,
  special_defense: 50,
  speed: 90,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  description:
    'While sleeping, it generates electricity in the\nsacs in its cheeks. If it’s not getting enough\nsleep, it will be able to use only weak electricity.',
  types: [electric],
  learnable_moves: [substitute, rest, flash],
  abilities: [staticc, lightningRod]
};

export const haunter: Pokemon = {
  id: '93',
  name: 'Haunter',
  slug: 'haunter',
  pokedex_id: 93,
  sprite: '93.png',
  hp: 45,
  attack: 50,
  defense: 45,
  special_attack: 115,
  special_defense: 55,
  speed: 95,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  description:
    'It’s dangerous to go outside alone on nights\nwhen you’re feeling sad. Haunter will catch you,\nand you won’t be able to go back home.',
  types: [ghost, poison],
  learnable_moves: [substitute, rest, explosion],
  abilities: [levitate]
};
