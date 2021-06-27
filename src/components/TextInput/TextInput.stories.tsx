import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { TextInput, TextInputProps } from './TextInput';

export default {
  title: 'Components/Text Input',
  component: TextInput,
  args: {
    disabled: false
  }
} as Meta<TextInputProps>;

export const textInput: Story<ComponentProps<typeof TextInput>> = args => (
  <TextInput {...args} />
);

export const withPlaceholder: Story<ComponentProps<typeof TextInput>> =
  args => <TextInput placeholder="Some placeholder text" {...args} />;
