import { render, screen } from '@testing-library/react';
import { Label } from '.';

describe(Label, () => {
  it("renders it's children in a span", () => {
    render(<Label>hello</Label>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('SPAN');
  });

  it('adds additional class names', () => {
    render(<Label className="some-custom-class">hello</Label>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can render as a different element', () => {
    render(<Label as="label">hello</Label>);
    expect(screen.getByText('hello').tagName).toBe('LABEL');
  });
});
