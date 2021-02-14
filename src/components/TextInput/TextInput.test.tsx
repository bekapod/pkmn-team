import { render, screen } from '@testing-library/react';
import { TextInput } from '.';

describe('TextInput', () => {
  it('renders an input element', () => {
    render(<TextInput aria-label="some input" />);
    expect(screen.getByLabelText('some input')).toBeInTheDocument();
    expect(screen.getByLabelText('some input').tagName).toBe('INPUT');
    expect(screen.getByLabelText('some input')).toHaveAttribute('type', 'text');
  });

  it('adds additional class names', () => {
    render(<TextInput aria-label="some input" className="some-custom-class" />);
    expect(screen.getByLabelText('some input')).toHaveClass(
      'some-custom-class'
    );
  });
});
