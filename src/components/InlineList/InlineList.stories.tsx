import { Meta, Story } from '@storybook/react/types-6-0';
import { InlineList } from './InlineList';

export default {
  title: 'Components/Inline List',
  component: InlineList
} as Meta;

export const inlineList: Story = () => (
  <InlineList>
    <li>Item 1</li>
    <li>Item 2</li>
  </InlineList>
);
