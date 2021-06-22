import { Meta, Story } from '@storybook/react/types-6-0';
import { StickyBar } from './StickyBar';

export default {
  title: 'Components/StickyBar',
  component: StickyBar
} as Meta;

export const Standard: Story = () => <StickyBar />;
