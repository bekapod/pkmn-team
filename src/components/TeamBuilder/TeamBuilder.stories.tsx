import { Meta, Story } from '@storybook/react/types-6-0';
import { Pokemon } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamBuilder, TeamBuilderProps } from './TeamBuilder';

const pokemon: Pokemon[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/TeamBuilder',
  component: TeamBuilder,
  argTypes: {
    updateTeam: { action: 'updateTeam' },
    deleteTeam: { action: 'deleteTeam' }
  },
  args: {
    team: {
      id: '1',
      name: 'My super team!',
      members: {
        total: 0,
        teamMembers: [
          {
            id: '1',
            slot: 1,
            pokemon: pokemon[0],
            moves: { total: 0, teamMemberMoves: [] }
          },
          {
            id: '2',
            slot: 2,
            pokemon: pokemon[1],
            moves: { total: 0, teamMemberMoves: [] }
          },
          {
            id: '3',
            slot: 3,
            pokemon: pokemon[2],
            moves: { total: 0, teamMemberMoves: [] }
          }
        ]
      }
    }
  }
} as Meta<TeamBuilderProps>;

export const WithTeam: Story<TeamBuilderProps> = args => (
  <TeamBuilder {...args} />
);

export const Skeleton: Story<TeamBuilderProps> = args => (
  <TeamBuilder {...args} />
);
Skeleton.args = {
  isSkeleton: true,
  team: undefined
};
