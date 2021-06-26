import { Meta, Story } from '@storybook/react/types-6-0';
import { PokemonFragment, TeamFragment } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamCard } from '../TeamCard';
import { TeamGrid } from './TeamGrid';

const pokemon: PokemonFragment[] = [charmander, pikachu, haunter];

const team: TeamFragment = {
  id: '123',
  name: 'My super team!',
  members: {
    edges: [
      {
        slot: 1,
        node: {
          id: '1',
          pokemon: pokemon[0],
          moves: { edges: [] }
        }
      },
      {
        slot: 2,
        node: {
          id: '1',
          pokemon: pokemon[1],
          moves: { edges: [] }
        }
      },
      {
        slot: 3,
        node: {
          id: '2',
          pokemon: pokemon[2],
          moves: { edges: [] }
        }
      }
    ]
  }
};

export default {
  title: 'Components/Team Grid',
  component: TeamGrid
} as Meta;

export const teamGrid: Story = () => (
  <TeamGrid>
    <TeamCard {...team} id="1" />
    <TeamCard {...team} id="2" />
    <TeamCard {...team} id="3" />
    <TeamCard {...team} id="4" />
    <TeamCard {...team} id="5" />
  </TeamGrid>
);
