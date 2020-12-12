import { Meta } from '@storybook/react/types-6-0';
import { pikachu } from '~/mocks/Pokemon';
import { PokemonCard, PokemonCardProps } from './PokemonCard';

export default {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  args: {
    pokemon: pikachu
  }
} as Meta<PokemonCardProps>;

export const Standard = (args: PokemonCardProps): JSX.Element => (
  <PokemonCard {...args} />
);

export const WithActions = (args: PokemonCardProps): JSX.Element => (
  <PokemonCard {...args} />
);
WithActions.args = {
  renderCardActions: () => <div>Card actions that should be rendered</div>
};
