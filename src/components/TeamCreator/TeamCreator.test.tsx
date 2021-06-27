import { act, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamCreator, TeamCreatorProps } from '.';
import { setupResizeObserverMock } from '~/test-helpers';

describe(TeamCreator, () => {
  const setup = (props: Partial<TeamCreatorProps> = {}) => {
    setupResizeObserverMock([]);
    return render(<TeamCreator {...props} />);
  };

  it('renders a team name input', () => {
    setup();
    expect(screen.getByLabelText('Team name')).toBeInTheDocument();
  });

  it('calls updateTeam when team name is changed', async () => {
    const createTeam = jest.fn();
    setup({ createTeam });

    await act(async () => {
      await userEvent.type(
        screen.getByLabelText('Team name'),
        'Some team name'
      );
      userEvent.click(screen.getByText('Create team'));
    });

    expect(createTeam).toHaveBeenCalledTimes(1);
    expect(createTeam).toHaveBeenCalledWith({ 'team-name': 'Some team name' });
  });

  describe('when there is an error', () => {
    it('renders error message', async () => {
      setup();

      await act(async () => {
        userEvent.click(screen.getByText('Create team'));
        await waitFor(() =>
          expect(screen.getByRole('alert')).toBeInTheDocument()
        );
      });

      expect(screen.getByText('You must name your team')).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('renders a loading spinner', () => {
      setup({ isLoading: true });
      expect(
        screen.getByRole('alert', { name: 'Loading' })
      ).toBeInTheDocument();
    });

    it('marks create button as busy', () => {
      setup({ isLoading: true });
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('with default values', () => {
    it('pre-populates team name', () => {
      setup({
        defaultValues: { 'team-name': 'Some team name' }
      });
      expect(screen.getByLabelText('Team name')).toHaveValue('Some team name');
    });
  });
});
