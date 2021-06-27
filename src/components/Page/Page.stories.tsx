import { Meta, Story } from '@storybook/react/types-6-0';
import { Page } from './Page';
import { FullWidthContainer } from '../FullWidthContainer';
import { ComponentProps } from 'react';

export default {
  title: 'Components/Page',
  component: Page,
  args: {
    title: 'Some heading',
    metaTitle: 'Some title'
  }
} as Meta<ComponentProps<typeof Page>>;

export const page: Story<ComponentProps<typeof Page>> = args => (
  <Page {...args}>
    <FullWidthContainer>A section of content</FullWidthContainer>
  </Page>
);
