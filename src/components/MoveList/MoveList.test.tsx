import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoveList, MoveListProps } from '.';
import { explosion, flash, substitute } from '~/mocks/Moves';
import { setupResizeObserverMock } from '~/test-helpers';
import { haunter } from '~/mocks/Pokemon';

describe(MoveList, () => {
  const setup = (props: Partial<MoveListProps> = {}) => {
    setupResizeObserverMock([]);
    return render(
      <MoveList
        updateTeamMemberMove={jest.fn()}
        removeMoveFromTeamMember={jest.fn()}
        initialMoves={[substitute, flash, explosion]}
        {...props}
      />
    );
  };

  it('renders each move', () => {
    setup();
    expect(screen.getByText(substitute.name)).toBeInTheDocument();
    expect(screen.getByText(flash.name)).toBeInTheDocument();
    expect(screen.getByText(explosion.name)).toBeInTheDocument();
    expect(screen.getByTestId('move-list').firstChild).toHaveClass(
      'overflow-hidden!'
    );
  });

  it("doesn't select any moves", () => {
    setup();
    expect(
      screen
        .getByText(substitute.name)
        .closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      screen.getByText(explosion.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('detects overflowing items', () => {
    setup({
      visibleItems: 6,
      initialMoves: [substitute, flash, explosion, substitute, flash, explosion]
    });
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
        screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen
          .getByText(substitute.name)
          .closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'false');
      expect(
        screen
          .getByText(explosion.name)
          .closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('with team member context', () => {
    const teamMember = {
      id: '1',
      order: 0,
      pokemon: haunter,
      learned_moves: [
        {
          order: 1,
          move: explosion
        },
        {
          order: 2,
          move: flash
        }
      ]
    };
    const setupWithTeamMember = (props: Partial<MoveListProps> = {}) => {
      return setup({
        teamMember,
        ...props
      });
    };

    it('can highlight learned moves', () => {
      setupWithTeamMember({ highlightLearnedMoves: true });
      expect(
        screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(explosion.name)
          .closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(substitute.name)
          .closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
    });

    it("doesn't highlight learned moves when option is off", () => {
      setupWithTeamMember({ highlightLearnedMoves: false });
      expect(
        screen.getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(explosion.name)
          .closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
      expect(
        screen
          .getByText(substitute.name)
          .closest('[data-testid="move-list-item"]')
      ).not.toHaveAttribute('aria-selected', 'true');
    });

    it('calls addMoveToTeamMember', () => {
      const updateTeamMemberMove = jest.fn();
      setupWithTeamMember({ updateTeamMemberMove });
      expect(updateTeamMemberMove).toHaveBeenCalledTimes(0);
      userEvent.click(
        screen.getByRole('button', { name: `Learn ${substitute.name}` })
      );
      expect(updateTeamMemberMove).toHaveBeenCalledTimes(1);
      expect(updateTeamMemberMove).toHaveBeenCalledWith(
        teamMember,
        substitute.id
      );
    });

    it('calls removeMoveFromTeamMember', () => {
      const removeMoveFromTeamMember = jest.fn();
      setupWithTeamMember({ removeMoveFromTeamMember });
      expect(removeMoveFromTeamMember).toHaveBeenCalledTimes(0);
      userEvent.click(
        screen.getByRole('button', { name: `Forget ${explosion.name}` })
      );
      expect(removeMoveFromTeamMember).toHaveBeenCalledTimes(1);
      expect(removeMoveFromTeamMember).toHaveBeenCalledWith(
        teamMember,
        explosion.id
      );
    });
  });
});
