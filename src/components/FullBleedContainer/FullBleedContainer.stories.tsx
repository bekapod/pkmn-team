import { Meta, Story } from '@storybook/react/types-6-0';
import { FullBleedContainer } from './FullBleedContainer';

export default {
  title: 'Components/Full Bleed Container',
  component: FullBleedContainer
} as Meta;

export const fullBleedContainer: Story = () => (
  <FullBleedContainer>A section of content</FullBleedContainer>
);
