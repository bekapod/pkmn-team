import { render } from '@testing-library/react';
import { TypeTag } from '.';

describe(TypeTag, () => {
  it("renders it's children in a span", () => {
    const { getByText } = render(<TypeTag>hello</TypeTag>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('SPAN');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <TypeTag className="some-custom-class">hello</TypeTag>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can render as a different element', () => {
    const { getByText } = render(<TypeTag as="label">hello</TypeTag>);
    expect(getByText('hello').tagName).toBe('LABEL');
  });

  it('adds type colour', () => {
    const { getByText } = render(<TypeTag type="electric">hello</TypeTag>);
    expect(getByText('hello')).toHaveStyle({
      '--type-color': 'var(--colors-electric)'
    });
  });
});
