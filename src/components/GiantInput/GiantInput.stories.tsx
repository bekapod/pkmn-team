import { Meta } from '@storybook/react/types-6-0';
import { GiantInput, GiantInputProps } from './GiantInput';

export default {
  title: 'Components/GiantInput',
  component: GiantInput
} as Meta<GiantInputProps>;

export const Standard = (args: GiantInputProps): JSX.Element => (
  <GiantInput {...args} />
);
export const WithPlaceholder = (args: GiantInputProps): JSX.Element => (
  <GiantInput placeholder="Some placeholder text" {...args} />
);
