import { render, screen } from '@testing-library/react';
import { PokemonGrid } from '.';

describe(PokemonGrid, () => {
  it("renders it's children in a div", () => {
    render(<PokemonGrid>hello</PokemonGrid>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(<PokemonGrid className="some-custom-class">hello</PokemonGrid>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });
});
