import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { pikachu } from '~/mocks/Pokemon';
import { PokemonLine } from './PokemonLine';

export default {
  title: 'Components/Pokemon Line',
  component: PokemonLine,
  args: {
    pokemon: pikachu
  }
} as Meta<ComponentProps<typeof PokemonLine>>;

export const pokemonLine: Story<ComponentProps<typeof PokemonLine>> = args => (
  <PokemonLine {...args} />
);

export const withOutdent: Story<ComponentProps<typeof PokemonLine>> = args => (
  <PokemonLine {...args} />
);
withOutdent.args = {
  outdent: '1rem'
};
