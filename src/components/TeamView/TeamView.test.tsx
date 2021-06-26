import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { setupResizeObserverMock } from '~/test-helpers';
import { composeStory } from '@storybook/testing-react';
import Meta, { teamView } from './TeamView.stories';

const TeamView = composeStory(teamView, Meta);

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
    setupResizeObserverMock([]);
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('applies props from Tabs component correctly', async () => {
    render(<TeamView />);

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
      render(<TeamView />);

      expect(screen.queryAllByTestId(/tab-item-/)).toHaveLength(4);
      expect(screen.queryAllByTestId(/tab-content-/)).toHaveLength(4);
      expect(screen.queryByTestId('tab-item-add-pokemon')).toBeInTheDocument();
      expect(
        screen.queryByTestId('tab-content-add-pokemon')
      ).toBeInTheDocument();
    });
  });

  describe('with 6 team members', () => {
    it('renders a tab for each pokemon and no tab for pokemon search', (): void => {
      render(
        <TeamView
          initialTeamMembers={[
            ...(Meta.args?.initialTeamMembers ?? []),
            ...(Meta.args?.initialTeamMembers ?? [])
          ]}
        />
      );

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
      render(<TeamView />);

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
      render(<TeamView updateTeamMembers={updateTeamMembers} />);

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
        ...(Meta.args?.initialTeamMembers ?? []),
        {
          id: expect.any(String),
          pokemon: charmander
        }
      ]);
    });
  });

  describe('when a team member selected', () => {
    it('calls updateTeamMembers when delete button is clicked', () => {
      const updateTeamMembers = jest.fn();
      render(<TeamView updateTeamMembers={updateTeamMembers} />);
      expect(updateTeamMembers).toHaveBeenCalledTimes(0);
      userEvent.click(
        screen.getByRole('button', {
          name: `Remove ${charmander.name} from team`
        })
      );
      expect(updateTeamMembers).toHaveBeenCalledWith([
        Meta.args?.initialTeamMembers?.[1],
        Meta.args?.initialTeamMembers?.[2]
      ]);
    });
  });
});
