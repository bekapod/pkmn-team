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
              facets: {
                'types.type.name': {
                  Water: 131,
                  Normal: 109,
                  Flying: 98,
                  Grass: 97,
                  Psychic: 82
                }
              },
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
      await screen.findByText(`#${charmander.pokedexId} ${charmander.name}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`#${haunter.pokedexId} ${haunter.name}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`#${pikachu.pokedexId} ${pikachu.name}`)
    ).toBeInTheDocument();
  });

  it('renders all type facets', async () => {
    setup();
    expect(
      await screen.findByRole('button', { name: 'Water (131)' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Normal (109)' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Flying (98)' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Grass (97)' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Psychic (82)' })
    ).toBeInTheDocument();
  });
});
