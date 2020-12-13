import { Meta } from '@storybook/react/types-6-0';
import { Pokemon, Teams } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamCard } from '../TeamCard';
import { TeamGrid } from './TeamGrid';

const pokemon: Pokemon[] = [charmander, pikachu, haunter];

const team: Teams = {
  id: '123',
  name: 'My super team!',
  created_at: '2020-12-12T22:50:59.766899+00:00',
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
};

export default {
  title: 'Components/TeamGrid',
  component: TeamGrid
} as Meta;

export const Standard = (): JSX.Element => (
  <TeamGrid>
    <TeamCard {...team} id="1" />
    <TeamCard {...team} id="2" />
    <TeamCard {...team} id="3" />
    <TeamCard {...team} id="4" />
    <TeamCard {...team} id="5" />
  </TeamGrid>
);
