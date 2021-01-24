import { render } from '@testing-library/react';
import { InlineList } from '.';

describe(InlineList, () => {
  it("renders it's children in a ul", () => {
    const { getByRole, getByText } = render(
      <InlineList>
        <li>Item 1</li>
        <li>Item 2</li>
      </InlineList>
    );
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByRole('list').tagName).toBe('UL');
  });

  it('adds additional class names', () => {
    const { getByRole } = render(
      <InlineList className="some-custom-class">
        <li>Item 1</li>
        <li>Item 2</li>
      </InlineList>
    );
    expect(getByRole('list')).toHaveClass('some-custom-class');
  });
});
