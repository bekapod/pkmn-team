import { render, screen } from '@testing-library/react';
import { FullBleedContainer } from '.';

describe(FullBleedContainer, () => {
  it("renders it's children in a div", () => {
    render(<FullBleedContainer>hello</FullBleedContainer>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(
      <FullBleedContainer className="some-custom-class">
        hello
      </FullBleedContainer>
    );
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });
});
