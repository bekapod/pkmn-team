import { screen, render } from '@testing-library/react';
import Link from 'next/link';
import { CardWrapper, CardLink, CardHeader, CardHeading, CardContent } from '.';

describe(CardWrapper, () => {
  const setup = () =>
    render(
      <CardWrapper className="some-custom-class">Some content</CardWrapper>
    );

  it("renders it's children", () => {
    setup();
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });

  it('renders as an <article>', () => {
    setup();
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    setup();
    expect(screen.getByRole('article')).toHaveClass('some-custom-class');
  });
});

describe('CardLink', () => {
  const setup = () =>
    render(
      <Link href="/some-link" passHref>
        <CardLink className="some-custom-class">Some link</CardLink>
      </Link>
    );

  it("renders it's children", () => {
    setup();
    expect(
      screen.getByRole('link', {
        name: /some link/i
      })
    ).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    setup();
    expect(
      screen.getByRole('link', {
        name: /some link/i
      })
    ).toHaveClass('some-custom-class');
  });

  it('allows for href to be forwarded from <Link />', () => {
    setup();
    expect(
      screen.getByRole('link', {
        name: /some link/i
      })
    ).toHaveAttribute('href', '/some-link');
  });
});

describe(CardHeader, () => {
  const setup = () =>
    render(<CardHeader className="some-custom-class">Some header</CardHeader>);

  it("renders it's children", () => {
    setup();
    expect(screen.getByText('Some header')).toBeInTheDocument();
  });

  it('renders as a <header>', () => {
    setup();
    expect(screen.getByRole('banner').tagName).toBe('HEADER');
  });

  it('adds additional class names', () => {
    setup();
    expect(screen.getByRole('banner')).toHaveClass('some-custom-class');
  });
});

describe(CardHeading, () => {
  const setup = () =>
    render(
      <CardHeading className="some-custom-class">Some heading</CardHeading>
    );

  it("renders it's children", () => {
    setup();
    expect(
      screen.getByRole('heading', {
        name: /some heading/i
      })
    ).toBeInTheDocument();
  });

  it('renders as an <h2>', () => {
    setup();
    expect(
      screen.getByRole('heading', {
        name: /some heading/i
      }).tagName
    ).toBe('H2');
  });

  it('adds additional class names', () => {
    setup();
    expect(
      screen.getByRole('heading', {
        name: /some heading/i
      })
    ).toHaveClass('some-custom-class');
  });
});

describe(CardContent, () => {
  const setup = () =>
    render(
      <CardContent className="some-custom-class">Some content</CardContent>
    );

  it("renders it's children", () => {
    setup();
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });

  it('renders as a <div>', () => {
    setup();
    expect(screen.getByText('Some content').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    setup();
    expect(screen.getByText('Some content')).toHaveClass('some-custom-class');
  });
});
