import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoveList, MoveListProps } from '.';
import { explosion, flash, substitute } from '~/mocks/Moves';
import { setupResizeObserverMock } from '~/test-helpers';
import { haunter } from '~/mocks/Pokemon';
import { MovesProvider } from '~/hooks/useMoves';
import { MoveLearnMethod } from '~/generated/graphql';

describe(MoveList, () => {
  const setup = ({
    updateTeamMemberMoves,
    ...props
  }: Partial<MoveListProps & { updateTeamMemberMoves?: jest.Mock }> = {}) => {
    setupResizeObserverMock([]);
    return render(
      <MovesProvider
        teamMember={props.teamMember}
        updateTeamMemberMoves={updateTeamMemberMoves}
      >
        <MoveList
          allMoves={[
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
          ]}
          {...props}
        />
      </MovesProvider>
    );
  };

  it('renders each move', () => {
    setup();
    expect(screen.getByText(substitute.name)).toBeInTheDocument();
    expect(screen.getByText(flash.name)).toBeInTheDocument();
    expect(screen.getByText(explosion.name)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('move-list').firstChild).toHaveClass(
      'overflow-hidden!'
    );
  });

  it("doesn't select any moves", () => {
    setup();
    expect(
      screen
        .getByText(substitute.name)
        // eslint-disable-next-line testing-library/no-node-access
        .closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(explosion.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('detects overflowing items', () => {
    setup({
      visibleItems: 6,
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
          node: substitute
        },
        {
          id: '5',
          levelLearnedAt: 0,
          learnMethod: MoveLearnMethod.LevelUp,
          node: flash
        },
        {
          id: '6',
          levelLearnedAt: 0,
          learnMethod: MoveLearnMethod.LevelUp,
          node: explosion
        }
      ]
    });
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('move-list').firstChild).not.toHaveClass(
      'overflow-hidden'
    );
  });

  it('renders "details" buttons', () => {
    setup();
    expect(screen.getAllByText('Details')).toHaveLength(3);
  });

  describe('when "details" is clicked', () => {
    it('expands the move', () => {
      setup();
      userEvent.click(screen.getAllByText('Details')[1]);
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen
          .getByText(substitute.name)
          // eslint-disable-next-line testing-library/no-node-access
          .closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'false');
      expect(
        screen
          .getByText(explosion.name)
          // eslint-disable-next-line testing-library/no-node-access
          .closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('with team member context', () => {
    const teamMember = {
      id: '1',
      pokemon: haunter,
      moves: {
        edges: [
          {
            id: '1',
            slot: 1,
            levelLearnedAt: 0,
            learnMethod: MoveLearnMethod.LevelUp,
            node: explosion
          },
          {
            id: '2',
            slot: 2,
            levelLearnedAt: 0,
            learnMethod: MoveLearnMethod.LevelUp,
            node: flash
          }
        ]
      }
    };
    const setupWithTeamMember = (
      props: Partial<MoveListProps & { updateTeamMemberMoves?: jest.Mock }> = {}
    ) => {
      return setup({
        teamMember,
        ...props
      });
    };

    it('can highlight learned moves', () => {
      setupWithTeamMember({ highlightLearnedMoves: true });
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(explosion.name)
          // eslint-disable-next-line testing-library/no-node-access
          .closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(substitute.name)
          // eslint-disable-next-line testing-library/no-node-access
          .closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
    });

    it("doesn't highlight learned moves when option is off", () => {
      setupWithTeamMember({ highlightLearnedMoves: false });
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(explosion.name)
          // eslint-disable-next-line testing-library/no-node-access
          .closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(substitute.name)
          // eslint-disable-next-line testing-library/no-node-access
          .closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
    });

    it('calls addMoveToTeamMember', () => {
      const updateTeamMemberMoves = jest.fn();
      setupWithTeamMember({ updateTeamMemberMoves });
      expect(updateTeamMemberMoves).toHaveBeenCalledTimes(0);
      userEvent.click(
        screen.getByRole('button', { name: `Learn ${substitute.name}` })
      );
      expect(updateTeamMemberMoves).toHaveBeenCalledTimes(1);
      expect(updateTeamMemberMoves).toHaveBeenCalledWith({
        member: teamMember,
        moves: [
          {
            id: '1',
            slot: 1,
            levelLearnedAt: 0,
            learnMethod: MoveLearnMethod.LevelUp,
            node: explosion
          },
          {
            id: '2',
            slot: 2,
            levelLearnedAt: 0,
            learnMethod: MoveLearnMethod.LevelUp,
            node: flash
          },
          {
            id: '1',
            levelLearnedAt: 0,
            learnMethod: MoveLearnMethod.LevelUp,
            node: substitute
          }
        ]
      });
    });

    it('calls removeMoveFromTeamMember', () => {
      const updateTeamMemberMoves = jest.fn();
      setupWithTeamMember({ updateTeamMemberMoves });
      expect(updateTeamMemberMoves).toHaveBeenCalledTimes(0);
      userEvent.click(
        screen.getByRole('button', { name: `Forget ${explosion.name}` })
      );
      expect(updateTeamMemberMoves).toHaveBeenCalledTimes(1);
      expect(updateTeamMemberMoves).toHaveBeenCalledWith({
        member: teamMember,
        moves: [
          {
            id: '2',
            slot: 2,
            levelLearnedAt: 0,
            learnMethod: MoveLearnMethod.LevelUp,
            node: flash
          }
        ]
      });
    });
  });
});
