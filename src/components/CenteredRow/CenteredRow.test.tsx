import { render } from '@testing-library/react';
import { CenteredRow } from '.';

describe(CenteredRow, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(<CenteredRow>hello</CenteredRow>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <CenteredRow className="some-custom-class">hello</CenteredRow>
    );
    expect(getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can stack content vertically', () => {
    const { getByText } = render(
      <CenteredRow stackVertically>hello</CenteredRow>
    );
    expect(getByText('hello')).toHaveClass('flex-col');
  });

  it('can render as a different element', () => {
    const { getByText } = render(<CenteredRow as="main">hello</CenteredRow>);
    expect(getByText('hello').tagName).toBe('MAIN');
  });
});
