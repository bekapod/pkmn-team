import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { PokemonFragment } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamView } from './TeamView';

const pokemon: PokemonFragment[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/Team View',
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
} as Meta<ComponentProps<typeof TeamView>>;

export const teamView: Story<ComponentProps<typeof TeamView>> = args => (
  <TeamView {...args} />
);

export const skeleton: Story<ComponentProps<typeof TeamView>> = args => (
  <TeamView {...args} />
);
skeleton.args = {
  initialTeamMembers: undefined,
  isSkeleton: true
};
