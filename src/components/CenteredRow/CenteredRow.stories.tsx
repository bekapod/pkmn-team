import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentProps } from 'react';
import { CenteredRow } from './CenteredRow';

export default {
  title: 'Components/Centered Row',
  component: CenteredRow,
  args: {
    stackVertically: false
  }
} as Meta<ComponentProps<typeof CenteredRow>>;

export const centeredRow: Story<ComponentProps<typeof CenteredRow>> = args => (
  <CenteredRow {...args}>
    <span>Child 1</span>
    <span>Child 2</span>
  </CenteredRow>
);
