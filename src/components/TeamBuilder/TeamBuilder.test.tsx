import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import { setupResizeObserverMock } from '~/test-helpers';
import { composeStory } from '@storybook/testing-react';
import Meta, { teamBuilder, skeleton } from './TeamBuilder.stories';

const TeamBuilder = composeStory(teamBuilder, Meta);
const TeamBuilderSkeleton = composeStory(skeleton, Meta);

describe('TeamBuilder', () => {
  beforeAll(() => {
    setupResizeObserverMock([]);
  });

  it('renders a button to delete the team', () => {
    render(<TeamBuilder />);
    expect(screen.getByText('Delete team')).toBeInTheDocument();
  });

  it('calls deleteTeam when delete button is clicked', () => {
    const deleteTeam = jest.fn();
    render(<TeamBuilder deleteTeam={deleteTeam} />);
    userEvent.click(screen.getByText('Delete team'));
    expect(deleteTeam).toHaveBeenCalledTimes(1);
  });

  it('renders a team name input', () => {
    render(<TeamBuilder />);
    expect(screen.getByLabelText('Choose a team name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Choose a team name')
    ).toBeInTheDocument();
  });

  it('calls updateTeam when team name is changed', async () => {
    const updateTeam = jest.fn();
    render(<TeamBuilder updateTeam={updateTeam} />);
    await userEvent.type(
      screen.getByLabelText('Choose a team name'),
      '!!!!111'
    );
    await wait(1500);
    expect(updateTeam).toHaveBeenCalledTimes(1);
    expect(updateTeam).toHaveBeenCalledWith('My super team!!!!!111');
  });

  it('renders the team view', () => {
    render(<TeamBuilder />);
    Meta.args?.team?.members?.edges?.forEach(member => {
      expect(
        screen.getAllByText(
          `#${member?.node?.pokemon.pokedexId} ${member?.node?.pokemon.name}`
        )
      ).toHaveLength(2);
    });
  });

  describe('when there is an error', () => {
    it('renders error message', () => {
      render(
        <TeamBuilder
          error={{
            name: 'error',
            message: 'Some error message',
            graphQLErrors: []
          }}
        />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Some error message')).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('renders a loading spinner', () => {
      render(<TeamBuilder isLoading />);
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('when skeleton view', () => {
    it('renders a loading spinner', () => {
      render(<TeamBuilderSkeleton />);
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('disables the team name input', () => {
      render(<TeamBuilderSkeleton />);
      expect(screen.getByLabelText('Choose a team name')).toBeDisabled();
    });
  });
});
