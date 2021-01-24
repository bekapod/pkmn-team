import { render } from '@testing-library/react';
import { LoadingIcon } from '.';

describe(LoadingIcon, () => {
  it('renders loading text in a div', () => {
    const { getByText } = render(<LoadingIcon />);
    expect(getByText('Loading')).toBeInTheDocument();
    expect(getByText('Loading').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = render(<LoadingIcon className="some-custom-class" />);
    expect(getByText('Loading')).toHaveClass('some-custom-class');
  });

  it('renders spinner', () => {
    const { getByTestId } = render(<LoadingIcon isSpinner />);
    expect(getByTestId('loading-spinner')).toHaveAttribute('role', 'img');
  });

  it('renders small spinner', () => {
    const { getByTestId } = render(<LoadingIcon isSpinner isSmall />);
    expect(getByTestId('loading-spinner')).toHaveClass('is-small');
  });

  it('renders centered spinner', () => {
    const { getByTestId } = render(<LoadingIcon isSpinner isCentered />);
    expect(getByTestId('loading-spinner')).toHaveClass('is-centered');
  });
});
