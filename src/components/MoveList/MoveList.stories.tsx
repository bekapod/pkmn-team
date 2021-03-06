import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { MoveLearnMethod } from '~/generated/graphql';
import { MovesProvider } from '~/hooks/useMoves';
import { explosion, flash, substitute, rest, slash } from '~/mocks/Moves';
import { haunter } from '~/mocks/Pokemon';
import { MoveList } from './MoveList';

export default {
  title: 'Components/Move List',
  component: MoveList,
  args: {
    allMoves: [
      {
        id: '1',
        levelLearnedAt: 0,
        learnMethod: MoveLearnMethod.LevelUp,
        node: substitute
      },
      {
        id: '2',
        levelLearnedAt: 0,
        learnMethod: MoveLearnMethod.LevelUp,
        node: flash
      },
      {
        id: '3',
        levelLearnedAt: 0,
        learnMethod: MoveLearnMethod.LevelUp,
        node: explosion
      }
    ]
  }
} as Meta<ComponentProps<typeof MoveList>>;

export const moveList: Story<ComponentProps<typeof MoveList>> = args => (
  <MoveList {...args} />
);

export const withMoreMoves: Story<ComponentProps<typeof MoveList>> = args => (
  <MoveList {...args} />
);
withMoreMoves.args = {
  allMoves: [
    {
      id: '1',
      levelLearnedAt: 0,
      learnMethod: MoveLearnMethod.LevelUp,
      node: substitute
    },
    {
      id: '2',
      levelLearnedAt: 0,
      learnMethod: MoveLearnMethod.LevelUp,
      node: flash
    },
    {
      id: '3',
      levelLearnedAt: 0,
      learnMethod: MoveLearnMethod.LevelUp,
      node: explosion
    },
    {
      id: '4',
      levelLearnedAt: 0,
      learnMethod: MoveLearnMethod.LevelUp,
      node: rest
    },
    {
      id: '5',
      levelLearnedAt: 0,
      learnMethod: MoveLearnMethod.LevelUp,
      node: slash
    }
  ]
};

export const withTeamMember: Story<
  ComponentProps<typeof MoveList> & { updateTeamMemberMoves: never }
> = ({ updateTeamMemberMoves, ...args }) => (
  <MovesProvider
    teamMember={args.teamMember}
    updateTeamMemberMoves={updateTeamMemberMoves}
  >
    <MoveList {...args} />
  </MovesProvider>
);
withTeamMember.argTypes = {
  updateTeamMemberMoves: { action: 'updateTeamMemberMove' }
};
withTeamMember.args = {
  teamMember: {
    id: '1',
    pokemon: haunter,
    moves: { edges: [] }
  }
};
