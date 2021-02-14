import { render, screen } from '@testing-library/react';
import { FullWidthContainer } from '.';

describe(FullWidthContainer, () => {
  it("renders it's children in a div", () => {
    render(<FullWidthContainer>hello</FullWidthContainer>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(
      <FullWidthContainer className="some-custom-class">
        hello
      </FullWidthContainer>
    );
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });
});
