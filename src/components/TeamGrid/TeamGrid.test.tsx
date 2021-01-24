import { render } from '@testing-library/react';
import { TeamGrid } from '.';

describe(TeamGrid, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(<TeamGrid>hello</TeamGrid>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <TeamGrid className="some-custom-class">hello</TeamGrid>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can render as a different element', () => {
    const { getByText } = render(<TeamGrid as="main">hello</TeamGrid>);
    expect(getByText('hello').tagName).toBe('MAIN');
  });
});
