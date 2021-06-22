import { Meta, Story } from '@storybook/react/types-6-0';
import { pikachu } from '~/mocks/Pokemon';
import { PokemonLine, PokemonLineProps } from './PokemonLine';

export default {
  title: 'Components/PokemonLine',
  component: PokemonLine,
  args: {
    pokemon: pikachu
  }
} as Meta<PokemonLineProps>;

export const Standard: Story<PokemonLineProps> = args => (
  <PokemonLine {...args} />
);

export const WithOutdent: Story<PokemonLineProps> = args => (
  <PokemonLine {...args} />
);
WithOutdent.args = {
  outdent: '1rem'
};
