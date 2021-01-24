import { render } from '@testing-library/react';
import { MoveLine, MoveLineProps } from '.';
import { substitute } from '~/mocks/Moves';

describe('MoveLine', () => {
  const setup = (props: Partial<MoveLineProps> = {}) =>
    render(<MoveLine {...substitute} {...props} />);

  it('renders move information', () => {
    const { getByText } = setup();
    expect(getByText(substitute.name)).toBeInTheDocument();
    expect(getByText(substitute.type.name)).toBeInTheDocument();
    expect(
      getByText(substitute.damage_class?.value ?? 'damage class missing')
    ).toBeInTheDocument();
  });

  it('adds type gradient', () => {
    const { container } = setup();
    expect(container.firstChild).toHaveStyle({
      '--type-gradient':
        'linear-gradient(90deg, var(--color-normal) 0%, var(--color-normal) 50%, var(--color-status) 50%, var(--color-status) 100%)'
    });
  });

  it('adds type gradient without damage class', () => {
    const { container } = setup({ damage_class: null });
    expect(container.firstChild).toHaveStyle({
      '--type-gradient':
        'linear-gradient(90deg, var(--color-normal) 0%, var(--color-normal) 100%)'
    });
  });

  it("doesn't use aria-selected attribute when not highlighted", () => {
    const { container } = setup();
    expect(container.firstChild).not.toHaveAttribute('aria-selected');
  });

  it("doesn't use aria-expanded attribute when not open", () => {
    const { container } = setup();
    expect(container.firstChild).not.toHaveAttribute('aria-expanded');
  });

  it("doesn't render additional information when not open", () => {
    const { queryByText } = setup();
    expect(queryByText('PP')).not.toBeInTheDocument();
    expect(queryByText('Accuracy')).not.toBeInTheDocument();
    expect(queryByText('Power')).not.toBeInTheDocument();
    expect(queryByText('Target')).not.toBeInTheDocument();
  });

  it('renders actions', () => {
    const { getByText } = setup({
      renderLineActions: () => <button>Some button</button>
    });
    expect(getByText('Some button')).toBeInTheDocument();
  });

  describe('when highlighted', () => {
    it('uses aria-selected attribute when highlighted', () => {
      const { container } = setup({ isHighlighted: true });
      expect(container.firstChild).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('when open', () => {
    it('uses aria-expanded attribute when open', () => {
      const { container } = setup({ isOpen: true });
      expect(container.firstChild).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders additional information when open', () => {
      const { getByText } = setup({ isOpen: true });
      expect(getByText(substitute.pp ?? 'pp missing')).toBeInTheDocument();
      substitute.accuracy &&
        expect(getByText(substitute.accuracy)).toBeInTheDocument();
      substitute.power &&
        expect(getByText(substitute.power)).toBeInTheDocument();
      substitute.target &&
        expect(getByText(substitute.target)).toBeInTheDocument();
      substitute.effect &&
        expect(getByText(substitute.effect)).toBeInTheDocument();
    });
  });
});
