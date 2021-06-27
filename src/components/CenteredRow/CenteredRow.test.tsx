import { screen, render } from '@testing-library/react';
import { CenteredRow } from '.';

describe(CenteredRow, () => {
  it("renders it's children in a div", () => {
    render(<CenteredRow>hello</CenteredRow>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(<CenteredRow className="some-custom-class">hello</CenteredRow>);
    expect(screen.getByText('hello')).toHaveClass('some-custom-class');
  });

  it('can stack content vertically', () => {
    render(<CenteredRow stackVertically>hello</CenteredRow>);
    expect(screen.getByText('hello')).toHaveClass('flex-col');
  });

  it('can render as a different element', () => {
    render(<CenteredRow as="main">hello</CenteredRow>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
