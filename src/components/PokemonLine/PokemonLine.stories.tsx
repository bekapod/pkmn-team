import { Meta } from '@storybook/react/types-6-0';
import { PokemonLine, PokemonLineProps } from './PokemonLine';

export default {
  title: 'Components/PokemonLine',
  component: PokemonLine,
  args: {
    pokemon: {
      _id: '25',
      name: 'Pikachu',
      slug: 'pikachu',
      pokedexId: 25,
      sprite: '25.png',
      types: [{ name: 'Electric', slug: 'electric' }]
    }
  }
} as Meta<PokemonLineProps>;

export const Standard = (args: PokemonLineProps): JSX.Element => (
  <PokemonLine {...args} />
);

export const WithOutdent = (args: PokemonLineProps): JSX.Element => (
  <PokemonLine {...args} />
);
WithOutdent.args = {
  outdent: '1rem'
};
