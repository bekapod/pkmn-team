import { Meta, Story } from '@storybook/react/types-6-0';
import { CenteredRow, CenteredRowProps } from './CenteredRow';

export default {
  title: 'Components/Centered Row',
  component: CenteredRow,
  args: {
    stackVertically: false
  }
} as Meta<CenteredRowProps>;

export const centeredRow: Story<CenteredRowProps> = args => (
  <CenteredRow {...args}>
    <span>Child 1</span>
    <span>Child 2</span>
  </CenteredRow>
);
