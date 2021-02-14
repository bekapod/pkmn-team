import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import { TeamBuilder, TeamBuilderProps } from '.';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import type { Pokemon } from '~/generated/graphql';
import { setupResizeObserverMock } from '~/test-helpers';

describe(TeamBuilder, () => {
  const pokemon: Pokemon[] = [charmander, pikachu, haunter];

  const team = {
    id: '1',
    created_at: '2020-12-12T22:50:59.766899+00:00',
    name: 'My super team!',
    team_members: [
      {
        id: '1',
        order: 1,
        pokemon: pokemon[0],
        learned_moves: []
      },
      {
        id: '2',
        order: 2,
        pokemon: pokemon[1],
        learned_moves: []
      },
      {
        id: '3',
        order: 3,
        pokemon: pokemon[2],
        learned_moves: []
      }
    ]
  };

  const setup = (props: Partial<TeamBuilderProps> = {}) => {
    setupResizeObserverMock([]);
    return render(<TeamBuilder team={team} {...props} />);
  };

  it('renders a button to delete the team', () => {
    setup();
    expect(screen.getByText('Delete team')).toBeInTheDocument();
  });

  it('calls deleteTeam when delete button is clicked', () => {
    const deleteTeam = jest.fn();
    setup({ deleteTeam });
    userEvent.click(screen.getByText('Delete team'));
    expect(deleteTeam).toHaveBeenCalledTimes(1);
  });

  it('renders a team name input', () => {
    setup();
    expect(screen.getByLabelText('Choose a team name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Choose a team name')
    ).toBeInTheDocument();
  });

  it('calls updateTeam when team name is changed', async () => {
    const updateTeam = jest.fn();
    setup({ updateTeam });
    await userEvent.type(
      screen.getByLabelText('Choose a team name'),
      '!!!!111'
    );
    await wait(1500);
    expect(updateTeam).toHaveBeenCalledTimes(1);
    expect(updateTeam).toHaveBeenCalledWith('My super team!!!!!111');
  });

  it('renders the team view', () => {
    setup();
    expect(
      screen.getAllByText(`#${pokemon[0].pokedex_id} ${pokemon[0].name}`)
    ).toHaveLength(2);
    expect(
      screen.getAllByText(`#${pokemon[1].pokedex_id} ${pokemon[1].name}`)
    ).toHaveLength(2);
    expect(
      screen.getAllByText(`#${pokemon[2].pokedex_id} ${pokemon[2].name}`)
    ).toHaveLength(2);
  });

  describe('when there is an error', () => {
    it('renders error message', () => {
      setup({
        error: {
          name: 'error',
          message: 'Some error message',
          graphQLErrors: []
        }
      });
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Some error message')).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('renders a loading spinner', () => {
      setup({ isLoading: true });
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('when skeleton view', () => {
    it('renders a loading spinner', () => {
      setup({ isSkeleton: true });
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('disables the team name input', () => {
      setup({ isSkeleton: true });
      expect(screen.getByLabelText('Choose a team name')).toBeDisabled();
    });
  });
});
