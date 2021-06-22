import { Meta, Story } from '@storybook/react/types-6-0';
import { pikachu } from '~/mocks/Pokemon';
import { CtaButton } from '~/components/Cta';
import { MovesProvider } from '~/hooks/useMoves';
import { PokemonCard, PokemonCardProps } from './PokemonCard';
import { explosion, flash } from '~/mocks/Pokemon_Move';

export default {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  args: {
    pokemon: pikachu
  }
} as Meta<PokemonCardProps>;

export const Standard: Story<PokemonCardProps> = args => (
  <PokemonCard {...args} />
);

export const WithTeamMember: Story<
  PokemonCardProps & { updateTeamMemberMoves: any }
> = args => (
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
    slot: 3,
    pokemon: pikachu,
    moves: {
      total: 2,
      teamMemberMoves: [
        {
          id: 'explosion',
          slot: 1,
          move: explosion
        },
        {
          id: 'flash',
          slot: 2,
          move: flash
        }
      ]
    }
  },
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};

export const WithActions: Story<PokemonCardProps> = args => (
  <PokemonCard {...args} />
);
WithActions.args = {
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};
