import { Meta } from '@storybook/react/types-6-0';
import { TextInput, TextInputProps } from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput
} as Meta<TextInputProps>;

export const Standard = (args: TextInputProps): JSX.Element => (
  <TextInput {...args} />
);

export const WithPlaceholder = (args: TextInputProps): JSX.Element => (
  <TextInput placeholder="Some placeholder text" {...args} />
);
