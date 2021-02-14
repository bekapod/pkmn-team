import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '.';

describe(ErrorMessage, () => {
  it("renders it's children in a div", () => {
    render(<ErrorMessage>Some error</ErrorMessage>);
    expect(screen.getByText('Some error')).toBeInTheDocument();
    expect(screen.getByText('Some error').tagName).toBe('DIV');
  });

  it('uses aria role', () => {
    render(<ErrorMessage>Some error</ErrorMessage>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    render(
      <ErrorMessage className="some-custom-class">Some error</ErrorMessage>
    );
    expect(screen.getByText('Some error')).toHaveClass('some-custom-class');
  });

  it('adds isBig modifier classes', () => {
    render(<ErrorMessage isBig>Some error</ErrorMessage>);
    expect(screen.getByText('Some error')).toHaveClass('text-lg');
  });
});
