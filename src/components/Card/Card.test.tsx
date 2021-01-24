import { render } from '@testing-library/react';
import Link from 'next/link';
import { CardWrapper, CardLink, CardHeader, CardHeading, CardContent } from '.';

describe(CardWrapper, () => {
  const setup = () =>
    render(
      <CardWrapper className="some-custom-class">Some content</CardWrapper>
    );

  it("renders it's children", () => {
    const { getByText } = setup();
    expect(getByText('Some content')).toBeInTheDocument();
  });

  it('renders as an <article>', () => {
    const { getByText } = setup();
    expect(getByText('Some content').tagName).toBe('ARTICLE');
  });

  it('adds additional class names', () => {
    const { getByText } = setup();
    expect(getByText('Some content')).toHaveClass('some-custom-class');
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
    const { getByText } = setup();
    expect(getByText('Some link')).toBeInTheDocument();
  });

  it('renders as an <a>', () => {
    const { getByText } = setup();
    expect(getByText('Some link').tagName).toBe('A');
  });

  it('adds additional class names', () => {
    const { getByText } = setup();
    expect(getByText('Some link')).toHaveClass('some-custom-class');
  });

  it('allows for href to be forwarded from <Link />', () => {
    const { getByText } = setup();
    expect(getByText('Some link')).toHaveAttribute('href', '/some-link');
  });
});

describe(CardHeader, () => {
  const setup = () =>
    render(<CardHeader className="some-custom-class">Some header</CardHeader>);

  it("renders it's children", () => {
    const { getByText } = setup();
    expect(getByText('Some header')).toBeInTheDocument();
  });

  it('renders as a <header>', () => {
    const { getByText } = setup();
    expect(getByText('Some header').tagName).toBe('HEADER');
  });

  it('adds additional class names', () => {
    const { getByText } = setup();
    expect(getByText('Some header')).toHaveClass('some-custom-class');
  });
});

describe(CardHeading, () => {
  const setup = () =>
    render(
      <CardHeading className="some-custom-class">Some heading</CardHeading>
    );

  it("renders it's children", () => {
    const { getByText } = setup();
    expect(getByText('Some heading')).toBeInTheDocument();
  });

  it('renders as an <h2>', () => {
    const { getByText } = setup();
    expect(getByText('Some heading').tagName).toBe('H2');
  });

  it('adds additional class names', () => {
    const { getByText } = setup();
    expect(getByText('Some heading')).toHaveClass('some-custom-class');
  });
});

describe(CardContent, () => {
  const setup = () =>
    render(
      <CardContent className="some-custom-class">Some content</CardContent>
    );

  it("renders it's children", () => {
    const { getByText } = setup();
    expect(getByText('Some content')).toBeInTheDocument();
  });

  it('renders as a <div>', () => {
    const { getByText } = setup();
    expect(getByText('Some content').tagName).toBe('DIV');
  });

  it('adds additional class names', () => {
    const { getByText } = setup();
    expect(getByText('Some content')).toHaveClass('some-custom-class');
  });
});
