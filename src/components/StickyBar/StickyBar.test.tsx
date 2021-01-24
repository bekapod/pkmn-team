import { render } from '@testing-library/react';
import { StickyBar } from '.';

describe(StickyBar, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(<StickyBar>hello</StickyBar>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <StickyBar className="some-custom-class">hello</StickyBar>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });
});
