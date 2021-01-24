import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamCreator, TeamCreatorProps } from '.';
import { setupResizeObserverMock } from '~/test-helpers';

describe(TeamCreator, () => {
  const setup = (props: Partial<TeamCreatorProps> = {}) => {
    setupResizeObserverMock([]);
    return render(<TeamCreator {...props} />);
  };

  it('renders a team name input', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Team name')).toBeInTheDocument();
  });

  it('calls updateTeam when team name is changed', async () => {
    const createTeam = jest.fn();
    const { getByLabelText, getByText } = setup({ createTeam });

    await act(async () => {
      await userEvent.type(getByLabelText('Team name'), 'Some team name');
      userEvent.click(getByText('Create team'));
    });

    expect(createTeam).toHaveBeenCalledTimes(1);
    expect(createTeam).toHaveBeenCalledWith({ 'team-name': 'Some team name' });
  });

  describe('when there is an error', () => {
    it('renders error message', async () => {
      const { getByRole, getByText } = setup();

      await act(async () => {
        userEvent.click(getByText('Create team'));
        await waitFor(() => expect(getByRole('alert')).toBeInTheDocument());
      });

      expect(getByText('You must name your team')).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('renders a loading spinner', () => {
      const { getByTestId } = setup({ isLoading: true });
      expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('marks create button as busy', () => {
      const { getByTestId } = setup({ isLoading: true });
      expect(getByTestId('loading-spinner').parentElement).toHaveAttribute(
        'aria-busy',
        'true'
      );
    });
  });

  describe('with default values', () => {
    it('pre-populates team name', () => {
      const { getByLabelText } = setup({
        defaultValues: { 'team-name': 'Some team name' }
      });
      expect(getByLabelText('Team name')).toHaveValue('Some team name');
    });
  });
});
