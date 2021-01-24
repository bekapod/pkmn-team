import { render } from '@testing-library/react';
import { Header } from '.';
import { HeaderProps } from './Header';

describe(Header, () => {
  const setup = (props: Partial<HeaderProps> = {}) =>
    render(<Header title="Some page" {...props} />);

  it('renders in an accessible element', () => {
    const { getByRole } = setup();
    expect(getByRole('banner').tagName).toBe('HEADER');
  });

  it('renders a link to the dashboard', () => {
    const { getByTitle } = setup();
    expect(getByTitle('Dashboard')).toHaveAttribute('href', '/');
  });

  it('renders the page title in a h1', () => {
    const { getByText } = setup();
    expect(getByText('Some page').tagName).toBe('H1');
  });

  it('adds custom class names', () => {
    const { getByRole } = setup({ className: 'some-custom-class' });
    expect(getByRole('banner')).toHaveClass('some-custom-class');
  });
});
