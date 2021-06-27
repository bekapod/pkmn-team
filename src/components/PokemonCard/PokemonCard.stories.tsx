import { Meta, Story } from '@storybook/react/types-6-0';
import { pikachu } from '~/mocks/Pokemon';
import { CtaButton } from '~/components/Cta';
import { MovesProvider } from '~/hooks/useMoves';
import { PokemonCard } from './PokemonCard';
import { ComponentProps } from 'react';
import {
  TeamMemberFragment,
  TeamMemberMoveFragment
} from '~/generated/graphql';
import { flash, substitute } from '~/mocks/Moves';

export default {
  title: 'Components/Pokemon Card',
  component: PokemonCard,
  args: {
    pokemon: pikachu
  }
} as Meta<ComponentProps<typeof PokemonCard>>;

export const pokemonCard: Story<ComponentProps<typeof PokemonCard>> = args => (
  <PokemonCard {...args} />
);

export const withTeamMember: Story<
  ComponentProps<typeof PokemonCard> & {
    updateTeamMemberMoves: (values: {
      member: TeamMemberFragment;
      moves: TeamMemberMoveFragment[];
    }) => void;
  }
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
    moves: {
      edges: [
        { id: '1', node: substitute },
        { id: '2', node: flash }
      ]
    }
  },
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};

export const withActions: Story<ComponentProps<typeof PokemonCard>> = args => (
  <PokemonCard {...args} />
);
withActions.args = {
  renderCardActions: () => (
    <CtaButton type="button" size="small" variant="destructive">
      Some action
    </CtaButton>
  )
};
