import { render } from '@testing-library/react';
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
    const { getByLabelText } = setup();
    expect(getByLabelText('Some input')).toBeInTheDocument();
  });

  it('renders the error message', () => {
    const { getByText } = setup({ error: 'Some error' });
    expect(getByText('Some error')).toBeInTheDocument();
  });

  it('adds additional class names', () => {
    const { getByText } = setup({ className: 'some-custom-class' });
    expect(getByText('Some input').parentElement).toHaveClass(
      'some-custom-class'
    );
  });
});
