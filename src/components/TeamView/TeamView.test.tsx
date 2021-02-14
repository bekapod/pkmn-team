import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamView, TeamViewProps } from '.';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import type { Pokemon } from '~/generated/graphql';
import { setupResizeObserverMock } from '~/test-helpers';

describe('TeamView', () => {
  const pokemon: Pokemon[] = [charmander, pikachu, haunter];

  const teamMembers = [
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
  ];

  const fullTeamMembers = [
    ...teamMembers,
    {
      id: '4',
      order: 4,
      pokemon: pokemon[0],
      learned_moves: []
    },
    {
      id: '5',
      order: 5,
      pokemon: pokemon[1],
      learned_moves: []
    },
    {
      id: '6',
      order: 6,
      pokemon: pokemon[2],
      learned_moves: []
    }
  ];

  const setup = (props: Partial<TeamViewProps> = {}) => {
    setupResizeObserverMock([]);
    return render(
      <TeamView
        initialTeamMembers={teamMembers}
        allPokemon={pokemon}
        {...props}
      />
    );
  };

  it('applies props from Tabs component correctly', async () => {
    setup();

    expect(screen.getByTestId('tab-item-1')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByTestId('tab-content-1')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    userEvent.click(screen.getByTestId('tab-item-2'));
    expect(screen.getByTestId('tab-item-2')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByTestId('tab-content-2')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    expect(screen.getByLabelText('Add new pokemon to team')).not.toHaveFocus();
    await userEvent.type(
      screen.getByLabelText('Add new pokemon to team'),
      '[enter]'
    );
    expect(screen.getByLabelText('Add new pokemon to team')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByTestId('tab-content-add-pokemon')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    expect(screen.getByLabelText('Add new pokemon to team')).toHaveFocus();
  });

  describe('with less than 6 team members', () => {
    it('renders a tab for each pokemon plus a tab for pokemon search', (): void => {
      setup();

      expect(screen.queryAllByTestId(/tab-item-/)).toHaveLength(4);
      expect(screen.queryAllByTestId(/tab-content-/)).toHaveLength(4);
      expect(screen.queryByTestId('tab-item-add-pokemon')).toBeTruthy();
      expect(screen.queryByTestId('tab-content-add-pokemon')).toBeTruthy();
    });
  });

  describe('with 6 team members', () => {
    it('renders a tab for each pokemon and no tab for pokemon search', (): void => {
      setup({
        initialTeamMembers: fullTeamMembers
      });

      expect(screen.getAllByTestId(/tab-item-/)).toHaveLength(6);
      expect(screen.getAllByTestId(/tab-content-/)).toHaveLength(6);
      expect(
        screen.queryByTestId('tab-item-add-pokemon')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('tab-content-add-pokemon')
      ).not.toBeInTheDocument();
    });
  });

  describe('with a search pokemon selected', () => {
    it('renders the currently selected pokemon', () => {
      setup();

      userEvent.click(screen.getByLabelText('Add new pokemon to team'));
      userEvent.click(
        screen.getByText(new RegExp(pokemon[0].name, 'i'), {
          selector: '[data-testid="tab-content-add-pokemon"] *'
        })
      );

      expect(
        screen.getByText(`Add ${pokemon[0].name} to team`)
      ).toBeInTheDocument();
    });

    it('calls updateTeamMembers when add button is clicked', () => {
      const updateTeamMembers = jest.fn();
      setup({ updateTeamMembers });

      userEvent.click(screen.getByLabelText('Add new pokemon to team'));
      userEvent.click(
        screen.getByText(new RegExp(pokemon[0].name, 'i'), {
          selector: '[data-testid="tab-content-add-pokemon"] *'
        })
      );
      expect(updateTeamMembers).toHaveBeenCalledTimes(0);
      userEvent.click(screen.getByText(`Add ${pokemon[0].name} to team`));
      expect(updateTeamMembers).toHaveBeenCalledTimes(1);
      expect(updateTeamMembers).toHaveBeenCalledWith([
        ...teamMembers,
        {
          id: expect.any(String),
          learned_moves: [],
          order: 3,
          pokemon: pokemon[0]
        }
      ]);
    });
  });

  describe('when a team member selected', () => {
    it('calls updateTeamMembers when delete button is clicked', () => {
      const updateTeamMembers = jest.fn();
      setup({ updateTeamMembers });
      expect(updateTeamMembers).toHaveBeenCalledTimes(0);
      userEvent.click(
        screen.getByRole('button', {
          name: `Remove ${pokemon[0].name} from team`
        })
      );
      expect(updateTeamMembers).toHaveBeenCalledWith([
        teamMembers[1],
        teamMembers[2]
      ]);
    });
  });
});
