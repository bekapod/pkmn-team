import { Meta } from '@storybook/react/types-6-0';
import { CenteredRow, CenteredRowProps } from './CenteredRow';

export default {
  title: 'Components/CenteredRow',
  component: CenteredRow
} as Meta<CenteredRowProps>;

export const Standard = (args: CenteredRowProps): JSX.Element => (
  <CenteredRow {...args}>
    <span>Child 1</span>
    <span>Child 2</span>
  </CenteredRow>
);
