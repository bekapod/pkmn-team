import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { LoadingIcon } from './LoadingIcon';

export default {
  title: 'Components/Loading Icon',
  component: LoadingIcon
} as Meta<ComponentProps<typeof LoadingIcon>>;

export const loadingIcon: Story<ComponentProps<typeof LoadingIcon>> = args => (
  <LoadingIcon {...args} />
);
