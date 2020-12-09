import { Meta } from '@storybook/react/types-6-0';
import { Pokemon } from '~/generated/graphql';
import { TeamCard, TeamCardProps } from './TeamCard';

const pokemon: Pokemon[] = [
  {
    _id: '',
    _ts: '',
    name: 'Charmander',
    slug: 'charmander',
    pokedexId: 4,
    sprite: '4.png',
    types: [
      { _id: '', _ts: '', name: 'Fire', slug: 'fire', moves: [], pokemon: [] }
    ],
    learnableMoves: [
      {
        key: '',
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Substitute',
          slug: 'substitute',
          _id: '',
          _ts: '',
          generation: '',
          damageClass: 'status'
        },
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Slash',
          slug: 'slash',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 30,
        learnMethod: 'level-up'
      },
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Psychic',
            slug: 'psychic'
          },
          name: 'Rest',
          slug: 'rest',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      }
    ]
  },
  {
    _id: '',
    _ts: '',
    name: 'Pikachu',
    slug: 'pikachu',
    pokedexId: 25,
    sprite: '25.png',
    types: [
      {
        _id: '',
        _ts: '',
        moves: [],
        pokemon: [],
        name: 'Electric',
        slug: 'electric'
      }
    ],
    learnableMoves: [
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Substitute',
          slug: 'substitute',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Psychic',
            slug: 'psychic'
          },
          name: 'Rest',
          slug: 'rest',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Flash',
          slug: 'flash',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      }
    ]
  },
  {
    _id: '',
    _ts: '',
    name: 'Haunter',
    slug: 'haunter',
    pokedexId: 93,
    sprite: '93.png',
    types: [
      {
        _id: '',
        _ts: '',
        moves: [],
        pokemon: [],
        name: 'Ghost',
        slug: 'ghost'
      },
      {
        _id: '',
        _ts: '',
        moves: [],
        pokemon: [],
        name: 'Poison',
        slug: 'poison'
      }
    ],
    learnableMoves: [
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Substitute',
          slug: 'substitute',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Psychic',
            slug: 'psychic'
          },
          name: 'Rest',
          slug: 'rest',
          _id: '',
          _ts: '',
          damageClass: 'status',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          type: {
            _id: '',
            _ts: '',
            moves: [],
            pokemon: [],
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Explosion',
          slug: 'explosion',
          _id: '',
          _ts: '',
          damageClass: 'physical',
          generation: ''
        },
        key: '',
        levelLearnedAt: 0,
        learnMethod: 'machine'
      }
    ]
  }
];

export default {
  title: 'Components/TeamCard',
  component: TeamCard,
  args: {
    _id: '123',
    _ts: '2018-06-08T21:15:14.723Z',
    name: 'My super team!',
    members: [
      {
        id: '1',
        order: 1,
        pokemon: pokemon[0],
        learnedMoves: []
      },
      {
        id: '2',
        order: 2,
        pokemon: pokemon[1],
        learnedMoves: []
      },
      {
        id: '3',
        order: 3,
        pokemon: pokemon[2],
        learnedMoves: []
      }
    ]
  }
} as Meta<TeamCardProps>;

export const Standard = (args: TeamCardProps): JSX.Element => (
  <TeamCard {...args} />
);
