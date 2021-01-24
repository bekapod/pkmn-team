import { render } from '@testing-library/react';
import { PokemonLine, PokemonLineProps } from '.';
import { pikachu } from '~/mocks/Pokemon';

describe('PokemonLine', () => {
  const setup = (props: Partial<PokemonLineProps> = {}) =>
    render(<PokemonLine pokemon={pikachu} {...props} />);

  it('renders pokemon information', () => {
    const { getByText, getByAltText } = setup();
    expect(
      getByText(`#${pikachu.pokedex_id} ${pikachu.name}`)
    ).toBeInTheDocument();
    expect(getByAltText(`${pikachu.name} sprite`)).toHaveAttribute(
      'src',
      `/sprites/${pikachu.sprite}`
    );
    expect(getByText(pikachu.types[0].type.name)).toBeInTheDocument();
  });

  it('adds type gradient', () => {
    const { container } = setup();
    expect(container.firstChild).toHaveStyle({
      '--type-gradient':
        'linear-gradient(90deg, var(--color-electric) 0%, var(--color-electric) 100%)'
    });
  });

  it('adds outdent', () => {
    const { container } = setup({ outdent: '1rem' });
    expect(container.firstChild).toHaveStyle({ '--outdent': '1rem' });
  });
});