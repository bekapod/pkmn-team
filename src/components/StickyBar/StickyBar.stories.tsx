import { Meta, Story } from '@storybook/react/types-6-0';
import { StickyBar } from './StickyBar';

export default {
  title: 'Components/Sticky Bar',
  component: StickyBar
} as Meta;

export const stickyBar: Story = () => <StickyBar />;
