import { Meta } from '@storybook/react/types-6-0';
import { Pokemon } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamCard, TeamCardProps } from './TeamCard';

const pokemon: Pokemon[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/TeamCard',
  component: TeamCard,
  args: {
    id: '123',
    created_at: 1607813654,
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
  }
} as Meta<TeamCardProps>;

export const Standard = (args: TeamCardProps): JSX.Element => (
  <TeamCard {...args} />
);
