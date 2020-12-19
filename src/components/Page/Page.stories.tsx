import { Meta } from '@storybook/react/types-6-0';
import { Page, PageProps } from './Page';
import { FullWidthContainer } from '../FullWidthContainer';

export default {
  title: 'Components/Page',
  component: Page,
  args: {
    title: 'Some heading',
    metaTitle: 'Some title'
  }
} as Meta<PageProps>;

export const Standard = (args: PageProps): JSX.Element => (
  <Page {...args}>
    <FullWidthContainer>A section of content</FullWidthContainer>
  </Page>
);
