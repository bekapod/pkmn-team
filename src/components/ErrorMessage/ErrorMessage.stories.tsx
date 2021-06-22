import { Meta, Story } from '@storybook/react/types-6-0';
import { ErrorMessage, ErrorMessageProps } from './ErrorMessage';

export default {
  title: 'Components/Error Message',
  component: ErrorMessage
} as Meta<ErrorMessageProps>;

export const errorMessage: Story<ErrorMessageProps> = args => (
  <ErrorMessage {...args}>This is an error message.</ErrorMessage>
);
