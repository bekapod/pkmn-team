import { Meta } from '@storybook/react/types-6-0';
import { InlineList } from './InlineList';

export default {
  title: 'Components/InlineList',
  component: InlineList
} as Meta;

export const Standard = (): JSX.Element => (
  <InlineList>
    <li>Item 1</li>
    <li>Item 2</li>
  </InlineList>
);
