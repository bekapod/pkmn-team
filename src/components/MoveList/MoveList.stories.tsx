import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { MovesProvider } from '~/hooks/useMoves';
import { explosion, flash, substitute, rest, slash } from '~/mocks/Moves';
import { haunter } from '~/mocks/Pokemon';
import { MoveList } from './MoveList';

export default {
  title: 'Components/Move List',
  component: MoveList,
  args: {
    allMoves: [substitute, flash, explosion]
  }
} as Meta<ComponentProps<typeof MoveList>>;

export const moveList: Story<ComponentProps<typeof MoveList>> = args => (
  <MoveList {...args} />
);

export const withMoreMoves: Story<ComponentProps<typeof MoveList>> = args => (
  <MoveList {...args} />
);
withMoreMoves.args = {
  allMoves: [substitute, flash, explosion, rest, slash]
};

export const withTeamMember: Story<
  ComponentProps<typeof MoveList> & { updateTeamMemberMoves: never }
> = ({ updateTeamMemberMoves, ...args }) => (
  <MovesProvider
    teamMember={args.teamMember}
    updateTeamMemberMoves={updateTeamMemberMoves}
  >
    <MoveList {...args} />
  </MovesProvider>
);
withTeamMember.argTypes = {
  updateTeamMemberMoves: { action: 'updateTeamMemberMove' }
};
withTeamMember.args = {
  teamMember: {
    id: '1',
    pokemon: haunter,
    moves: { edges: [] }
  }
};
