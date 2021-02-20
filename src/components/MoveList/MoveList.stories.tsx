import { Meta } from '@storybook/react/types-6-0';
import { MovesProvider } from '~/hooks/useMoves';
import { explosion, flash, substitute, rest, slash } from '~/mocks/Moves';
import { haunter } from '~/mocks/Pokemon';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    allMoves: [substitute, flash, explosion]
  }
} as Meta<MoveListProps>;

export const WithFewMoves = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);

export const WithMoreMoves = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);
WithMoreMoves.args = {
  allMoves: [substitute, flash, explosion, rest, slash]
};

export const WithTeamMember = ({
  updateTeamMemberMoves,
  ...args
}: MoveListProps & { updateTeamMemberMoves: never }): JSX.Element => (
  <MovesProvider
    teamMember={args.teamMember}
    updateTeamMemberMoves={updateTeamMemberMoves}
  >
    <MoveList {...args} />
  </MovesProvider>
);
WithTeamMember.argTypes = {
  updateTeamMemberMoves: { action: 'updateTeamMemberMove' }
};
WithTeamMember.args = {
  teamMember: {
    id: '1',
    order: 0,
    pokemon: haunter,
    learned_moves: [
      {
        order: 1,
        move: explosion
      },
      {
        order: 2,
        move: flash
      }
    ]
  }
};
