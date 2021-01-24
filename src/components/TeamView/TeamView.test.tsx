import { render } from '@testing-library/react';
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
    const { getByTestId, getByLabelText } = setup();

    expect(getByTestId('tab-item-1')).toHaveAttribute('aria-selected', 'true');
    expect(getByTestId('tab-content-1')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    userEvent.click(getByTestId('tab-item-2'));
    expect(getByTestId('tab-item-2')).toHaveAttribute('aria-selected', 'true');
    expect(getByTestId('tab-content-2')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    expect(getByLabelText('Add new pokemon to team')).not.toHaveFocus();
    await userEvent.type(getByLabelText('Add new pokemon to team'), '[enter]');
    expect(getByLabelText('Add new pokemon to team')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(getByTestId('tab-content-add-pokemon')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    expect(getByLabelText('Add new pokemon to team')).toHaveFocus();
  });

  describe('with less than 6 team members', () => {
    it('renders a tab for each pokemon plus a tab for pokemon search', (): void => {
      const { queryByTestId, queryAllByTestId } = setup();

      expect(queryAllByTestId(/tab-item-/)).toHaveLength(4);
      expect(queryAllByTestId(/tab-content-/)).toHaveLength(4);
      expect(queryByTestId('tab-item-add-pokemon')).toBeTruthy();
      expect(queryByTestId('tab-content-add-pokemon')).toBeTruthy();
    });
  });

  describe('with 6 team members', () => {
    it('renders a tab for each pokemon plus a tab for pokemon search', (): void => {
      const { queryByTestId, getAllByTestId } = setup({
        initialTeamMembers: fullTeamMembers
      });

      expect(getAllByTestId(/tab-item-/)).toHaveLength(6);
      expect(getAllByTestId(/tab-content-/)).toHaveLength(6);
      expect(queryByTestId('tab-item-add-pokemon')).not.toBeInTheDocument();
      expect(queryByTestId('tab-content-add-pokemon')).not.toBeInTheDocument();
    });
  });

  describe('with a search pokemon selected', () => {
    it('renders the currently selected pokemon', () => {
      const { getByText, getByLabelText } = setup();

      userEvent.click(getByLabelText('Add new pokemon to team'));
      userEvent.click(
        getByText(new RegExp(pokemon[0].name, 'i'), {
          selector: '[data-testid="tab-content-add-pokemon"] *'
        })
      );

      expect(getByText(`Add ${pokemon[0].name} to team`)).toBeInTheDocument();
    });
  });
});
