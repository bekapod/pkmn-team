import { Meta, Story } from '@storybook/react/types-6-0';
import { TeamCreator, TeamCreatorProps } from './TeamCreator';

export default {
  title: 'Components/TeamCreator',
  component: TeamCreator,
  argTypes: {
    createTeam: { action: 'createTeam' }
  }
} as Meta<TeamCreatorProps>;

export const Default: Story<TeamCreatorProps> = args => (
  <TeamCreator {...args} />
);
