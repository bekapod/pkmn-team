import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { setupResizeObserverMock } from '~/test-helpers';
import { TeamView, TeamViewProps } from '.';

describe('TeamView', () => {
  const server = setupServer(
    rest.post(/.*algolia.*/, (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              exhaustiveFacetsCount: true,
              exhaustiveNbHits: true,
              hits: [
                { ...charmander, objectID: '1' },
                { ...haunter, objectID: '2' },
                { ...pikachu, objectID: '3' }
              ],
              hitsPerPage: 50,
              index: 'pokemon',
              nbHits: 3,
              nbPages: 1,
              page: 0
            }
          ]
        })
      )
    )
  );

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  const teamMembers = [
    {
      id: '1',
      order: 1,
      pokemon: charmander,
      learned_moves: []
    },
    {
      id: '2',
      order: 2,
      pokemon: haunter,
      learned_moves: []
    },
    {
      id: '3',
      order: 3,
      pokemon: pikachu,
      learned_moves: []
    }
  ];

  const fullTeamMembers = [
    ...teamMembers,
    {
      id: '4',
      order: 4,
      pokemon: charmander,
      learned_moves: []
    },
    {
      id: '5',
      order: 5,
      pokemon: haunter,
      learned_moves: []
    },
    {
      id: '6',
      order: 6,
      pokemon: pikachu,
      learned_moves: []
    }
  ];

  const setup = (props: Partial<TeamViewProps> = {}) => {
    setupResizeObserverMock([]);
    return render(<TeamView initialTeamMembers={teamMembers} {...props} />);
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
    it('renders the currently selected pokemon', async () => {
      setup();

      userEvent.click(screen.getByLabelText('Add new pokemon to team'));
      userEvent.click(
        await screen.findByText(new RegExp(charmander.name, 'i'), {
          selector: '[data-testid="tab-content-add-pokemon"] *'
        })
      );

      expect(
        await screen.findByText(`Add ${charmander.name} to team`)
      ).toBeInTheDocument();
    });

    it('calls updateTeamMembers when add button is clicked', async () => {
      const updateTeamMembers = jest.fn();
      setup({ updateTeamMembers });

      userEvent.click(screen.getByLabelText('Add new pokemon to team'));
      userEvent.click(
        await screen.findByText(new RegExp(charmander.name, 'i'), {
          selector: '[data-testid="tab-content-add-pokemon"] *'
        })
      );
      expect(updateTeamMembers).toHaveBeenCalledTimes(0);
      userEvent.click(
        await screen.findByText(`Add ${charmander.name} to team`)
      );
      expect(updateTeamMembers).toHaveBeenCalledTimes(1);
      expect(updateTeamMembers).toHaveBeenCalledWith([
        ...teamMembers,
        {
          id: expect.any(String),
          learned_moves: [],
          order: 3,
          pokemon: { ...charmander, learnable_moves: undefined }
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
          name: `Remove ${charmander.name} from team`
        })
      );
      expect(updateTeamMembers).toHaveBeenCalledWith([
        teamMembers[1],
        teamMembers[2]
      ]);
    });
  });
});
