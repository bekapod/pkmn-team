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
            order: 1,
            node: {
              id: '1',
              pokemon: {
                ...pokemon[0],
                moves: {
                  edges: [{ node: substitute }, { node: slash }, { node: rest }]
                }
              },
              moves: { edges: [] }
            }
          },
          {
            order: 2,
            node: {
              id: '2',
              pokemon: {
                ...pokemon[1],
                moves: {
                  edges: [{ node: substitute }, { node: rest }, { node: flash }]
                }
              },
              moves: {
                edges: [{ node: substitute }, { node: rest }, { node: flash }]
              }
            }
          },
          {
            order: 3,
            node: {
              id: '3',
              pokemon: {
                ...pokemon[2],
                moves: {
                  edges: [
                    { node: substitute },
                    { node: rest },
                    { node: explosion }
                  ]
                }
              },
              moves: {
                edges: [{ node: explosion }]
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
