import { Meta, Story } from '@storybook/react/types-6-0';
import { LoadingIcon, LoadingIconProps } from './LoadingIcon';

export default {
  title: 'Components/Loading Icon',
  component: LoadingIcon
} as Meta<LoadingIconProps>;

export const loadingIcon: Story<LoadingIconProps> = args => (
  <LoadingIcon {...args} />
);
