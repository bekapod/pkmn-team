import { render, screen } from '@testing-library/react';
import { TypeTag } from '.';

describe(TypeTag, () => {
  it("renders it's children in a span", () => {
    render(<TypeTag>hello</TypeTag>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('SPAN');
  });

  it('adds additional class names', () => {
    render(<TypeTag className="some-custom-class">hello</TypeTag>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can render as a different element', () => {
    render(<TypeTag as="label">hello</TypeTag>);
    expect(screen.getByText('hello').tagName).toBe('LABEL');
  });

  it('adds type colour', () => {
    render(<TypeTag typeSlug="electric">hello</TypeTag>);
    expect(screen.getByText('hello')).toHaveStyle({
      '--type-color': 'var(--colors-electric)'
    });
  });
});
