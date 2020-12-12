import { Meta } from '@storybook/react/types-6-0';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { PokemonSearch, PokemonSearchProps } from './PokemonSearch';

export default {
  title: 'Components/PokemonSearch',
  component: PokemonSearch,
  argTypes: { setCurrentSearchPokemon: { action: 'setCurrentSearchPokemon' } },
  args: {
    pokemon: [charmander, pikachu, haunter]
  }
} as Meta<PokemonSearchProps>;

export const Standard = (args: PokemonSearchProps): JSX.Element => (
  <PokemonSearch {...args} />
);
