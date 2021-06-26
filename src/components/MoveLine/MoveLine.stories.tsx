import { Meta, Story } from '@storybook/react/types-6-0';
import { MoveLine, MoveLineProps } from './MoveLine';

export default {
  title: 'Components/Move Line',
  component: MoveLine,
  args: {
    renderLineActions: () => <div>Some interactivity would be placed here</div>
  }
} as Meta<MoveLineProps>;

export const moveLine: Story<MoveLineProps> = args => <MoveLine {...args} />;
