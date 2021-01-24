import { render } from '@testing-library/react';
import { PokemonGrid } from '.';

describe(PokemonGrid, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(<PokemonGrid>hello</PokemonGrid>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <PokemonGrid className="some-custom-class">hello</PokemonGrid>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });
});
