import { Meta, Story } from '@storybook/react/types-6-0';
import { PokemonFragment } from '~/generated/graphql';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { TeamCard, TeamCardProps } from './TeamCard';

const pokemon: PokemonFragment[] = [charmander, pikachu, haunter];

export default {
  title: 'Components/TeamCard',
  component: TeamCard,
  args: {
    id: '123',
    name: 'My super team!',
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
} as Meta<TeamCardProps>;

export const teamCard: Story<TeamCardProps> = args => <TeamCard {...args} />;
