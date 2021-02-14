import { render } from '@testing-library/react';
import { ErrorMessage } from '.';

describe(ErrorMessage, () => {
  it("renders it's children in a div", () => {
    const { getByText } = render(<ErrorMessage>Some error</ErrorMessage>);
    expect(getByText('Some error')).toBeInTheDocument();
    expect(getByText('Some error').tagName).toBe('DIV');
  });

  it('uses aria role', () => {
    const { getByRole } = render(<ErrorMessage>Some error</ErrorMessage>);
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <ErrorMessage className="some-custom-class">Some error</ErrorMessage>
    );
    expect(getByText('Some error')).toHaveClass('some-custom-class');
  });

  it('adds isBig modifier classes', () => {
    const { getByText } = render(<ErrorMessage isBig>Some error</ErrorMessage>);
    expect(getByText('Some error')).toHaveClass('text-lg');
  });
});
