import { render, screen } from '@testing-library/react';
import { PokemonCard, PokemonCardProps } from '.';
import { pikachu } from '~/mocks/Pokemon';
import { setupResizeObserverMock } from '~/test-helpers';
import { substitute, rest, flash } from '~/mocks/Moves';
import { MovesProvider } from '~/hooks/useMoves';

describe(PokemonCard, () => {
  const teamMember = {
    id: '1',
    order: 0,
    pokemon: pikachu,
    learned_moves: [
      {
        order: 1,
        move: substitute
      },
      {
        order: 2,
        move: rest
      },
      {
        order: 3,
        move: flash
      }
    ]
  };

  const setup = (props: Partial<PokemonCardProps> = {}) => {
    setupResizeObserverMock([]);
    return render(
      <MovesProvider teamMember={teamMember}>
        <PokemonCard pokemon={pikachu} teamMember={teamMember} {...props} />
      </MovesProvider>
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
