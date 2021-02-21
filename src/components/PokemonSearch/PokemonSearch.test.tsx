import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import { PokemonSearch, PokemonSearchProps } from '.';

describe(PokemonSearch, () => {
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

  const setup = (props: Partial<PokemonSearchProps> = {}) =>
    render(<PokemonSearch setCurrentSearchPokemon={jest.fn()} {...props} />);

  it('renders a search input', () => {
    setup();
    expect(screen.getByLabelText('Find Pokemon by name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Find by name')).toBeInTheDocument();
  });

  it('renders all of the pokemon', async () => {
    setup();
    expect(
      await screen.findByText(`#${charmander.pokedex_id} ${charmander.name}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`#${haunter.pokedex_id} ${haunter.name}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
  });

  describe('when loading', () => {
    it('renders a loading icon', () => {
      setup({ isLoading: true });
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(
        screen.queryByText(`#${haunter.pokedex_id} ${haunter.name}`)
      ).not.toBeInTheDocument();
    });
  });

  describe('when there is an error', () => {
    it('renders the error message', () => {
      setup({
        error: {
          name: 'error',
          message: 'Some error happened',
          graphQLErrors: []
        }
      });
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Some error happened')).toBeInTheDocument();
      expect(
        screen.queryByText(`#${haunter.pokedex_id} ${haunter.name}`)
      ).not.toBeInTheDocument();
    });
  });
});
