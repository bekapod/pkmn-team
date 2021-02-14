import { render, screen } from '@testing-library/react';
import { Header } from '.';
import { HeaderProps } from './Header';

describe(Header, () => {
  const setup = (props: Partial<HeaderProps> = {}) =>
    render(<Header title="Some page" {...props} />);

  it('renders in an accessible element', () => {
    setup();
    expect(screen.getByRole('banner').tagName).toBe('HEADER');
  });

  it('renders a link to the dashboard', () => {
    setup();
    expect(screen.getByTitle('Dashboard')).toHaveAttribute('href', '/');
  });

  it('renders the page title in a h1', () => {
    setup();
    expect(screen.getByText('Some page').tagName).toBe('H1');
  });

  it('adds custom class names', () => {
    setup({ className: 'some-custom-class' });
    expect(screen.getByRole('banner')).toHaveClass('some-custom-class');
  });
});
