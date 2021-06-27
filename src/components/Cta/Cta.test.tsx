import { render, screen } from '@testing-library/react';
import Link from 'next/link';
import { BiHappyHeartEyes as Icon } from 'react-icons/bi';
import { CtaButton, CtaLink } from '.';

describe('CtaButton', () => {
  it('renders a button element', () => {
    render(<CtaButton>hello</CtaButton>);
    expect(screen.getByRole('button', { name: 'hello' })).toBeInTheDocument();
  });

  it('renders an icon', () => {
    render(<CtaButton icon={Icon}>hello</CtaButton>);
    expect(
      screen.getByRole('presentation', { hidden: true })
    ).toBeInTheDocument();
  });

  it('uses modifier class', () => {
    render(<CtaButton variant="primary">hello</CtaButton>);
    expect(screen.getByText('hello')).toHaveClass('bg-pink-vivid-500');
  });

  it('renders a loading icon', () => {
    render(<CtaButton aria-busy={true}>hello</CtaButton>);
    expect(screen.getByRole('alert', { name: 'Loading' })).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    render(<CtaButton className="some-class">hello</CtaButton>);
    expect(screen.getByText('hello')).toHaveClass('some-class');
  });
});

describe('CtaLink', () => {
  it('renders a link element', () => {
    render(<CtaLink href="/hello">hello</CtaLink>);
    expect(screen.getByRole('link', { name: 'hello' })).toBeInTheDocument();
  });

  it('renders href attribute', () => {
    render(<CtaLink href="/hello">hello</CtaLink>);
    expect(screen.getByText('hello')).toHaveAttribute('href', '/hello');
  });

  it('renders href from next.js Link', () => {
    render(
      <Link href="/hello" passHref>
        <CtaLink>hello</CtaLink>
      </Link>
    );
    expect(screen.getByText('hello')).toHaveAttribute('href', '/hello');
  });
});
