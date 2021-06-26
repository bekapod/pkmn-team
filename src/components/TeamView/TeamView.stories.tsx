import { Meta } from '@storybook/react/types-6-0';
import { PokemonFragment } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamView, TeamViewProps } from './TeamView';

const pokemon: PokemonFragment[] = [charmander, pikachu, haunter];

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
        pokemon: pokemon[0],
        moves: { edges: [] }
      },
      {
        id: '2',
        pokemon: pokemon[1],
        moves: { edges: [] }
      },
      {
        id: '3',
        pokemon: pokemon[2],
        moves: { edges: [] }
      }
    ],
    allPokemon: pokemon
  }
} as Meta<TeamViewProps>;

export const teamView = (args: TeamViewProps): JSX.Element => (
  <TeamView {...args} />
);

export const skeleton = (args: TeamViewProps): JSX.Element => (
  <TeamView {...args} />
);
skeleton.args = {
  initialTeamMembers: undefined,
  allPokemon: undefined,
  isSkeleton: true
};
