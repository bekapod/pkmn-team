import { render, screen } from '@testing-library/react';
import { GiantInput } from '.';

describe('GiantInput', () => {
  it('renders an input element', () => {
    render(<GiantInput aria-label="some input" />);
    expect(screen.getByLabelText('some input')).toBeInTheDocument();
    expect(screen.getByLabelText('some input').tagName).toBe('INPUT');
    expect(screen.getByLabelText('some input')).toHaveAttribute('type', 'text');
  });

  it('adds additional class names', () => {
    render(
      <GiantInput aria-label="some input" className="some-custom-class" />
    );
    expect(screen.getByLabelText('some input')).toHaveClass(
      'some-custom-class'
    );
  });

  it('uses full width modifier', () => {
    render(<GiantInput aria-label="some input" isFullWidth />);
    expect(screen.getByLabelText('some input')).toHaveClass('max-w-none');
  });
});
