import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { PokemonFragment } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamCard } from './TeamCard';

const pokemon: PokemonFragment[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/Team Card',
  component: TeamCard,
  args: {
    id: '123',
    name: 'My super team!',
    createdAt: '2020-12-12T19:17:37Z',
    members: {
      edges: [
        {
          slot: 1,
          node: {
            id: '1',
            pokemon: pokemon[0]
          }
        },
        {
          slot: 2,
          node: {
            id: '1',
            pokemon: pokemon[1]
          }
        },
        {
          slot: 3,
          node: {
            id: '2',
            pokemon: pokemon[2]
          }
        }
      ]
    }
  }
} as Meta<ComponentProps<typeof TeamCard>>;

export const teamCard: Story<ComponentProps<typeof TeamCard>> = args => (
  <TeamCard {...args} />
);
