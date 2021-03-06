import { render, screen } from '@testing-library/react';
import { InlineList } from '.';

describe(InlineList, () => {
  it("renders it's children in a ul", () => {
    render(
      <InlineList>
        <li>Item 1</li>
        <li>Item 2</li>
      </InlineList>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByRole('list').tagName).toBe('UL');
  });

  it('adds additional class names', () => {
    render(
      <InlineList className="some-custom-class">
        <li>Item 1</li>
        <li>Item 2</li>
      </InlineList>
    );
    expect(screen.getByRole('list')).toHaveClass('some-custom-class');
  });
});
