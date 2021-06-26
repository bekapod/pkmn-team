import { render, screen } from '@testing-library/react';
import { MoveLine, MoveLineProps } from '.';
import { substitute } from '~/mocks/Moves';

describe('MoveLine', () => {
  const setup = (props: Partial<MoveLineProps> = {}) =>
    render(<MoveLine {...substitute} {...props} />);

  it('renders move information', () => {
    setup();
    expect(screen.getByText(substitute.name)).toBeInTheDocument();
    expect(screen.getByText(substitute.type.name)).toBeInTheDocument();
    expect(
      screen.getByText(substitute.damageClass ?? 'damage class missing')
    ).toBeInTheDocument();
  });

  it('adds type gradient', () => {
    const { container } = setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveStyle({
      '--type-gradient':
        'linear-gradient(90deg, var(--colors-normal) 0%, var(--colors-normal) 50%, var(--colors-status) 50%, var(--colors-status) 100%)'
    });
  });

  it('adds type gradient without damage class', () => {
    const { container } = setup({ damageClass: undefined });
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveStyle({
      '--type-gradient':
        'linear-gradient(90deg, var(--colors-normal) 0%, var(--colors-normal) 100%)'
    });
  });

  it("doesn't use aria-selected attribute when not highlighted", () => {
    const { container } = setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).not.toHaveAttribute('aria-selected');
  });

  it("doesn't use aria-expanded attribute when not open", () => {
    const { container } = setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).not.toHaveAttribute('aria-expanded');
  });

  it("doesn't render additional information when not open", () => {
    setup();
    expect(screen.queryByText('PP')).not.toBeInTheDocument();
    expect(screen.queryByText('Accuracy')).not.toBeInTheDocument();
    expect(screen.queryByText('Power')).not.toBeInTheDocument();
    expect(screen.queryByText('Target')).not.toBeInTheDocument();
  });

  it('renders actions', () => {
    setup({
      renderLineActions: () => <button>Some button</button>
    });
    expect(screen.getByText('Some button')).toBeInTheDocument();
  });

  describe('when highlighted', () => {
    it('uses aria-selected attribute when highlighted', () => {
      const { container } = setup({ isHighlighted: true });
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('when open', () => {
    it('uses aria-expanded attribute when open', () => {
      const { container } = setup({ isOpen: true });
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders additional information when open', () => {
      setup({ isOpen: true });
      expect(
        screen.getByText(substitute.pp ?? 'pp missing')
      ).toBeInTheDocument();
      substitute.accuracy &&
        expect(screen.getByText(substitute.accuracy)).toBeInTheDocument();
      substitute.power &&
        expect(screen.getByText(substitute.power)).toBeInTheDocument();
      substitute.target &&
        expect(screen.getByText(substitute.target)).toBeInTheDocument();
      substitute.effect &&
        expect(screen.getByText(substitute.effect)).toBeInTheDocument();
    });
  });
});
