import { Meta, Story } from '@storybook/react/types-6-0';
import { pikachu } from '~/mocks/Pokemon';
import { CtaButton } from '~/components/Cta';
import { MovesProvider } from '~/hooks/useMoves';
import { PokemonCard, PokemonCardProps } from './PokemonCard';

export default {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  args: {
    pokemon: pikachu
  }
} as Meta<PokemonCardProps>;

export const pokemonCard: Story<PokemonCardProps> = args => (
  <PokemonCard {...args} />
);

export const withTeamMember: Story<
  PokemonCardProps & { updateTeamMemberMoves: any }
> = args => (
  <MovesProvider
    teamMember={args.teamMember}
    updateTeamMemberMoves={args.updateTeamMemberMoves}
  >
    <PokemonCard {...args} />
  </MovesProvider>
);
withTeamMember.argTypes = {
  updateTeamMemberMoves: { action: 'updateTeamMemberMoves' }
};
withTeamMember.args = {
  teamMember: {
    id: '3',
    pokemon: pikachu,
    moves: { edges: [] }
  },
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};

export const withActions: Story<PokemonCardProps> = args => (
  <PokemonCard {...args} />
);
withActions.args = {
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};
