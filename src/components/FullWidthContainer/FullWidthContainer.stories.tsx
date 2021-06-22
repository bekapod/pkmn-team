import { Meta, Story } from '@storybook/react/types-6-0';
import { FullBleedContainer } from '../FullBleedContainer';
import { FullWidthContainer } from './FullWidthContainer';

export default {
  title: 'Components/Full Width Container',
  component: FullWidthContainer
} as Meta;

export const fullWidthContainer: Story = () => (
  <FullBleedContainer>
    <FullWidthContainer>A section of content</FullWidthContainer>
  </FullBleedContainer>
);
