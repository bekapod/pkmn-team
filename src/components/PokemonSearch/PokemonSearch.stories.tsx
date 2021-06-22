import { Meta, Story } from '@storybook/react/types-6-0';
import { PokemonSearch, PokemonSearchProps } from './PokemonSearch';

export default {
  title: 'Components/PokemonSearch',
  component: PokemonSearch,
  argTypes: { setCurrentSearchPokemon: { action: 'setCurrentSearchPokemon' } }
} as Meta<PokemonSearchProps>;

export const pokemonSearch: Story<PokemonSearchProps> = args => (
  <PokemonSearch {...args} />
);
