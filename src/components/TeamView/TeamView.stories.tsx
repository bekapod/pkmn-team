import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { PokemonFragment } from '~/generated/graphql';
import { explosion, flash, rest, slash, substitute } from '~/mocks/Moves';
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
        slot: 1,
        node: {
          id: '1',
          pokemon: {
            ...pokemon[0],
            moves: {
              edges: [
                { id: '1', node: substitute },
                { id: '2', node: slash },
                { id: '3', node: rest }
              ]
            }
          },
          moves: {}
        }
      },
      {
        slot: 2,
        node: {
          id: '2',
          pokemon: {
            ...pokemon[1],
            moves: {
              edges: [
                { id: '1', node: substitute },
                { id: '2', node: rest },
                { id: '3', node: flash }
              ]
            }
          },
          moves: {
            edges: [
              { id: '1', slot: 1, node: substitute },
              { id: '2', slot: 2, node: rest },
              { id: '3', slot: 3, node: flash }
            ]
          }
        }
      },
      {
        slot: 3,
        node: {
          id: '3',
          pokemon: {
            ...pokemon[2],
            moves: {
              edges: [
                { id: '1', node: substitute },
                { id: '2', node: rest },
                { id: '3', node: explosion }
              ]
            }
          },
          moves: {
            edges: [{ id: '1', slot: 1, node: explosion }]
          }
        }
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
