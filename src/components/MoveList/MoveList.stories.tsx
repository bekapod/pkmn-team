import { Meta, Story } from '@storybook/react/types-6-0';
import { MovesProvider } from '~/hooks/useMoves';
import {
  explosion,
  flash,
  substitute,
  rest,
  slash
} from '~/mocks/Pokemon_Move';
import { haunter } from '~/mocks/Pokemon';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    allMoves: [substitute, flash, explosion]
  }
} as Meta<MoveListProps>;

export const WithFewMoves: Story<MoveListProps> = args => (
  <MoveList {...args} />
);

export const WithMoreMoves: Story<MoveListProps> = args => (
  <MoveList {...args} />
);
WithMoreMoves.args = {
  allMoves: [substitute, flash, explosion, rest, slash]
};

export const WithTeamMember: Story<
  MoveListProps & { updateTeamMemberMoves: never }
> = ({ updateTeamMemberMoves, ...args }) => (
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
    slot: 0,
    pokemon: haunter,
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
  }
};
