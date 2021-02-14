import { render } from '@testing-library/react';
import { GiantInput } from '.';

describe('GiantInput', () => {
  it('renders an input element', () => {
    const { getByLabelText } = render(<GiantInput aria-label="some input" />);
    expect(getByLabelText('some input')).toBeInTheDocument();
    expect(getByLabelText('some input').tagName).toBe('INPUT');
    expect(getByLabelText('some input')).toHaveAttribute('type', 'text');
  });

  it('adds additional class names', () => {
    const { getByLabelText } = render(
      <GiantInput aria-label="some input" className="some-custom-class" />
    );
    expect(getByLabelText('some input')).toHaveClass('some-custom-class');
  });

  it('uses full width modifier', () => {
    const { getByLabelText } = render(
      <GiantInput aria-label="some input" isFullWidth />
    );
    expect(getByLabelText('some input')).toHaveClass('max-w-none');
  });
});
