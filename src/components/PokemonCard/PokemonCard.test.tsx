import { render } from '@testing-library/react';
import { PokemonCard, PokemonCardProps } from '.';
import { pikachu } from '~/mocks/Pokemon';
import { setupResizeObserverMock } from '~/test-helpers';

describe(PokemonCard, () => {
  const setup = (props: Partial<PokemonCardProps> = {}) => {
    setupResizeObserverMock([]);
    return render(
      <PokemonCard
        pokemon={pikachu}
        moves={pikachu.learnable_moves.map(({ move }) => move)}
        {...props}
      />
    );
  };

  it('renders information about the pokemon', () => {
    const { getByText, getByAltText } = setup();
    expect(
      getByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
    expect(getByAltText(`${pikachu.name} sprite`)).toHaveAttribute(
      'src',
      `/sprites/${pikachu.sprite}`
    );
    expect(getByText(pikachu.types[0].type.name)).toBeInTheDocument();
    expect(getByText(pikachu.learnable_moves[0].move.name)).toBeInTheDocument();
    expect(getByText(pikachu.learnable_moves[1].move.name)).toBeInTheDocument();
    expect(getByText(pikachu.learnable_moves[2].move.name)).toBeInTheDocument();
  });

  it('renders card actions', () => {
    const { getByText } = setup({
      renderCardActions: () => <button>Some button</button>
    });
    expect(getByText('Some button')).toBeInTheDocument();
  });
});
