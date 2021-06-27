import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { PokemonSearch } from './PokemonSearch';

export default {
  title: 'Components/Pokemon Search',
  component: PokemonSearch,
  argTypes: { setCurrentSearchPokemon: { action: 'setCurrentSearchPokemon' } }
} as Meta<ComponentProps<typeof PokemonSearch>>;

export const pokemonSearch: Story<ComponentProps<typeof PokemonSearch>> =
  args => <PokemonSearch {...args} />;
