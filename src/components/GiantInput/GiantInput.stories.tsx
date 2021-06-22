import { Meta, Story } from '@storybook/react/types-6-0';
import { GiantInput, GiantInputProps } from './GiantInput';

export default {
  title: 'Components/GiantInput',
  component: GiantInput
} as Meta<GiantInputProps>;

export const Standard: Story<GiantInputProps> = args => (
  <GiantInput {...args} />
);
export const WithPlaceholder: Story<GiantInputProps> = args => (
  <GiantInput placeholder="Some placeholder text" {...args} />
);
