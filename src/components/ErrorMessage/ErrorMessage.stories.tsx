import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { ErrorMessage } from './ErrorMessage';

export default {
  title: 'Components/Error Message',
  component: ErrorMessage
} as Meta<ComponentProps<typeof ErrorMessage>>;

export const errorMessage: Story<ComponentProps<typeof ErrorMessage>> =
  args => <ErrorMessage {...args}>This is an error message.</ErrorMessage>;
