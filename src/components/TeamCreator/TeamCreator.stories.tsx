import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { TeamCreator } from './TeamCreator';

export default {
  title: 'Components/Team Creator',
  component: TeamCreator,
  argTypes: {
    createTeam: { action: 'createTeam' }
  }
} as Meta<ComponentProps<typeof TeamCreator>>;

export const teamCreator: Story<ComponentProps<typeof TeamCreator>> = args => (
  <TeamCreator {...args} />
);
