import { Meta } from '@storybook/react/types-6-0';
import { pikachu } from '~/mocks/Pokemon';
import { CtaButton } from '~/components/Cta';
import { MovesProvider } from '~/hooks/useMoves';
import { PokemonCard, PokemonCardProps } from './PokemonCard';
import { flash, substitute } from '~/mocks/Pokemon_Move';

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

export const WithTeamMember = (
  args: PokemonCardProps & { updateTeamMemberMoves: never }
): JSX.Element => (
  <MovesProvider
    teamMember={args.teamMember}
    updateTeamMemberMoves={args.updateTeamMemberMoves}
  >
    <PokemonCard {...args} />
  </MovesProvider>
);
WithTeamMember.argTypes = {
  updateTeamMemberMoves: { action: 'updateTeamMemberMoves' }
};
WithTeamMember.args = {
  teamMember: {
    id: '3',
    order: 3,
    pokemon: pikachu,
    learned_moves: [flash, substitute]
  },
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};

export const WithActions = (args: PokemonCardProps): JSX.Element => (
  <PokemonCard {...args} />
);
WithActions.args = {
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};
