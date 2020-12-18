import { Meta } from '@storybook/react/types-6-0';
import { substitute } from '~/mocks/Moves';
import { MoveLine, MoveLineProps } from './MoveLine';

export default {
  title: 'Components/MoveLine',
  component: MoveLine,
  args: {
    ...substitute,
    renderLineActions: () => <div>Some interactivity would be placed here</div>
  }
} as Meta<MoveLineProps>;

export const Standard = (args: MoveLineProps): JSX.Element => (
  <MoveLine {...args} />
);
