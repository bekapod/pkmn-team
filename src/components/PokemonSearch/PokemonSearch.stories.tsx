import { Meta } from '@storybook/react/types-6-0';
import { PokemonSearch, PokemonSearchProps } from './PokemonSearch';

export default {
  title: 'Components/PokemonSearch',
  component: PokemonSearch,
  argTypes: { setCurrentSearchPokemon: { action: 'setCurrentSearchPokemon' } }
} as Meta<PokemonSearchProps>;

export const Standard = (args: PokemonSearchProps): JSX.Element => (
  <PokemonSearch {...args} />
);
