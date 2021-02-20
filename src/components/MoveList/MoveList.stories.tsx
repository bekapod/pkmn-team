import { Meta } from '@storybook/react/types-6-0';
import { explosion, flash, substitute, rest, slash } from '~/mocks/Moves';
import { haunter } from '~/mocks/Pokemon';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    moves: [substitute, flash, explosion]
  },
  argTypes: {
    updateTeamMemberMove: { action: 'updateTeamMemberMove' }
  }
} as Meta<MoveListProps>;

export const WithFewMoves = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);

export const WithMoreMoves = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);
WithMoreMoves.args = {
  moves: [substitute, flash, explosion, rest, slash]
};

export const WithTeamMember = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);
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
