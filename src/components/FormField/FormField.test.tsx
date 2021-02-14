import { render, screen } from '@testing-library/react';
import { TextInput } from '~/components/TextInput';
import { FormField, FormFieldProps } from '.';

describe(FormField, () => {
  const setup = (props: Partial<FormFieldProps> = {}) =>
    render(
      <FormField label="Some input" id="some-input" {...props}>
        <TextInput id="some-input" name="some-input" />
      </FormField>
    );

  it('renders the input and label', () => {
    setup();
    expect(screen.getByLabelText('Some input')).toBeInTheDocument();
  });

  it('renders the error message', () => {
    setup({ error: 'Some error' });
    expect(screen.getByText('Some error')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    setup({ className: 'some-custom-class' });
    expect(screen.getByText('Some input').parentElement).toHaveClass(
      'some-custom-class'
    );
  });
});
