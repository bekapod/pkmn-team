import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoveList, MoveListProps } from '.';
import { explosion, flash, substitute } from '~/mocks/Moves';
import { setupResizeObserverMock } from '~/test-helpers';

describe(MoveList, () => {
  const setup = (props: Partial<MoveListProps> = {}) => {
    setupResizeObserverMock([]);
    return render(
      <MoveList
        addMoveToTeamMember={jest.fn()}
        removeMoveFromTeamMember={jest.fn()}
        moves={[substitute, flash, explosion]}
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
      'overflow-hidden'
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
      moves: [substitute, flash, explosion, substitute, flash, explosion]
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

  describe.skip('with team member context', () => {
    it('can highlight learned moves', () => {
      // @TODO
    });

    it('calls addMoveToTeamMember', () => {
      // @TODO
    });

    it('calls removeMoveFromTeamMember', () => {
      // @TODO
    });
  });
});
