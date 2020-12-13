import { Meta } from '@storybook/react/types-6-0';
import { Pokemon } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamBuilder, TeamBuilderProps } from './TeamBuilder';

const pokemon: Pokemon[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/TeamBuilder',
  component: TeamBuilder,
  argTypes: {
    updateTeamMembers: { action: 'updateTeamMembers' }
  },
  args: {
    team: {
      id: '1',
      created_at: '2020-12-12T22:50:59.766899+00:00',
      name: 'My super team!',
      team_members: [
        {
          id: '1',
          order: 1,
          pokemon: pokemon[0],
          learned_moves: []
        },
        {
          id: '2',
          order: 2,
          pokemon: pokemon[1],
          learned_moves: []
        },
        {
          id: '3',
          order: 3,
          pokemon: pokemon[2],
          learned_moves: []
        }
      ]
    },
    allPokemon: pokemon
  }
} as Meta<TeamBuilderProps>;

export const WithTeam = (args: TeamBuilderProps): JSX.Element => (
  <TeamBuilder {...args} />
);
