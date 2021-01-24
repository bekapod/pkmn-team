import { render } from '@testing-library/react';
import { Label } from '.';

describe(Label, () => {
  it("renders it's children in a span", () => {
    const { getByText } = render(<Label>hello</Label>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('SPAN');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <Label className="some-custom-class">hello</Label>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can render as a different element', () => {
    const { getByText } = render(<Label as="label">hello</Label>);
    expect(getByText('hello').tagName).toBe('LABEL');
  });
});
