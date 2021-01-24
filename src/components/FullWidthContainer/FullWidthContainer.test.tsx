import { render } from '@testing-library/react';
import { FullWidthContainer } from '.';

describe(FullWidthContainer, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(
      <FullWidthContainer>hello</FullWidthContainer>
    );
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <FullWidthContainer className="some-custom-class">
        hello
      </FullWidthContainer>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });
});
