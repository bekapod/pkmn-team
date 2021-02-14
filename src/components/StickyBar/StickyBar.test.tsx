import { render, screen } from '@testing-library/react';
import { StickyBar } from '.';

describe(StickyBar, () => {
  it("renders it's children in a div", () => {
    render(<StickyBar>hello</StickyBar>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(<StickyBar className="some-custom-class">hello</StickyBar>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });
});
