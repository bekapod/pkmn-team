import { Meta } from '@storybook/react/types-6-0';
import { explosion, flash, substitute } from '~/mocks/Moves';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    moves: [substitute, flash, explosion]
  }
} as Meta<MoveListProps>;

export const Standard = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);
