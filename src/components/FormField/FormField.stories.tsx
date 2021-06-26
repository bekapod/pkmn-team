import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { GiantInput } from '../GiantInput';
import { TextInput } from '../TextInput';
import { FormField } from './FormField';

export default {
  title: 'Components/Form Field',
  component: FormField,
  args: {
    label: 'Some label',
    id: 'some-id'
  }
} as Meta<ComponentProps<typeof FormField>>;

export const formField: Story<ComponentProps<typeof FormField>> = args => (
  <FormField {...args}>
    <TextInput id={args.id} />
  </FormField>
);
export const withError: Story<ComponentProps<typeof FormField>> = args => (
  <FormField {...args}>
    <TextInput id={args.id} isInvalid />
  </FormField>
);
withError.args = { error: 'Some error message' };

export const withGiantInput: Story<ComponentProps<typeof FormField>> = args => (
  <FormField {...args}>
    <GiantInput id={args.id} />
  </FormField>
);
export const withGiantInputAndError: Story<ComponentProps<typeof FormField>> =
  args => (
    <FormField {...args}>
      <GiantInput id={args.id} isInvalid />
    </FormField>
  );
withGiantInputAndError.args = { error: 'Some error message' };
