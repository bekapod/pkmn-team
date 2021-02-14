import { render, screen } from '@testing-library/react';
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
    setup();
    expect(
      screen.getByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(`${pikachu.name} sprite`)).toHaveAttribute(
      'src',
      `/sprites/${pikachu.sprite}`
    );
    expect(screen.getByText(pikachu.types[0].type.name)).toBeInTheDocument();
    expect(
      screen.getByText(pikachu.learnable_moves[0].move.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(pikachu.learnable_moves[1].move.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(pikachu.learnable_moves[2].move.name)
    ).toBeInTheDocument();
  });

  it('renders card actions', () => {
    setup({
      renderCardActions: () => <button>Some button</button>
    });
    expect(screen.getByText('Some button')).toBeInTheDocument();
  });
});
