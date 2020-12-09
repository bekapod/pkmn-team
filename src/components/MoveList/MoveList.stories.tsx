import { Meta } from '@storybook/react/types-6-0';
import { MoveList, MoveListProps } from './MoveList';

export default {
  title: 'Components/MoveList',
  component: MoveList,
  args: {
    moves: [
      {
        version: 'yellow',
        move: {
          damageClass: 'status',
          accuracy: undefined,
          power: undefined,
          pp: 10,
          effect:
            'Caramels topping croissant liquorice brownie cake jujubes toffee oat cake.',
          type: {
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Substitute',
          slug: 'substitute'
        },
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          damageClass: 'special',
          accuracy: 100,
          power: 90,
          pp: 10,
          effect:
            'Caramels topping croissant liquorice brownie cake jujubes toffee oat cake.',
          type: {
            name: 'Psychic',
            slug: 'psychic'
          },
          name: 'Psychic',
          slug: 'psychic'
        },
        levelLearnedAt: 0,
        learnMethod: 'machine'
      },
      {
        version: 'yellow',
        move: {
          damageClass: 'physical',
          accuracy: 100,
          power: 250,
          pp: 5,
          effect:
            'Caramels topping croissant liquorice brownie cake jujubes toffee oat cake.',
          type: {
            name: 'Normal',
            slug: 'normal'
          },
          name: 'Explosion',
          slug: 'explosion'
        },
        levelLearnedAt: 0,
        learnMethod: 'machine'
      }
    ]
  }
} as Meta<MoveListProps>;

export const Standard = (args: MoveListProps): JSX.Element => (
  <MoveList {...args} />
);
