import { Meta, Story } from '@storybook/react/types-6-0';
import { Pokemon } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamCard, TeamCardProps } from './TeamCard';

const pokemon: Pokemon[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/TeamCard',
  component: TeamCard,
  args: {
    id: '123',
    created_at: '2020-12-12T22:50:59.766899+00:00',
    name: 'My super team!',
    members: [
      {
        id: '1',
        slot: 1,
        pokemon: pokemon[0],
        moves: { total: 0, teamMemberMoves: [] }
      },
      {
        id: '2',
        slot: 2,
        pokemon: pokemon[1],
        moves: { total: 0, teamMemberMoves: [] }
      },
      {
        id: '3',
        slot: 3,
        pokemon: pokemon[2],
        moves: { total: 0, teamMemberMoves: [] }
      }
    ]
  }
} as Meta<TeamCardProps>;

export const Standard: Story<TeamCardProps> = args => <TeamCard {...args} />;
