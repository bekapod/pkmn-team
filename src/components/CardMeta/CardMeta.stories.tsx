import { Meta } from '@storybook/react/types-6-0';
import { CardMeta, CardMetaProps } from './CardMeta';

export default {
  title: 'Components/CardMeta',
  component: CardMeta,
  args: {
    id: '1',
    items: [
      { label: 'Item 1', value: 'Value 1' },
      { label: 'Item 2', value: 2 }
    ]
  }
} as Meta<CardMetaProps>;

export const Standard = (args: CardMetaProps): JSX.Element => (
  <CardMeta {...args} />
);
