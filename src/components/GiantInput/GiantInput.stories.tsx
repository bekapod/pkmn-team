import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { GiantInput } from './GiantInput';

export default {
  title: 'Components/Giant Input',
  component: GiantInput
} as Meta<ComponentProps<typeof GiantInput>>;

export const giantInput: Story<ComponentProps<typeof GiantInput>> = args => (
  <GiantInput {...args} />
);
export const withPlaceholder: Story<ComponentProps<typeof GiantInput>> =
  args => <GiantInput placeholder="Some placeholder text" {...args} />;
