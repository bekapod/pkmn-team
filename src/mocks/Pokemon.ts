import { Color, Habitat, PokemonFragment, Shape } from '~/generated/graphql';
import {
  blaze,
  lightningRod,
  solarPower,
  staticc,
  levitate
} from './Abilities';
import { electric, fire, ghost, poison } from './Types';

export const charmander: PokemonFragment = {
  id: '4',
  name: 'Charmander',
  slug: 'charmander',
  pokedexId: 4,
  sprite: '4.png',
  types: {
    edges: [
      {
        node: {
          ...fire,
          noDamageFrom: { edges: [] },
          halfDamageFrom: { edges: [] },
          doubleDamageFrom: { edges: [] }
        }
      }
    ]
  },
  hp: 39,
  attack: 52,
  defense: 43,
  specialAttack: 60,
  specialDefense: 50,
  speed: 65,
  isBaby: false,
  isLegendary: false,
  isMythical: false,
  description:
    'The flame at the tip of its tail makes a sound as\nit burns. You can only hear it in quiet places.',
  abilities: {
    edges: [
      { slot: 1, isHidden: false, node: blaze },
      { slot: 2, isHidden: false, node: solarPower }
    ]
  },
  color: Color.Red,
  shape: Shape.Arms,
  habitat: Habitat.Grassland,
  height: 0,
  weight: 0,
  isDefaultVariant: true,
  eggGroups: {
    edges: []
  },
  evolvesTo: { edges: [] },
  evolvesFrom: { edges: [] },
  moves: { edges: [] }
};

export const pikachu: PokemonFragment = {
  id: '25',
  name: 'Pikachu',
  slug: 'pikachu',
  pokedexId: 25,
  sprite: '25.png',
  hp: 35,
  attack: 55,
  defense: 40,
  specialAttack: 50,
  specialDefense: 50,
  speed: 90,
  isBaby: false,
  isLegendary: false,
  isMythical: false,
  description:
    'While sleeping, it generates electricity in the\nsacs in its cheeks. If it’s not getting enough\nsleep, it will be able to use only weak electricity.',
  types: {
    edges: [
      {
        node: {
          ...electric,
          noDamageFrom: { edges: [] },
          halfDamageFrom: { edges: [] },
          doubleDamageFrom: { edges: [] }
        }
      }
    ]
  },
  abilities: {
    edges: [
      { slot: 1, isHidden: false, node: staticc },
      { slot: 2, isHidden: false, node: lightningRod }
    ]
  },
  color: Color.Red,
  shape: Shape.Arms,
  habitat: Habitat.Grassland,
  height: 0,
  weight: 0,
  isDefaultVariant: true,
  eggGroups: {
    edges: []
  },
  evolvesTo: { edges: [] },
  evolvesFrom: { edges: [] },
  moves: { edges: [] }
};

export const haunter: PokemonFragment = {
  id: '93',
  name: 'Haunter',
  slug: 'haunter',
  pokedexId: 93,
  sprite: '93.png',
  hp: 45,
  attack: 50,
  defense: 45,
  specialAttack: 115,
  specialDefense: 55,
  speed: 95,
  isBaby: false,
  isLegendary: false,
  isMythical: false,
  description:
    'It’s dangerous to go outside alone on nights\nwhen you’re feeling sad. Haunter will catch you,\nand you won’t be able to go back home.',
  types: {
    edges: [
      {
        node: {
          ...ghost,
          noDamageFrom: { edges: [] },
          halfDamageFrom: { edges: [] },
          doubleDamageFrom: { edges: [] }
        }
      },
      {
        node: {
          ...poison,
          noDamageFrom: { edges: [] },
          halfDamageFrom: { edges: [] },
          doubleDamageFrom: { edges: [] }
        }
      }
    ]
  },
  abilities: {
    edges: [{ slot: 1, isHidden: false, node: levitate }]
  },
  color: Color.Red,
  shape: Shape.Arms,
  habitat: Habitat.Grassland,
  height: 0,
  weight: 0,
  isDefaultVariant: true,
  eggGroups: {
    edges: []
  },
  evolvesTo: { edges: [] },
  evolvesFrom: { edges: [] },
  moves: { edges: [] }
};
