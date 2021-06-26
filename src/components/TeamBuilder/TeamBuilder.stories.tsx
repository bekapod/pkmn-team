import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { PokemonFragment } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamBuilder } from './TeamBuilder';

const pokemon: PokemonFragment[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/Team Builder',
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
} as Meta<ComponentProps<typeof TeamBuilder>>;

export const teamBuilder: Story<ComponentProps<typeof TeamBuilder>> = args => (
  <TeamBuilder {...args} />
);

export const skeleton: Story<ComponentProps<typeof TeamBuilder>> = args => (
  <TeamBuilder {...args} />
);
skeleton.args = {
  isSkeleton: true,
  team: undefined
};
