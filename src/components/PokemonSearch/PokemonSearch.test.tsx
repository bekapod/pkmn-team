import { render } from '@testing-library/react';
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
    const { getByLabelText, getByPlaceholderText } = setup();
    expect(getByLabelText('Find Pokemon by name')).toBeInTheDocument();
    expect(getByPlaceholderText('Find by name')).toBeInTheDocument();
  });

  it('renders all of the pokemon', () => {
    const { getByText } = setup();
    expect(
      getByText(`#${charmander.pokedex_id} ${charmander.name}`)
    ).toBeInTheDocument();
    expect(
      getByText(`#${haunter.pokedex_id} ${haunter.name}`)
    ).toBeInTheDocument();
    expect(
      getByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
  });

  it('filters pokemon when a search is inputted', async () => {
    const { getByText, queryByText, getByLabelText } = setup();
    await userEvent.type(getByLabelText('Find Pokemon by name'), 'Hau');
    expect(
      queryByText(`#${charmander.pokedex_id} ${charmander.name}`)
    ).not.toBeInTheDocument();
    expect(
      getByText(`#${haunter.pokedex_id} ${haunter.name}`)
    ).toBeInTheDocument();
    expect(
      queryByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).not.toBeInTheDocument();
  });

  describe('when loading', () => {
    it('renders a loading icon', () => {
      const { getByTestId, queryByText } = setup({ isLoading: true });
      expect(getByTestId('loading-spinner')).toBeInTheDocument();
      expect(
        queryByText(`#${haunter.pokedex_id} ${haunter.name}`)
      ).not.toBeInTheDocument();
    });
  });

  describe('when there is an error', () => {
    it('renders the error message', () => {
      const { getByText, getByRole, queryByText } = setup({
        error: {
          name: 'error',
          message: 'Some error happened',
          graphQLErrors: []
        }
      });
      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByText('Some error happened')).toBeInTheDocument();
      expect(
        queryByText(`#${haunter.pokedex_id} ${haunter.name}`)
      ).not.toBeInTheDocument();
    });
  });
});
