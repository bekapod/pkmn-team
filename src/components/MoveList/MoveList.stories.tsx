import { Meta, Story } from '@storybook/react/types-6-0';
import { MovesProvider } from '~/hooks/useMoves';
import { haunter } from '~/mocks/Pokemon';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    allMoves: []
  }
} as Meta<MoveListProps>;

export const moveList: Story<MoveListProps> = args => <MoveList {...args} />;

export const withMoreMoves: Story<MoveListProps> = args => (
  <MoveList {...args} />
);
withMoreMoves.args = {
  allMoves: []
};

export const withTeamMember: Story<
  MoveListProps & { updateTeamMemberMoves: never }
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
