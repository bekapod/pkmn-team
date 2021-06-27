import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { PokemonFragment } from '~/generated/graphql';
import { explosion, flash, rest, slash, substitute } from '~/mocks/Moves';
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
      createdAt: '2021-06-26T19:17:37Z',
      members: {
        edges: [
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
