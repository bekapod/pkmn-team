import { Meta } from '@storybook/react/types-6-0';
import { Pokemon } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamView, TeamViewProps } from './TeamView';

const pokemon: Pokemon[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/TeamView',
  component: TeamView,
  argTypes: {
    updateTeamMembers: { action: 'updateTeamMembers' }
  },
  args: {
    initialTeamMembers: [
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
    ],
    allPokemon: pokemon
  }
} as Meta<TeamViewProps>;

export const Default = (args: TeamViewProps): JSX.Element => (
  <TeamView {...args} />
);

export const Skeleton = (args: TeamViewProps): JSX.Element => (
  <TeamView {...args} />
);
Skeleton.args = {
  initialTeamMembers: undefined,
  allPokemon: undefined,
  isSkeleton: true
};
