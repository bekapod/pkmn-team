import { Meta } from '@storybook/react/types-6-0';
import { PokemonSearch, PokemonSearchProps } from './PokemonSearch';

export default {
  title: 'Components/PokemonSearch',
  component: PokemonSearch,
  argTypes: { setCurrentSearchPokemon: { action: 'setCurrentSearchPokemon' } },
  args: {
    pokemon: [
      {
        _id: '4',
        _ts: '',
        learnableMoves: [],
        name: 'Charmander',
        slug: 'charmander',
        pokedexId: 4,
        sprite: '4.png',
        types: [
          {
            _id: '',
            _ts: '',
            pokemon: [],
            moves: [],
            name: 'Fire',
            slug: 'fire'
          }
        ]
      },
      {
        _id: '25',
        _ts: '',
        learnableMoves: [],
        name: 'Pikachu',
        slug: 'pikachu',
        pokedexId: 25,
        sprite: '25.png',
        types: [
          {
            _id: '',
            _ts: '',
            pokemon: [],
            moves: [],
            name: 'Electric',
            slug: 'electric'
          }
        ]
      },
      {
        _id: '93',
        _ts: '',
        learnableMoves: [],
        name: 'Haunter',
        slug: 'haunter',
        pokedexId: 93,
        sprite: '93.png',
        types: [
          {
            _id: '',
            _ts: '',
            pokemon: [],
            moves: [],
            name: 'Ghost',
            slug: 'ghost'
          },
          {
            _id: '',
            _ts: '',
            pokemon: [],
            moves: [],
            name: 'Poison',
            slug: 'poison'
          }
        ]
      }
    ]
  }
} as Meta<PokemonSearchProps>;

export const Standard = (args: PokemonSearchProps): JSX.Element => (
  <PokemonSearch {...args} />
);
