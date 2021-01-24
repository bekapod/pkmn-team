import { render } from '@testing-library/react';
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
    const { getByText } = setup();
    expect(getByText('Delete team')).toBeInTheDocument();
  });

  it('calls deleteTeam when delete button is clicked', () => {
    const deleteTeam = jest.fn();
    const { getByText } = setup({ deleteTeam });
    userEvent.click(getByText('Delete team'));
    expect(deleteTeam).toHaveBeenCalledTimes(1);
  });

  it('renders a team name input', () => {
    const { getByLabelText, getByPlaceholderText } = setup();
    expect(getByLabelText('Choose a team name')).toBeInTheDocument();
    expect(getByPlaceholderText('Choose a team name')).toBeInTheDocument();
  });

  it('calls updateTeam when team name is changed', async () => {
    const updateTeam = jest.fn();
    const { getByLabelText } = setup({ updateTeam });
    await userEvent.type(getByLabelText('Choose a team name'), '!!!!111');
    await wait(1000);
    expect(updateTeam).toHaveBeenCalledTimes(1);
    expect(updateTeam).toHaveBeenCalledWith('My super team!!!!!111');
  });

  it('renders the team view', () => {
    const { getAllByText } = setup();
    expect(
      getAllByText(`#${pokemon[0].pokedex_id} ${pokemon[0].name}`)
    ).toHaveLength(2);
    expect(
      getAllByText(`#${pokemon[1].pokedex_id} ${pokemon[1].name}`)
    ).toHaveLength(2);
    expect(
      getAllByText(`#${pokemon[2].pokedex_id} ${pokemon[2].name}`)
    ).toHaveLength(2);
  });

  describe('when there is an error', () => {
    it('renders error message', () => {
      const { getByRole, getByText } = setup({
        error: {
          name: 'error',
          message: 'Some error message',
          graphQLErrors: []
        }
      });
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByText('Some error message')).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('renders a loading spinner', () => {
      const { getByTestId } = setup({ isLoading: true });
      expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('when skeleton view', () => {
    it('renders a loading spinner', () => {
      const { getByTestId } = setup({ isSkeleton: true });
      expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('disables the team name input', () => {
      const { getByLabelText } = setup({ isSkeleton: true });
      expect(getByLabelText('Choose a team name')).toBeDisabled();
    });
  });
});
