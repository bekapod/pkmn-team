import { render } from '@testing-library/react';
import Link from 'next/link';
import { BiHappyHeartEyes as Icon } from 'react-icons/bi';
import { CtaButton, CtaLink } from '.';

describe('CtaButton', () => {
  it('renders a button element', () => {
    const { getByText } = render(<CtaButton>hello</CtaButton>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('BUTTON');
  });

  it('renders an icon', () => {
    const { getByRole } = render(<CtaButton icon={Icon}>hello</CtaButton>);
    expect(getByRole('presentation', { hidden: true })).toBeInTheDocument();
  });

  it('uses modifier class', () => {
    const { getByText } = render(
      <CtaButton variant="primary">hello</CtaButton>
    );
    expect(getByText('hello')).toHaveClass('bg-pink-vivid-500');
  });

  it('renders a loading icon', () => {
    const { getByLabelText } = render(
      <CtaButton aria-busy={true}>hello</CtaButton>
    );
    expect(getByLabelText('Loading')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    const { getByText } = render(
      <CtaButton className="some-class">hello</CtaButton>
    );
    expect(getByText('hello')).toHaveClass('some-class');
  });
});

describe('CtaLink', () => {
  it('renders a link element', () => {
    const { getByText } = render(<CtaLink href="/hello">hello</CtaLink>);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('hello').tagName).toBe('A');
  });

  it('renders href attribute', () => {
    const { getByText } = render(<CtaLink href="/hello">hello</CtaLink>);
    expect(getByText('hello')).toHaveAttribute('href', '/hello');
  });

  it('renders href from next.js Link', () => {
    const { getByText } = render(
      <Link href="/hello" passHref>
        <CtaLink>hello</CtaLink>
      </Link>
    );
    expect(getByText('hello')).toHaveAttribute('href', '/hello');
  });
});
