import { render } from '@testing-library/react';
import { FullBleedContainer } from '.';

describe(FullBleedContainer, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(
      <FullBleedContainer>hello</FullBleedContainer>
    );
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <FullBleedContainer className="some-custom-class">
        hello
      </FullBleedContainer>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });
});
