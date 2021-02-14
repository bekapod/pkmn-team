import { render, screen } from '@testing-library/react';
import { PokemonLine, PokemonLineProps } from '.';
import { pikachu } from '~/mocks/Pokemon';

describe('PokemonLine', () => {
  const setup = (props: Partial<PokemonLineProps> = {}) =>
    render(<PokemonLine pokemon={pikachu} {...props} />);

  it('renders pokemon information', () => {
    setup();
    expect(
      screen.getByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(`${pikachu.name} sprite`)).toHaveAttribute(
      'src',
      `/sprites/${pikachu.sprite}`
    );
    expect(screen.getByText(pikachu.types[0].type.name)).toBeInTheDocument();
  });

  it('adds type gradient', () => {
    const { container } = setup();
    expect(container.firstChild).toHaveStyle({
      '--type-gradient':
        'linear-gradient(90deg, var(--colors-electric) 0%, var(--colors-electric) 100%)'
    });
  });

  it('adds outdent', () => {
    const { container } = setup({ outdent: '1rem' });
    expect(container.firstChild).toHaveStyle({ '--outdent': '1rem' });
  });
});
