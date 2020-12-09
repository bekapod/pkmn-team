import { Meta } from '@storybook/react/types-6-0';
import { PokemonCard } from '../PokemonCard';
import { PokemonGrid } from './PokemonGrid';

export default {
  title: 'Components/PokemonGrid',
  component: PokemonGrid
} as Meta;

export const Standard = (): JSX.Element => (
  <PokemonGrid>
    <PokemonCard
      pokemon={{
        _id: '25',
        _ts: '',
        learnableMoves: [],
        name: 'Pikachu',
        slug: 'pikachu',
        pokedexId: 25,
        sprite: '25.png',
        types: [
          {
            name: 'Electric',
            slug: 'electric',
            _id: '',
            _ts: '',
            moves: [],
            pokemon: []
          }
        ]
      }}
    />
    <PokemonCard
      pokemon={{
        _id: '25',
        _ts: '',
        learnableMoves: [],
        name: 'Pikachu',
        slug: 'pikachu',
        pokedexId: 25,
        sprite: '25.png',
        types: [
          {
            name: 'Electric',
            slug: 'electric',
            _id: '',
            _ts: '',
            moves: [],
            pokemon: []
          }
        ]
      }}
    />
    <PokemonCard
      pokemon={{
        _id: '25',
        _ts: '',
        learnableMoves: [],
        name: 'Pikachu',
        slug: 'pikachu',
        pokedexId: 25,
        sprite: '25.png',
        types: [
          {
            name: 'Electric',
            slug: 'electric',
            _id: '',
            _ts: '',
            moves: [],
            pokemon: []
          }
        ]
      }}
    />
    <PokemonCard
      pokemon={{
        _id: '25',
        _ts: '',
        learnableMoves: [],
        name: 'Pikachu',
        slug: 'pikachu',
        pokedexId: 25,
        sprite: '25.png',
        types: [
          {
            name: 'Electric',
            slug: 'electric',
            _id: '',
            _ts: '',
            moves: [],
            pokemon: []
          }
        ]
      }}
    />
    <PokemonCard
      pokemon={{
        _id: '25',
        _ts: '',
        learnableMoves: [],
        name: 'Pikachu',
        slug: 'pikachu',
        pokedexId: 25,
        sprite: '25.png',
        types: [
          {
            name: 'Electric',
            slug: 'electric',
            _id: '',
            _ts: '',
            moves: [],
            pokemon: []
          }
        ]
      }}
    />
  </PokemonGrid>
);
