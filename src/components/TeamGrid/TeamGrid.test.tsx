import { render, screen } from '@testing-library/react';
import { TeamGrid } from '.';

describe(TeamGrid, () => {
  it("renders it's children in a div", () => {
    render(<TeamGrid>hello</TeamGrid>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(<TeamGrid className="some-custom-class">hello</TeamGrid>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can render as a different element', () => {
    render(<TeamGrid as="main">hello</TeamGrid>);
    expect(screen.getByText('hello').tagName).toBe('MAIN');
  });
});
