import { render } from '@testing-library/react';
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
    const { getByTestId, getByText } = setup();
    expect(getByText(substitute.name)).toBeInTheDocument();
    expect(getByText(flash.name)).toBeInTheDocument();
    expect(getByText(explosion.name)).toBeInTheDocument();
    expect(getByTestId('move-list').firstChild).toHaveClass('overflow-hidden');
  });

  it("doesn't select any moves", () => {
    const { getByText } = setup();
    expect(
      getByText(substitute.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      getByText(flash.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      getByText(explosion.name).closest('[data-testid="move-list-item"]')
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('detects overflowing items', () => {
    const { getByTestId } = setup({
      visibleItems: 6,
      moves: [substitute, flash, explosion, substitute, flash, explosion]
    });
    expect(getByTestId('move-list').firstChild).not.toHaveClass(
      'overflow-hidden'
    );
  });

  it('renders "details" buttons', () => {
    const { getAllByText } = setup();
    expect(getAllByText('Details')).toHaveLength(3);
  });

  describe('when "details" is clicked', () => {
    it('expands the move', () => {
      const { getAllByText, getByText } = setup();
      userEvent.click(getAllByText('Details')[1]);
      expect(
        getByText(flash.name).closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        getByText(substitute.name).closest('[data-testid="move-list-item"]')
      ).toHaveAttribute('aria-expanded', 'false');
      expect(
        getByText(explosion.name).closest('[data-testid="move-list-item"]')
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
