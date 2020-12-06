import { Meta } from '@storybook/react/types-6-0';
import { MoveLine, MoveLineProps } from './MoveLine';

export default {
  title: 'Components/MoveLine',
  component: MoveLine,
  args: {
    name: 'Substitute',
    slug: 'substitute',
    damageClass: 'physical',
    accuracy: 80,
    power: 100,
    pp: 10,
    type: {
      _id: '1',
      _ts: '',
      name: 'Normal',
      slug: 'normal',
      moves: [],
      pokemon: []
    }
  }
} as Meta<MoveLineProps>;

export const Standard = (args: MoveLineProps): JSX.Element => (
  <MoveLine {...args} />
);