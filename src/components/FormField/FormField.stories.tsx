import { Meta, Story } from '@storybook/react/types-6-0';
import { GiantInput } from '../GiantInput';
import { TextInput } from '../TextInput';
import { FormField, FormFieldProps } from './FormField';

export default {
  title: 'Components/FormField',
  component: FormField,
  args: {
    label: 'Some label',
    id: 'some-id'
  }
} as Meta<FormFieldProps>;

export const Standard: Story<FormFieldProps> = args => (
  <FormField {...args}>
    <TextInput id={args.id} />
  </FormField>
);
export const StandardWithError: Story<FormFieldProps> = args => (
  <FormField {...args}>
    <TextInput id={args.id} isInvalid />
  </FormField>
);
StandardWithError.args = { error: 'Some error message' };

export const WithGiantInput: Story<FormFieldProps> = args => (
  <FormField {...args}>
    <GiantInput id={args.id} />
  </FormField>
);
export const WithGiantInputAndError: Story<FormFieldProps> = args => (
  <FormField {...args}>
    <GiantInput id={args.id} isInvalid />
  </FormField>
);
WithGiantInputAndError.args = { error: 'Some error message' };
