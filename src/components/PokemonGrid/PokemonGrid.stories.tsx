import { Meta, Story } from '@storybook/react/types-6-0';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { PokemonCard } from '../PokemonCard';
import { PokemonGrid } from './PokemonGrid';

export default {
  title: 'Components/Pokemon Grid',
  component: PokemonGrid
} as Meta;

export const pokemonGrid: Story = () => (
  <PokemonGrid>
    <PokemonCard pokemon={pikachu} />
    <PokemonCard pokemon={haunter} />
    <PokemonCard pokemon={charmander} />
    <PokemonCard pokemon={pikachu} />
    <PokemonCard pokemon={haunter} />
  </PokemonGrid>
);
