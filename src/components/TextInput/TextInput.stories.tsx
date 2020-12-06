import { Meta } from '@storybook/react/types-6-0';
import { TextInput } from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput
} as Meta;

export const Standard = (): JSX.Element => <TextInput type="text" />;
