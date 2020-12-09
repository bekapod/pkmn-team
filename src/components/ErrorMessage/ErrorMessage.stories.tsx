import { Meta } from '@storybook/react/types-6-0';
import { ErrorMessage, ErrorMessageProps } from './ErrorMessage';

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessage
} as Meta<ErrorMessageProps>;

export const Standard = (args: ErrorMessageProps): JSX.Element => (
  <ErrorMessage {...args}>This is an error message.</ErrorMessage>
);
