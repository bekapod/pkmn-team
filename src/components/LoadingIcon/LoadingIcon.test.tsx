import { render, screen } from '@testing-library/react';
import { LoadingIcon } from '.';

describe(LoadingIcon, () => {
  it('renders loading text in a div', () => {
    render(<LoadingIcon />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    render(<LoadingIcon className="some-custom-class" />);
    expect(screen.getByText('Loading')).toHaveClass('some-custom-class');
  });

  it('renders spinner', () => {
    render(<LoadingIcon isSpinner />);
    expect(screen.getByTestId('loading-spinner')).toHaveAttribute(
      'role',
      'img'
    );
  });

  it('renders small spinner', () => {
    render(<LoadingIcon isSpinner isSmall />);
    expect(screen.getByTestId('loading-spinner')).toHaveClass('spinner-small');
  });

  it('renders centered spinner', () => {
    render(<LoadingIcon isSpinner isCentered />);
    expect(screen.getByTestId('loading-spinner')).toHaveClass(
      'top-0 bottom-0 m-auto'
    );
  });
});
