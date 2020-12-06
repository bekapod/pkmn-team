import { Meta } from '@storybook/react/types-6-0';
import { LoadingIcon, LoadingIconProps } from './LoadingIcon';

export default {
  title: 'Components/LoadingIcon',
  component: LoadingIcon
} as Meta<LoadingIconProps>;

export const Standard = (args: LoadingIconProps): JSX.Element => (
  <LoadingIcon {...args} />
);
