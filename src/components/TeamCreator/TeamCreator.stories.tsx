import { Meta } from '@storybook/react/types-6-0';
import { TeamCreator, TeamCreatorProps } from './TeamCreator';

export default {
  title: 'Components/TeamCreator',
  component: TeamCreator,
  argTypes: {
    createTeam: { action: 'createTeam' }
  }
} as Meta<TeamCreatorProps>;

export const Default = (args: TeamCreatorProps): JSX.Element => (
  <TeamCreator {...args} />
);
