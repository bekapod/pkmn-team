import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { substitute } from '~/mocks/Moves';
import { MoveLine } from './MoveLine';

export default {
  title: 'Components/Move Line',
  component: MoveLine,
  args: {
    ...substitute,
    renderLineActions: () => <div>Some interactivity would be placed here</div>
  }
} as Meta<ComponentProps<typeof MoveLine>>;

export const moveLine: Story<ComponentProps<typeof MoveLine>> = args => (
  <MoveLine {...args} />
);
