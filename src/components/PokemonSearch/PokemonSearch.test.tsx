import { render, screen } from '@testing-library/react';
import { PokemonSearch, PokemonSearchProps } from '.';
import { charmander, haunter, pikachu } from '~/mocks/Pokemon';
import userEvent from '@testing-library/user-event';

describe(PokemonSearch, () => {
  const setup = (props: Partial<PokemonSearchProps> = {}) =>
    render(
      <PokemonSearch
        setCurrentSearchPokemon={jest.fn()}
        pokemon={[charmander, haunter, pikachu]}
        {...props}
      />
    );

  it('renders a search input', () => {
    setup();
    expect(screen.getByLabelText('Find Pokemon by name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Find by name')).toBeInTheDocument();
  });

  it('renders all of the pokemon', () => {
    setup();
    expect(
      screen.getByText(`#${charmander.pokedex_id} ${charmander.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`#${haunter.pokedex_id} ${haunter.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
  });

  it('filters pokemon when a search is inputted', async () => {
    setup();
    await userEvent.type(screen.getByLabelText('Find Pokemon by name'), 'Hau');
    expect(
      screen.queryByText(`#${charmander.pokedex_id} ${charmander.name}`)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(`#${haunter.pokedex_id} ${haunter.name}`)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).not.toBeInTheDocument();
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
