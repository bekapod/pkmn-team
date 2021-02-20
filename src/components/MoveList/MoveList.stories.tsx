import { Meta } from '@storybook/react/types-6-0';
import { explosion, flash, substitute, rest, slash } from '~/mocks/Moves';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    moves: [substitute, flash, explosion]
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
