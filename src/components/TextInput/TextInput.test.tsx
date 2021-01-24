import { render } from '@testing-library/react';
import { TextInput } from '.';

describe('TextInput', () => {
  it('renders an input element', () => {
    const { getByLabelText } = render(<TextInput aria-label="some input" />);
    expect(getByLabelText('some input')).toBeInTheDocument();
    expect(getByLabelText('some input').tagName).toBe('INPUT');
    expect(getByLabelText('some input')).toHaveAttribute('type', 'text');
  });

  it('adds additional class names', () => {
    const { getByLabelText } = render(
      <TextInput aria-label="some input" className="some-custom-class" />
    );
    expect(getByLabelText('some input')).toHaveClass('some-custom-class');
  });
});
